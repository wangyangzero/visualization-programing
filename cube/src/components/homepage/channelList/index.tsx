/** 首页频道入口 */
import React, { memo, useState } from 'react';
import iconCollect from 'src/assets/img/homepage-collect-ic.png';
import iconDownLoad from 'src/assets/img/homepage-download-ic.png';
import iconFriend from 'src/assets/img/homepage-friend-ic.png';
import iconHistory from 'src/assets/img/homepage-history-ic.png';
import iconLike from 'src/assets/img/homepage-like-ic.png';
import iconLocal from 'src/assets/img/homepage-local-ic.png';
import iconCloud from 'src/assets/img/homepage-cloud-ic.png';
import Channel from './channel';
import { IChannelListState } from 'src/type/homepage';
import { editorClassName } from 'src/common';
import styles from './style.module.css';

const ChannelList = () => {
  const initState: IChannelListState = {
    imgSources: [
      iconLike, 
      iconCloud, 
      iconDownLoad, 
      iconHistory, 
      iconLocal, 
      iconCollect, 
      iconFriend],
    texts: ['赞','云盘','下载','最近播放','本地','我的收藏','我的好友']
  }
  const [state, setState] = useState(initState);

  const { imgSources, texts } = state;

  return (
    <div className={[styles.container, editorClassName()].join(' ')}>
      {texts.map((item, index) => (
        <Channel 
          key={item+index} 
          text={item} 
          imgSource={imgSources[index]} 
        />
      ))}
    </div>
  )
} 

export default memo(ChannelList);
