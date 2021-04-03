import React, { memo, useState } from 'react';
import { ISongInfoProp, ISongInfoState } from 'src/type/musicList';
import { YoutubeOutlined, MoreOutlined } from '@ant-design/icons';
import { rem } from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const SongInfo = (props: ISongInfoProp) => {
  const { index, name, singer } = props;
  const initState: ISongInfoState = {
    nameFontSize: 28,
    nameColor: '#666769',
    singerFontSize: 16,
    singerColor: '#4E4F51',
    iconColor: '#2E2F31'
  }
  const [state, setState] = useState(initState);
  const [backgroundColor, setBackgroundColor] = useState('#161616');
  const {
    nameColor,
    nameFontSize,
    singerColor,
    singerFontSize,
    iconColor,
  } = state;
  /**
   * 触摸组件按下
   */
   const onTouchStart = () => {
    setBackgroundColor('#232323');
  }
  /**
   * 触摸组件弹起
   */
  const onTouchEnd = () => {
    setBackgroundColor('#161616');
  }
  return (
    <Link to={`/music/info=${index}`}>
      <div 
        className={styles.container}
        style={{ backgroundColor }}
        onTouchStart={ onTouchStart }
        onTouchEnd={ onTouchEnd }
      >
        <div className={styles.index}>{index+1}</div>
        <div className={styles.content}>
          <p className={styles.name} style={{ fontSize: rem(nameFontSize), color: nameColor }}>
            {name}
          </p>
          <p className={styles.singer} style={{ fontSize: rem(singerFontSize), color: singerColor }}>
            {singer}
          </p>
        </div>
        <YoutubeOutlined className={styles.playIcon} style={{ fontSize: 20, color: iconColor }}/>
        <MoreOutlined className={styles.moreIcon} style={{ fontSize: 20, color: iconColor }}/>
      </div>
    </Link>
  )
}

export default memo(SongInfo);
