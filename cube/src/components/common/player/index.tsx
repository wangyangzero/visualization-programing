/** 底部播放器模块 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { rem } from 'src/common';
import { IPlayerState } from 'src/type/homepage';
import { Progress } from 'antd';
import { MenuUnfoldOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import musicSource from 'src/assets/music/candy_wind.mp3';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Player = () => {
  const timerId = useRef(-1);
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
  //  模块背景色
  const [backgroundColor, setBackgroundColor] = useState('#161719');
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
    const audio: any = document.getElementById('audio');
    audio.play();
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

  useEffect(() => {
    // 清除头像旋转定时器
    return () => cancelAnimationFrame(timerId.current);
  },[])


  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize), transform: `rotate(${rotatePos}deg)` }}>
        <Link to='/music/info=2333'>
          <div 
            className={styles.inlineIcon} 
            style={{ width: rem(inlineIconSize), height: rem(inlineIconSize) }} 
          />
        </Link>      
      </div>


      <Link to='/music/info=2333'>
        <p 
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ fontSize: rem(titleFontSize), color: titleColor }} 
          className={styles.title}>
            {title}
        </p>
      </Link>
      <Link to='/music/info=2333'>
        <p
          onTouchStart={onTouchStart} 
          onTouchEnd={onTouchEnd}
          style={{ fontSize: rem(authorFontSize), color: authorColor }} 
          className={styles.author}>
            {`~  ${author}`}
        </p>
      </Link>
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
