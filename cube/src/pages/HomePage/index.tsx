/** 主页： 我的音乐 */
import React, {useState, useEffect} from 'react';
import { getSetting } from 'src/store';
import { withComponent } from 'src/common/withComponent';
import { HOMEPAGE } from 'src/constants';
import { IComponent } from 'src/type/setting';
import styles from './style.module.css';

const songSheet = [
  {
  avatarUrl: '',
  text: '嘤嘤嘤',
  num: '0首',
  },
  {
    avatarUrl: '',
    text: '可可爱爱莫得脑袋',
    num: '0首',
  }
];

export default function Homepage(): unknown {

  const [state, setState] = useState([]);

  useEffect(() => {
    getSetting('homepage')
      .then((res) => {
        if(!res?.length) return;
        setState(res as any);
      })
  },[]);

  return (
    <div className={styles.container}>
      {
        state.map((item: IComponent, key) => {
          let props = {};
          if (item.componentKey === 'songSheetListCreate') {
            props = {
              key: 'create',
              name: '创建歌单',
              songSheet
            }
          } else if (item.componentKey === 'songSheetListCollect') {
            props = {
              key: 'collect',
              name: '收藏歌单',
              songSheet
            }
          }
          return withComponent(HOMEPAGE[item.componentKey], props, JSON.stringify(item) + key);
        })
      }
      <footer className={styles.footer}></footer>
    </div>
  );
}
