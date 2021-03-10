import React from 'react';
import StatusBar from 'src/components/musicList/statusBar';
import PlaylistInfo from 'src/components/musicList/playlistInfo';
import PlaylistStatusBar from 'src/components/musicList/playlistStatusBar';
import Player from 'src/components/common/player';
import Playlist from 'src/components/musicList/playlist';
import styles from './style.module.css';

export default function MusicList() {
  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <section><StatusBar /></section>
      <section><PlaylistInfo /></section>
      <section><PlaylistStatusBar /></section>
      <section><Playlist/></section>
      <section><Player/></section>
      <footer className={styles.footer}></footer>
    </div>
  );
}

