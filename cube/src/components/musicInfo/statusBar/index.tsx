/** 顶部的状态栏信息 */
import React, { memo, useState } from 'react';
import { IStatusBarState } from 'src/type/musicInfo';
import { DownOutlined, ShareAltOutlined } from '@ant-design/icons';
import { rem } from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const StatusBar = () => {
  const initState: IStatusBarState = {
    name: 'Sky High',
    nameFontSize: 28,
    nameColor: '#93A39F',
    singer: 'Thomas Prime',
    singerFontSize: 16,
    singerColor: '#758A6F',
    iconColor: '#859790'
  }
  const [ state, setState ] = useState(initState);
  const {
    name,
    nameColor,
    nameFontSize,
    singer,
    singerColor,
    singerFontSize,
    iconColor,
  } = state;

  return (
    <div className={styles.container}>
      <Link to='/'>
        <DownOutlined style={{ fontSize: rem(40), color: iconColor }}/>
      </Link>
      <div className={styles.content}>
        <span className={styles.name} style={{fontSize: rem(nameFontSize), color: nameColor}}>
          {name}
        </span>
        <span className={styles.singer} style={{fontSize: rem(singerFontSize), color: singerColor}}>
          {singer}
        </span>
      </div>
      <ShareAltOutlined 
        className={styles.shareIcon} 
        style={{ fontSize: rem(40), color: iconColor }} 
      />
    </div>
  )
}

export default memo(StatusBar);
