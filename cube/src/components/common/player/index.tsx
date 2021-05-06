/** 底部播放器模块 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { Progress } from 'antd';
import { MenuUnfoldOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Songs, isDev, editorClassName, rem, em } from 'src/common';
import { IPlayerState } from 'src/type/homepage';
import { getStyle } from 'src/store/setting';
import { GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Player = () => {
  const timerId = useRef(-1);
  const initState: IPlayerState = {
    avatarSize: 10,
    inlineIconSize: 48,
    textFontSize: 24,
    textColor: '#595B5B',
    singerFontSize: 16,
    singerColor: '#565759',
    iconColor: '#3C3C3C',
  }
  // 初始化key值
  const pageKey = 'common';
  const componentKey = 'player';
  const [state, setState] = useState(initState);
  //  模块背景色
  const [backgroundColor, setBackgroundColor] = useState('#161719');
  // 设置头像旋转的初始位置
  const [rotatePos, setRotatePos] = useState(0); 
  // 音乐曲目（包含音频文件，歌曲名，歌手）
  const [music, setMusic] = useState(Songs[0]);
  // 音乐的播放开关
  const [musicSwitch, setMusicSwitch] = useState(false);
  // 音乐的播放进度
  const [musicProgress, setMusicProgress] = useState(0);
  const { 
    avatarSize,
    inlineIconSize,
    textFontSize,
    textColor,
    singerFontSize,
    singerColor,
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
   * 自动播放下一首
   */
  const autoPlayNext = () => {
    animationStop();
    setMusic(Songs[(music.index+1) % 12]);
    setTimeout(() => {
      animationPlay();
    }, 1000);
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
  /**
   * 初始化编辑框信息
   */
  const initEditorInfo = (e: any) => {
    e.preventDefault();
    em.emit(GET_STYLE_INFO,{
      pageKey,
      componentKey,
      avatarSize,
      inlineIconSize,
      textFontSize,
      textColor,
      singerFontSize,
      singerColor,
      iconColor
    })
  }

  useEffect(() => {
    // 获取样式信息
    getStyle(pageKey, componentKey)
      .then((res: any) => {
        setState(res);
      });
    // 更新样式信息
    em.on(UPDATE_STYLE_INFO, (data: any) => {
      if(data.pageKey === pageKey && data.componentKey === componentKey) {
        getStyle(pageKey, componentKey)
        .then((res: any) => {
          setState(res);
        });
      }
    })

    // 清除头像旋转定时器
    return () => cancelAnimationFrame(timerId.current);
  },[])


  return (
    <div 
      className={[styles.container, editorClassName()].join(' ')} 
      style={{ backgroundColor, width: isDev() ? '25vw' : '100vw', left: isDev() ? '37.5vw' : 0 }}
      onContextMenu={initEditorInfo}
    >
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize), transform: `rotate(${rotatePos}deg)` }}>
        <Link to={`/music/info=${music.index}`}>
          <img src={music.image} className={styles.inlineIcon}/>
        </Link>      
      </div>
      <Link to={`/music/info=${music.index}`}>
      <div className={styles.info} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <p 
          style={{ fontSize: rem(textFontSize), color: textColor }} 
          className={styles.title}
        >
          {music.name}
        </p>
        <p
          style={{ fontSize: rem(singerFontSize), color: singerColor }} 
          className={styles.author}
        >
          {`~  ${music.singer}`}
        </p>
      </div>
      </Link>
      <div className={styles.progress}>
        <Progress 
          type="circle" 
          percent={musicProgress} 
          width={24} 
          trailColor='#1C1D1F'
          strokeColor='#303132'
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
        <audio 
          id={'audio'} 
          src={music.source} 
          onTimeUpdate={onTimeUpdate}
          onEnded={autoPlayNext}
        />
        <MenuUnfoldOutlined style={{ fontSize: '42rem', color: '#7E7F81', marginLeft: '50rem' }}/>
    </div>
    </div>
  )
}

export default memo(Player);
