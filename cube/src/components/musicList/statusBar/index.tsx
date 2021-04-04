/** 顶部状态栏 */
import React, { memo, useState } from 'react';
import { IStatusBarState } from 'src/type/musicList';
import { ArrowLeftOutlined, SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { rem, isDev, editorClassName } from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const StatusBar = () => {
  const initState: IStatusBarState = {
    text: '歌单',
    textFontSize: 32,
    textColor: '#8F9490',
    iconColor: '#8F9490'
  }
  const [state, setState] = useState(initState);
  const { text, textFontSize, textColor, iconColor } = state;
  return (
    <div 
      className={[styles.container, editorClassName()].join(' ')} 
      style={{ width: isDev() ? '25vw' : '100vw', left: isDev() ? '37.5vw' : 0 }}
    >
      <Link to='/'><ArrowLeftOutlined style={{ fontSize: rem(36), color: iconColor }} /></Link>
      <span style={{ fontSize: rem(textFontSize), color: textColor }} className={styles.text}>
        {text}
      </span>
      <SearchOutlined style={{ fontSize: rem(36), color: iconColor }} className={styles.search}/>
      <MoreOutlined style={{ fontSize: rem(36), color: iconColor }} className={styles.more}/>
    </div>
  )
}

export default memo(StatusBar);
