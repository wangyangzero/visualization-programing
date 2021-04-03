/** 单个歌单模块 */
import React, { memo, useState } from 'react';
import { ISongSheetProp, ISongSheetState } from 'src/type/homepage';
import { MoreOutlined } from '@ant-design/icons';
import { rem } from 'src/common';
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
  const [state, setState] = useState(initState);
  const { avatarSize, textColor, textFontSize, numColor, numFontSize, iconColor } = state;
  return (
  <div className={styles.container}>
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
