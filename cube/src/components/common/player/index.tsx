/** 底部播放器模块 */
import React, { memo, useState } from 'react';
import { rem } from 'src/common';
import { IPlayerState } from 'src/type/homepage';
import { Progress } from 'antd';
import { MenuUnfoldOutlined, CaretRightOutlined } from '@ant-design/icons';
import styles from './style.module.css';

const Player = () => {
  const initState: IPlayerState = {
    avatarSize: 80,
    inlineIconSize: 48,
    title: '和煦的糖果风',
    titleFontSize: 24,
    titleColor: '#595B5B',
    author: 'Candy_Wind',
    authorFontSize: 12,
    authorColor: '#565759',
    iconColor: '#3C3C3C',
  }
  const [state, setState] = useState(initState);
  const { 
    avatarSize,
    inlineIconSize,
    title,
    titleFontSize,
    titleColor,
    author,
    authorFontSize,
    authorColor,
    iconColor
  } = state;
  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize) }}>
        <div 
          className={styles.inlineIcon} 
          style={{ width: rem(inlineIconSize), height: rem(inlineIconSize) }} 
        />        
      </div>
      <p style={{ fontSize: rem(titleFontSize), color: titleColor }} className={styles.title}>
        {title}
      </p>
      <p style={{ fontSize: rem(authorFontSize), color: authorColor }} className={styles.author}>
        {`~  ${author}`}
      </p>
      <Progress 
        type="circle" 
        percent={100} 
        width={24} 
        trailColor='#1C1D1F'
        strokeColor='#303132'
        className={styles.pauseIcon}
        format={() => 
          <CaretRightOutlined style={{ fontSize: '32rem', marginLeft: '6rem', color: '#7E7F81' }}/>} 
      />
      <MenuUnfoldOutlined style={{ fontSize: '42rem', color: '#7E7F81', marginLeft: '50rem' }}/>
    </div>
  )
}

export default memo(Player);
