/** 格言模块 */
import React, { memo, useState } from 'react';
import { editorClassName } from 'src/common';
import styles from './style.module.css'

const Motto = () => {
  const [motto, setMotto] = useState('更好的十年~ with c.c');
  return (
    <div className={[styles.container, editorClassName()].join(' ')}>
      <span className={styles.splitLine} />
      <span className={styles.text}>{motto}</span>
      <span className={styles.splitLine} />
    </div>
  )
}

export default memo(Motto);
