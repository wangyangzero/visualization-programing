import React from 'react';
import StatusBar from 'src/components/musicList/statusBar';
import PlayListInfo from 'src/components/musicList/playlistInfo';
import styles from './style.module.css';

export default function MusicList() {
  return (
    <>
      <section><StatusBar /></section>
      <section><PlayListInfo /></section>
    </>
  );
}

