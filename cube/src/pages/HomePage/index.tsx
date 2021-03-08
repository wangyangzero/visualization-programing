/** 主页： 我的音乐 */
import React from 'react';
import styles from './style.module.css';
import UserInfo from 'src/components/homepage/userInfo'
import ChannelList from 'src/components/homepage/channelList';
import MyFavoriteMusic from 'src/components/homepage/myFavoriteMusic';
import Motto from 'src/components/homepage/motto';

export default function Homepage(): unknown {
  return (
    <>
      <section><UserInfo /></section>
      <section><ChannelList /></section>
      <section><MyFavoriteMusic/></section>
      <section><Motto/></section>
    </>
  );
}
