import React, { memo } from 'react';
import { Input } from 'antd';
import styles from './style.module.css';

const Design = () => {
  return (
    <div className={styles.container}>
              <p className={styles.title}>样式编辑区~</p>
      <div className={styles.editor}>
        <div className={styles.item}>
          <span className={styles.content}>字体大小：</span>
          <Input placeholder="请输入字体大小" style={{ width: 300 }} />
        </div>
        <div className={styles.item}>
          <span className={styles.content}>字体大小：</span>
          <Input placeholder="请输入字体大小" style={{ width: 300 }} />
        </div>
        <div className={styles.item}>
          <span className={styles.content}>字体大小：</span>
          <Input placeholder="请输入字体大小" style={{ width: 300 }} />
        </div>
        <div className={styles.item}>
          <span className={styles.content}>字体大小：</span>
          <Input placeholder="请输入字体大小" style={{ width: 300 }} />
        </div>
        <div className={styles.item}>
          <span className={styles.content}>字体大小：</span>
          <Input placeholder="请输入字体大小" style={{ width: 300 }} />
        </div>
      </div>
    </div>
  );
}

export default memo(Design);