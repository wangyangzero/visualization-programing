import React, { memo, useState } from 'react';
import { ISongInfoProp, ISongInfoState } from 'src/type/musicList';
import { YoutubeOutlined, MoreOutlined } from '@ant-design/icons';
import { rem } from 'src/common';
import styles from './style.module.css';

const SongInfo = (props: ISongInfoProp) => {
  const { index, name, singer } = props;
  const initState: ISongInfoState = {
    nameFontSize: 28,
    nameColor: '#666769',
    singerFontSize: 12,
    singerColor: '#2E2F31',
    iconColor: '#2E2F31'
  }
  const [state, setState] = useState(initState);
  const {
    nameColor,
    nameFontSize,
    singerColor,
    singerFontSize,
    iconColor,
  } = state;
  return (
    <div className={styles.container}>
      <div className={styles.index}>{index}</div>
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
  )
}

export default memo(SongInfo);
