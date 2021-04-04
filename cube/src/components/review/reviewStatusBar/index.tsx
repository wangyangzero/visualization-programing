import React, { memo, useState } from 'react';
import { IReviewStatusBarState } from 'src/type/review';
import { rem, editorClassName } from 'src/common';
import styles from './style.module.css';

const ReviewStatusBar = () => {
  const initState: IReviewStatusBarState = {
    title: '评论区',
    recommendText: '推荐',
    hotText: '最热',
    newText: '最新',
    fontSize: 24,
    focusColor: '#646567',
    blurColor: '#262729', 
  }

  const [state, setState] = useState(initState);
  const {
    title,
    recommendText,
    hotText,
    newText,
    fontSize,
    focusColor,
    blurColor
  } = state;

  return (
    <div className={[styles.container, editorClassName()].join(' ')}>
      <span style={{ fontSize: rem(fontSize), color: focusColor }} className={styles.title}>
        {title}
      </span>
      <span style={{ fontSize: rem(fontSize), color: focusColor }} className={styles.recommend}>
        {recommendText}
      </span>
      <span style={{ fontSize: rem(fontSize), color: blurColor }} className={styles.hot}>
        {hotText}
      </span>
      <span style={{ fontSize: rem(fontSize), color: blurColor }} className={styles.new}>
        {newText}
      </span>
    </div>
  )
}

export default memo(ReviewStatusBar);
