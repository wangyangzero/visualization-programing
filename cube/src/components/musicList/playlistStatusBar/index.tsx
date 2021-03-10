/** 歌单播放列表头部的状态栏 */
import React, { memo, useState } from 'react';
import { PlayCircleTwoTone, CheckCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { IPlaylistStatusBarState } from 'src/type/musicList';
import { rem } from 'src/common';
import styles from './style.module.css';

const PlaylistStatusBar = () => {
  const initState: IPlaylistStatusBarState = {
    iconBackgroundColor: '#A53E38',
    iconColor: '#6E6F71',
    text: '播放全部',
    textFontSize: 32,
    textColor: '#767779',
    num: '(2)',
    numFontSize: 24,
    numColor: '#27282A',
  }
  const [state, setState] = useState(initState);
  const { 
    iconBackgroundColor,
    iconColor,
    text,
    textFontSize,
    textColor,
    num,
    numFontSize,
    numColor,  
  } = state;
  return (
    <div className={styles.container}>
      <PlayCircleTwoTone twoToneColor={iconBackgroundColor} style={{ fontSize: 18 }} />
      <span style={{ fontSize: rem(textFontSize), color: textColor }} className={styles.text}>
        {text}
      </span>
      <span style={{ fontSize: rem(numFontSize), color: numColor }} className={styles.num}>
        {num}
      </span>
      <DownloadOutlined style={{ color: iconColor, fontSize: 18 }} className={styles.downloadIcon}/>
      <CheckCircleOutlined style={{ color: iconColor, fontSize: 18 }} className={styles.checkIcon}/>
    </div>
  )
}

export default memo(PlaylistStatusBar);
