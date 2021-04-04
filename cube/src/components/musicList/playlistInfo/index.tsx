/** 歌单内的个人信息吗模块 */
import React, { memo, useState } from 'react';
import { HeartFilled, RightOutlined } from '@ant-design/icons';
import { IPlayListInfoState } from 'src/type/musicList';
import { rem, editorClassName } from 'src/common';
import userIcon from 'src/assets/img/homepage-heart-background-ic.png';
import styles from './style.module.css';

const PlaylistInfo = () => {
  const initState: IPlayListInfoState = {
    avatarSize: 220,
    avatarUrl: '',
    heartSize: 80,
    heartColor: '#B2B2B2',
    text: '我喜欢的音乐',
    textFontSize: 28,
    textColor: '#595B5B',
    userIconUrl: '',
    userIconSize: 40,
    username: '洋洋的小娇妻',
    usernameFontSize: 20,
    usernameColor: '#636363',
    iconColor: '#636363',
  }
  const [state, setState] = useState(initState);
  const {
    avatarSize,
    avatarUrl,
    heartSize,
    heartColor,
    text,
    textColor,
    textFontSize,
    username,
    userIconUrl,
    userIconSize,
    usernameColor,
    usernameFontSize,
    iconColor
  } = state;
  return (
      <div className={[styles.container, editorClassName()].join(' ')}>
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
        <span 
          className={styles.username} 
          style={{ fontSize: rem(usernameFontSize), color: usernameColor }}>
            <img 
              src={userIcon} 
              style={{ width: rem(userIconSize), height: rem(userIconSize) }} 
              className={styles.userIcon}
            />
            <span className={styles.userText}>{username}</span>
            <RightOutlined style={{ color: iconColor, fontSize: '20rem' }}/>
        </span>
      </div>
    </div>
  )
}

export default memo(PlaylistInfo)
