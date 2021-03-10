import React from 'react';
import StatusBar from 'src/components/musicInfo/statusBar';
import MusicTape from 'src/components/musicInfo/musicTape';
import Player from 'src/components/musicInfo/player';
import styles from './style.module.css';

export default function MusicInfo() {
  return (
    <div className={styles.container}>
      <section><StatusBar /></section>
      <section><MusicTape /></section>
      <section><Player/></section>
    </div>
  );
}
