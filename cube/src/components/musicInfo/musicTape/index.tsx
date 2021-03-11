/** 中间的磁带模块 */
import React, { memo, useState } from 'react';
import { IMusicTapeState } from 'src/type/musicInfo';
import { rem } from 'src/common';
import styles from './style.module.css';

const MusicTape = () => {
  const initState: IMusicTapeState = {
    avatarSize: 480,
    inlineIconSize: 320,
  }
  const [state, setState] = useState(initState);
  const { 
    avatarSize,
    inlineIconSize,
  } = state;
  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ width: rem(avatarSize), height: rem(avatarSize) }}>
        <div 
          className={styles.inlineIcon} 
          style={{ width: rem(inlineIconSize), height: rem(inlineIconSize) }} 
        />        
      </div>
    </div>
  )
}

export default memo(MusicTape);
