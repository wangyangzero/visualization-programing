/** 评论界面顶层状态栏 */
import React, { memo, useState } from 'react';
import { IStatusBarState } from 'src/type/review';
import { ArrowLeftOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { rem, getIndex, isDev } from 'src/common';
import styles from './style.module.css';

const StatusBar = () => {
  // 歌曲索引
  const index = getIndex();  
  const initState: IStatusBarState = {
    text: '评论(233)',
    textFontSize: 28,
    textColor: '#93A39F',
    iconColor: '#859790'
  }
  const [state, setState] = useState(initState);
  const {
    text,
    textFontSize,
    textColor,
    iconColor,
  } = state;
  return (
    <div className={styles.container} style={{ width: isDev() ? '25vw' : '100vw' }}>
      <Link to={`music/info=${index}`}>
        <ArrowLeftOutlined style={{ color: iconColor, fontSize: rem(40) }}/>
      </Link>
      <span className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
        {text}
      </span>
      <ShareAltOutlined style={{ color: iconColor, fontSize: rem(40) }} className={styles.shareIcon}/>
    </div>
  )
}

export default memo(StatusBar);
