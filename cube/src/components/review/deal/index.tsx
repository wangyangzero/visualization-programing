/** 评论页面deal */
import React, { memo, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { IDealState } from 'src/type/review';
import { rem, Songs } from 'src/common';
import styles from './style.module.css';

const Deal = () => {
  // 歌曲索引
  const index = Number(location.pathname.split('=').pop());  
  const music = Songs[index];
  const initState: IDealState = {
    avatarSize: 120,
    nameFontSize: 28,
    nameColor: '#595B5B',
    singerFontSize: 12,
    singerColor: '#506A90',
    iconColor: '#595B5B',
  }

  const [state, setState] = useState(initState);
  const {
    avatarSize,
    nameFontSize,
    nameColor,
    singerFontSize,
    singerColor,
    iconColor,   
  } = state;

  return (
    <div className={styles.container}>
      <img 
        src={music.image}
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize) }} 
      />
      <div className={styles.content}>
        <p className={styles.text} style={{ fontSize: rem(nameFontSize), color: nameColor }}>
          {music.name}
        </p>
        <p className={styles.num} style={{ fontSize: rem(singerFontSize), color: singerColor }}>
          {music.singer}
        </p>
      </div>
      <RightOutlined style={{ color: iconColor, fontSize: rem(24) }} className={styles.icon}/>
    </div>
  )
}

export default memo(Deal);