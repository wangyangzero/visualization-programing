/** 中间的磁带模块 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { IMusicTapeState } from 'src/type/musicInfo';
import { rem, em, Songs, getIndex } from 'src/common';
import { MUSIC_PLAY } from 'src/constants';
import styles from './style.module.css';

const MusicTape = () => {
  // 歌曲索引
  const index = getIndex();
  const timerId = useRef(-1);
  const initState: IMusicTapeState = {
    avatarSize: 480,
    inlineIconSize: 320,
  }
  const [state, setState] = useState(initState);
  // 设置头像旋转的初始位置
  const [rotatePos, setRotatePos] = useState(0);   
  const { 
    avatarSize,
    inlineIconSize,
  } = state;
  /**
   * 控制头像旋转动画的开始
   */
   const avatarRotatePlay = () => {
    setRotatePos(prerotatePos => (prerotatePos + 0.5) % 360);
    timerId.current = requestAnimationFrame(avatarRotatePlay);
  }
  /**
   * 控制头像旋转动画的停止
   */
  const avatarRotateStop = () => {
    cancelAnimationFrame(timerId.current);
  }

  useEffect(() => {
    em.on(MUSIC_PLAY,function(value: boolean) {
      value ? avatarRotatePlay() : avatarRotateStop();
    });
    // 进入页面时自动播放
    avatarRotatePlay();
    // 清除头像旋转定时器
    return () => cancelAnimationFrame(timerId.current);
  },[])

  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize), transform: `rotate(${rotatePos}deg)` }}>
        <img src={Songs[index].image} className={styles.inlineIcon}/>      
      </div>
    </div>
  )
}

export default memo(MusicTape);
