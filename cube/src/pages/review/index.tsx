import React from 'react';
import StatusBar from 'src/components/review/statusBar';
import Deal from 'src/components/review/deal';
import ReviewStatusBar from 'src/components/review/reviewStatusBar';
import ReviewList from 'src/components/review/reviewList';
import CommentBox from 'src/components/review/commentBox'
import styles from './style.module.css';

export default function Review() {
  return (
    <div className={styles.container}>
      <header><StatusBar /></header>
      <section><Deal /></section>
      <section><ReviewStatusBar /></section>
      <section><ReviewList /></section>
      <section><CommentBox /></section>
      <footer className={styles.footer}></footer>
    </div>
  );
}

