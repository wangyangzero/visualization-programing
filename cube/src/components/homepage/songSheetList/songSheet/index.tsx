/** 单个歌单模块 */
import React, { memo, useState, useEffect } from 'react';
import { ISongSheetProp, ISongSheetState } from 'src/type/homepage';
import { MoreOutlined } from '@ant-design/icons';
import { rem, em } from 'src/common';
import { getStyle } from 'src/store/setting';
import { GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import styles from './style.module.css';

const SongSheet = (props: ISongSheetProp) => {
  const { avatarUrl, text, num } = props;
  const initState:ISongSheetState = {
    avatarSize: 80,
    textFontSize: 24,
    textColor: '#595B5B',
    numFontSize: 16,
    numColor: '#3C3C3C',
    iconColor: '#3C3C3C',
  };
  // 初始化key值
  const pageKey = 'homepage';
  const componentKey = 'songSheet';
  const [state, setState] = useState(initState);
  const { avatarSize, textColor, textFontSize, numColor, numFontSize, iconColor } = state;

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      avatarSize: 80,
      textFontSize: 24,
      textColor: '#595B5B',
      numFontSize: 16,
      numColor: '#3C3C3C',
      iconColor: '#3C3C3C'
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
  <div className={styles.container} onContextMenu={initEditorInfo}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize) }}>
      </div>
      <div className={styles.content}>
        <p className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
          {text}
        </p>
        <p className={styles.num} style={{ fontSize: rem(numFontSize), color: numColor }}>
          {num}
        </p>
      </div>
      <MoreOutlined style={{ color: iconColor }} className={styles.moreIcon} />
  </div>
  )
}

export default memo(SongSheet);
