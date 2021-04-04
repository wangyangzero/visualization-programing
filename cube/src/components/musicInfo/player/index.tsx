/** 底部的播放模块 */
import React, { memo, useEffect, useState, } from 'react';
import { jump, rem } from 'src/common';
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
import { formatSeconds, em, Songs, getIndex, editorClassName } from 'src/common';
import { MUSIC_PLAY } from 'src/constants';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Player = () => { 
  const initState: IPlayerState = {
    iconColor: '#BEBFB7',
    timerColor: '#8E9181',
    timerFontSize: 16,
    progressColor: '#969A8A',
  }
  const [state, setState] = useState(initState);
  // 歌曲索引
  const index = getIndex(); 
  // 音乐曲目（包含音频文件，歌曲名，歌手）
  const music = Songs[index];
  // 音乐的播放开关
  const [musicSwitch, setMusicSwitch] = useState(true);
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
  /**
   * 下一首歌
   */
  const nextSong = () => {
    jump(`/music/info=${(music.index+1) % 12}`)
  }
  /**
   * 上一首歌
   */
  const preSong = () => {
    jump(`/music/info=${music.index-1 >= 0 ? music.index-1 : 11}`)
  }

  return (
    <div className={[styles.container, editorClassName()].join(' ')}>
      <header className={styles.header}>
        <HeartOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <DownloadOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <BellOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <Link to={`/review=${music.index}`}>
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
        <StepBackwardOutlined 
          style={{ color: iconColor, fontSize:rem(40) }} 
          className={styles.footerIcon}
          onClick={preSong}
        />
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
        <audio 
          id={'audio'} 
          src={music.source} 
          preload='auto' 
          onTimeUpdate={onTimeUpdate} 
          controls
          autoPlay
          className={styles.audio}
          onEnded={nextSong}
        />
        <StepForwardOutlined 
          style={{ color: iconColor, fontSize:rem(40) }} 
          className={styles.footerIcon}
          onClick={nextSong}
        />
        <MenuFoldOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
      </footer>
    </div>
  )
}

export default memo(Player);
