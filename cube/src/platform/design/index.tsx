import React, { memo, useState, useEffect } from 'react';
import { em } from 'src/common';
import { updateStyle  } from 'src/store/setting';
import { GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { Input, Button } from 'antd';
import styles from './style.module.css';

const Design = () => {

  const [state, setState] = useState([]);

  useEffect(() => {
    em.on(GET_STYLE_INFO, (data: any) => {
      console.log(data);
      const res: any = [];
      for(const key in data) {
        res.push([key, data[key]]);
      }
      setState(res);
    })
  }, [state]);

  const onClick = () => {
    const inputs: any = document.getElementsByName('input');
    // 前两位是固定的key值，不显示但上传时需要更新
    const props: any = {
      [`${state[0][0]}`]: state[0][1],
      [`${state[1][0]}`]: state[1][1],
    };
    inputs.forEach((item: any, key: any) => {
      const value = item.getAttribute('value');
      props[state[key + 2][0]] = isNaN(Number(value)) ? value : Number(value) ;
    });
    updateStyle(props)
      .then((res) => {
        console.log(res);
        em.emit(UPDATE_STYLE_INFO, {
          [`${state[0][0]}`]: state[0][1],
          [`${state[1][0]}`]: state[1][1],
          isRefresh: true
        })
      })
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>样式编辑区~</p>
      <div className={styles.editor}>
        {
          state.map((item, key) => {
            if (item[0] === 'pageKey' || item[0] === 'componentKey') {
              return null;
            }
            return (
              (
                <div className={styles.item} key={JSON.stringify(item) + key}>
                  <span className={styles.content}>{`${item[0]} : `}</span>
                  <Input name="input" placeholder="请输入属性值" style={{ width: 300, marginLeft: 60 }} defaultValue={item[1]}/>
                </div>
              )
            )
          })
        }
      </div>
      <Button type="primary" onClick={onClick} className={styles.button}>一键更新</Button>
    </div>
  );
}

export default memo(Design);