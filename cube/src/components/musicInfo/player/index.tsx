/** 底部的播放模块 */
import React, { memo, useState } from 'react';
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
  RedoOutlined
 } from '@ant-design/icons';
import { IPlayerState } from 'src/type/musicInfo';
import styles from './style.module.css';

const Player = () => {
  const initState: IPlayerState = {
    iconColor: '#BEBFB7',
    timerColor: '#8E9181',
    timerFontSize: 12,
    progressColor: '#969A8A',
  }
  const [state, setState] = useState(initState);
  const { iconColor, timerFontSize, timerColor, progressColor } = state;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <HeartOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <DownloadOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <BellOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <MessageOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
        <MoreOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.headerIcon}/>
      </header>
      <div className={styles.content}>
        <span style={{ fontSize: rem(timerFontSize), color: timerColor }} className={styles.timerText}>
          00.30
        </span>
        <Progress 
          percent={30} 
          showInfo={false} 
          className={styles.progress}
          strokeWidth={2}
          strokeColor={progressColor}
          trailColor='#737A64'
        />
        <span style={{ fontSize: rem(timerFontSize), color: timerColor }} className={styles.timerText}>
          01.40
        </span>
      </div>
      <footer className={styles.footer}>
        <RedoOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
        <StepBackwardOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
        <PlayCircleOutlined style={{ color: iconColor, fontSize:rem(80) }} className={styles.footerIcon}/>
        <StepForwardOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
        <MenuFoldOutlined style={{ color: iconColor, fontSize:rem(40) }} className={styles.footerIcon}/>
      </footer>
    </div>
  )
}

export default memo(Player);
