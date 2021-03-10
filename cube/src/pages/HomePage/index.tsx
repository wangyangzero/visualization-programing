/** 主页： 我的音乐 */
import React from 'react';
import styles from './style.module.css';
import UserInfo from 'src/components/homepage/userInfo'
import ChannelList from 'src/components/homepage/channelList';
import MyFavoriteMusic from 'src/components/homepage/myFavoriteMusic';
import Motto from 'src/components/homepage/motto';
import SongSheetList from 'src/components/homepage/songSheetList';
import Player from 'src/components/common/player';

const songSheet = [
  {
  avatarUrl: '',
  text: '嘤嘤嘤',
  num: '0首',
  },
  {
    avatarUrl: '',
    text: '可可爱爱莫得脑袋',
    num: '0首',
  }
]

export default function Homepage(): unknown {
  return (
    <div className={styles.container}>
      <section><UserInfo /></section>
      <section><ChannelList /></section>
      <section><MyFavoriteMusic/></section>
      <section><Motto/></section>
      <section><SongSheetList key='create' name='创建歌单' songSheet={songSheet}/></section>
      <section><SongSheetList key='collect' name='收藏歌单' songSheet={songSheet}/></section>
      <section><Player/></section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
