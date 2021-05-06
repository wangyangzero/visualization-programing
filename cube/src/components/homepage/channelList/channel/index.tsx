/** 单个频道组件 */
import React, { memo, useState, useEffect } from 'react';
import { IChannelProp, IChannelState } from 'src/type/homepage';
import { rem, em } from 'src/common';
import { getStyle } from 'src/store/setting';
import { GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import styles from './style.module.css';

const Channel = (props: IChannelProp) => {
  const { imgSource, text } = props;
  const initState: IChannelState = {
    imgSize: 72,
    textFontSize: 16,
    textColor: '#565759'
  }

  // 初始化key值
  const pageKey = 'homepage';
  const componentKey = 'channel';
  const [state, setState] = useState(initState);
  const { imgSize, textFontSize, textColor } = state;

  /**
   * 初始化编辑框信息
   */
   const initEditorInfo = (e: any) => {
    e.preventDefault();
    em.emit(GET_STYLE_INFO,{
      pageKey,
      componentKey,
      imgSize: 72,
      textFontSize: 16,
      textColor: '#565759'
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
  },[])

  return (
    <div className={styles.container} onContextMenu={initEditorInfo}>
      <img src={imgSource} style={{width: rem(imgSize)}}/>
      <p className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
        {text}
      </p>
    </div>
  )
}

export default memo(Channel);
