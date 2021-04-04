/** 我喜欢的音乐模块 */
import React, { memo, useState } from 'react';
import { Tag } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { IMyFavoriteMusicState } from 'src/type/homepage';
import { rem, editorClassName } from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

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
    numFontSize: 16,
    numColor: '#3C3C3C',
    tagColor: '#1E1F20',
    tagHeartColor: '#DC143C',
    tagText: '心动模式',
    tagTextFontSize: 16,
    tagTextColor: '',
  }

  const [state, setState] = useState(initState);
  const [backgroundColor, setBackgroundColor] = useState('#19191B');
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

  /**
   * 触摸组件按下
   */
   const onTouchStart = () => {
    setBackgroundColor('#2B2C2E');
  }
  /**
   * 触摸组件弹起
   */
  const onTouchEnd = () => {
    setBackgroundColor('#161719');
  }

  return (
    <Link to='/music/list'>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        style={{ backgroundColor }}
        onTouchStart={ onTouchStart }
        onTouchEnd={ onTouchEnd }
      >
        <div 
          className={styles.avatar} 
          style={{ width: rem(avatarSize), height: rem(avatarSize) }}
        >
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
    </Link>
  )
}

export default memo(MyFavoriteMusic);
