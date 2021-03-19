/** 底部播放器模块 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { rem } from 'src/common';
import { IPlayerState } from 'src/type/homepage';
import { Progress } from 'antd';
import { MenuUnfoldOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import musicSource from 'src/assets/music/candy_wind.mp3';
import styles from './style.module.css';

const Player = () => {
  const timerId = useRef(-1);
  const a = document.getElementById('audio');
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
  // 设置头像旋转的初始位置
  const [rotatePos, setRotatePos] = useState(0); 
  // 音乐的播放开关
  const [musicSwitch, setMusicSwitch] = useState(false);
  // 音乐的播放进度
  const [musicProgress, setMusicProgress] = useState(0);
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

  /**
   * 控制音乐播放器的播放
   */
  const animationPlay = () => {
    setMusicSwitch(true);
    const audio = document.getElementById('audio');
    (audio as any).play();
    // 头像旋转动画开启
    timerId.current = requestAnimationFrame(avatarRotate);
  }
  /**
   * 控制音乐播放器的停止
   */
  const animationStop = () => {
    setMusicSwitch(false);
    const audio = document.getElementById('audio');
    (audio as any).pause();
    cancelAnimationFrame(timerId.current);
  }
  /**
   * 控制头像旋转动画的开始
   */
  const avatarRotate = () => {
    setRotatePos(prerotatePos => (prerotatePos + 1) % 360);
    timerId.current = requestAnimationFrame(avatarRotate);
  }
  /**
   * 音乐播放进度
   */
  const onTimeUpdate = () => {
    const audio: any= document.getElementById('audio');
    setMusicProgress(audio.currentTime * 100 / audio.duration);
  }

  useEffect(() => {
    // animationPlay();
    return () => cancelAnimationFrame(timerId.current);
  },[])


  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize), transform: `rotate(${rotatePos}deg)` }}>
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
        percent={musicProgress} 
        width={24} 
        trailColor='#1C1D1F'
        strokeColor='#303132'
        className={styles.progress}
        format={() => 
          musicSwitch 
           ? <PauseOutlined 
                style={{ fontSize: '32rem', marginLeft: '0rem', color: '#7E7F81' }}
                onClick={animationStop}
             />
           : <CaretRightOutlined 
                style={{ fontSize: '32rem', marginLeft: '6rem', color: '#7E7F81' }}
                onClick={animationPlay}
             />
        } 
      />
      <audio id={'audio'} src={musicSource} preload='auto' onTimeUpdate={onTimeUpdate}></audio>
      <MenuUnfoldOutlined style={{ fontSize: '42rem', color: '#7E7F81', marginLeft: '50rem' }}/>
    </div>
  )
}

export default memo(Player);
