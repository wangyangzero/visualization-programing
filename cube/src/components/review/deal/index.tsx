/** 评论页面deal */
import React, { memo, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { IDealState } from 'src/type/review';
import { rem } from 'src/common';
import styles from './style.module.css';

const Deal = () => {
  const initState: IDealState = {
    avatarSize: 120,
    avatarUrl: '',
    name: 'Sky High',
    nameFontSize: 28,
    nameColor: '#595B5B',
    singer: 'Thomas Prime',
    singerFontSize: 12,
    singerColor: '#506A90',
    iconColor: '#595B5B',
  }

  const [state, setState] = useState(initState);
  const {
    avatarSize,
    avatarUrl,
    name,
    nameFontSize,
    nameColor,
    singer,
    singerFontSize,
    singerColor,
    iconColor,   
  } = state;

  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize) }}>
      </div>
      <div className={styles.content}>
        <p className={styles.text} style={{ fontSize: rem(nameFontSize), color: nameColor }}>
          {name}
        </p>
        <p className={styles.num} style={{ fontSize: rem(singerFontSize), color: singerColor }}>
          {singer}
        </p>
      </div>
      <RightOutlined style={{ color: iconColor, fontSize: rem(24) }} className={styles.icon}/>
    </div>
  )
}

export default memo(Deal);