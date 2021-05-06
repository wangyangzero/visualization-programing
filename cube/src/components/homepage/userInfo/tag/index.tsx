/** 用户标签 */
import React, { memo, useState, useEffect } from 'react';
import { Tag as ATag } from 'antd';
import { ITagProp, ITagState } from 'src/type/homepage';
import { em } from 'src/common';
import { getStyle } from 'src/store/setting';
import { GET_STYLE_INFO, UPDATE_STYLE_INFO  } from 'src/constants';
import styles from './style.module.css';

const Tag = (props: ITagProp) => {

  // 初始化key值
  const pageKey = 'homepage';
  const componentKey = 'tag';  
  const text = props?.children || '默认标签文案';
  const initState: ITagState = {
    height: 16,
    fontSize: 12,
    color: '#5B5C5E',
    fontColor: '#FFF', 
  }
  const [state, setState] = useState(initState);

  const { height, fontSize, color, fontColor } = state;

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      height: 16,
      fontSize: 12,
      color: '#5B5C5E',
      fontColor: '#FFF', 
    })
  }

  useEffect(() => {
    // 获取样式信息
    getStyle(pageKey, componentKey)
      .then((res: any) => {
        setState(res);
      });
    // 更新样式信息
    em.on(UPDATE_STYLE_INFO, (data: any) => {
      if(data.pageKey === pageKey && data.componentKey === componentKey) {
        getStyle(pageKey, componentKey)
        .then((res: any) => {
          setState(res);
        });
      }
    })  
  }, [])

  return (
    <ATag color={color} style={{ height, fontSize }} className={styles.tag} onContextMenu={initEditorInfo}>
      <span style={{ color: fontColor }}>{text}</span>
    </ATag>
  );
}

export default memo(Tag);
