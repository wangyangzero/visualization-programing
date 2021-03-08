/** 我喜欢的音乐模块 */
import React, { memo, useState } from 'react';
import { Tag } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { IMyFavoriteMusicState } from 'src/type/homepage';
import styles from './style.module.css';
import { rem } from 'src/common';

const MyFavoriteMusic = () => {
  const initState: IMyFavoriteMusicState = {
    avatarSize: 100,
    avatarUrl: '',
    heartSize: 40,
    heartColor: '#B2B2B2',
    text: '我喜欢的音乐',
    textFontSize: 28,
    textColor: '#595B5B',
    num: '15首',
    numFontSize: 12,
    numColor: '#3C3C3C',
    tagColor: '#1E1F20',
    tagHeartColor: '#DC143C',
    tagText: '心动模式',
    tagTextFontSize: 12,
    tagTextColor: '',
  }

  const [state, setState] = useState(initState);
  const {
    avatarSize,
    avatarUrl,
    heartSize,
    heartColor,
    text,
    textFontSize,
    textColor,
    num,
    numFontSize,
    numColor,
    tagColor,
    tagHeartColor,
    tagText,
    tagTextFontSize,
    tagTextColor,    
  } = state;

  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize) }}>
          <div className={styles.mask}>
            <HeartFilled style={{ fontSize: rem(heartSize), color: heartColor }}/>
          </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
          {text}
        </p>
        <p className={styles.num} style={{ fontSize: rem(numFontSize), color: numColor }}>
          {num}
        </p>
      </div>
      <Tag color={tagColor} className={styles.tag}>
        <HeartOutlined style={{color: tagHeartColor}}/>
        <p className={styles.tagText} style={{ fontSize: rem(tagTextFontSize), color: tagTextColor }}>
          {tagText}
        </p>
      </Tag>
    </div>
  )
}

export default memo(MyFavoriteMusic);
