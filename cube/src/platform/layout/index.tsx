import React, { memo } from 'react';
import styles from './style.module.css';

const Layout = () => {
  return (
    <div className={styles.container}></div>
  );
}

export default memo(Layout);