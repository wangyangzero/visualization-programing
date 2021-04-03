/** 评论页面deal */
import React, { memo, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { IDealState } from 'src/type/review';
import { rem, Songs, getIndex } from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Deal = () => {
  // 歌曲索引
  const index = getIndex();  
  const music = Songs[index];
  const initState: IDealState = {
    avatarSize: 120,
    nameFontSize: 28,
    nameColor: '#595B5B',
    singerFontSize: 16,
    singerColor: '#506A90',
    iconColor: '#595B5B',
  }

  const [state, setState] = useState(initState);
  // 评论的背景颜色
  const [backgroundColor, setBackgroundColor] = useState('#161616');    
  const {
    avatarSize,
    nameFontSize,
    nameColor,
    singerFontSize,
    singerColor,
    iconColor,   
  } = state;

  /**
   * 触摸组件按下
   */
   const onTouchStart = () => {
    setBackgroundColor('#232323');
  }

  /**
   * 触摸组件弹起
   */
  const onTouchEnd = () => {
    setBackgroundColor('#161616');
  }

  return (
    <Link to={`music/info=${index}`}>
      <div 
        className={styles.container}      
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ backgroundColor }}>
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
    </Link>
  )
}

export default memo(Deal);