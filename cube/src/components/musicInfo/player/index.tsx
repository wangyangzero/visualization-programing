/** 底部的播放模块 */
import React, { memo, useState, } from 'react';
import { rem } from 'src/common';
import { Progress } from 'antd';
import { 
  HeartOutlined, 
  DownloadOutlined, 
  BellOutlined, 
  MessageOutlined, 
  MoreOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  MenuFoldOutlined,
  RedoOutlined,
  PauseCircleOutlined
 } from '@ant-design/icons';
import { IPlayerState } from 'src/type/musicInfo';
import { formatSeconds, em } from 'src/common';
import musicSource from 'src/assets/music/candy_wind.mp3';
import { MUSIC_PLAY } from 'src/constants';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Player = () => {
  const initState: IPlayerState = {
    iconColor: '#BEBFB7',
    timerColor: '#8E9181',
    timerFontSize: 12,
    progressColor: '#969A8A',
  }
  const [state, setState] = useState(initState);
  // 音乐的播放开关
  const [musicSwitch, setMusicSwitch] = useState(false);
  // 音乐的播放进度
  const [musicProgress, setMusicProgress] = useState(0);  
  const { iconColor, timerFontSize, timerColor, progressColor } = state;
  // 音乐总时长
  const durationTime = formatSeconds((document.getElementById('audio') as any)?.duration);
  // 音乐当前播放到的时间
  const [currentTime, setCurrentTime] = useState('');


  /**
   * 控制音乐播放器的播放
   */
   const animationPlay = () => {
    setMusicSwitch(true);
    em.emit(MUSIC_PLAY, true);
    const audio: any = document.getElementById('audio');
    audio.currentTime = 50;
    audio.play();
  }

  /**
   * 控制音乐播放器的停止
   */
  const animationStop = () => {
    setMusicSwitch(false);
    em.emit(MUSIC_PLAY, false);
    const audio: any = document.getElementById('audio');
    audio.pause();
  }

  /**
   * 音乐播放进度
   */
   const onTimeUpdate = () => {
    const audio: any= document.getElementById('audio');
    setMusicProgress(audio.currentTime * 100 / audio.duration);
    setCurrentTime(formatSeconds(audio.currentTime))
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <HeartOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <DownloadOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <BellOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <Link to='/review'>
          <MessageOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        </Link>
        <MoreOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
      </header>
      <div className={styles.content}>
        <span style={{ fontSize: rem(timerFontSize), color: timerColor }} className={styles.timerText}>
          {currentTime}
        </span>
        <Progress 
          percent={musicProgress} 
          showInfo={false} 
          className={styles.progress}
          strokeWidth={2}
          strokeColor={progressColor}
          trailColor='#737A64'
        />
        <span style={{ fontSize: rem(timerFontSize), color: timerColor }} className={styles.timerText}>
          {durationTime}
        </span>
      </div>
      <footer className={styles.footer}>
        <RedoOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
        <StepBackwardOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
        {
          musicSwitch
            ? <PauseCircleOutlined 
                style={{ color: iconColor, fontSize:rem(80) }} 
                className={styles.footerIcon}
                onClick={animationStop}
              />
            : <PlayCircleOutlined 
                style={{ color: iconColor, fontSize:rem(80) }} 
                className={styles.footerIcon}
                onClick={animationPlay}
              />
        }
        <audio id={'audio'} src={musicSource} preload='auto' onTimeUpdate={onTimeUpdate}></audio>
        <StepForwardOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
        <MenuFoldOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
      </footer>
    </div>
  )
}

export default memo(Player);
