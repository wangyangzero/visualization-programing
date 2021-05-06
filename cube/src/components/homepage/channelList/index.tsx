/** 首页频道入口 */
import React, { memo, useState, useRef, useEffect } from 'react';
import iconCollect from 'src/assets/img/homepage-collect-ic.png';
import iconDownLoad from 'src/assets/img/homepage-download-ic.png';
import iconFriend from 'src/assets/img/homepage-friend-ic.png';
import iconHistory from 'src/assets/img/homepage-history-ic.png';
import iconLike from 'src/assets/img/homepage-like-ic.png';
import iconLocal from 'src/assets/img/homepage-local-ic.png';
import iconCloud from 'src/assets/img/homepage-cloud-ic.png';
import Channel from './channel';
import { IChannelListState } from 'src/type/homepage';
import { editorClassName, PageRange, em } from 'src/common';
import { HOMEPAGE_LAYOUT_CHANGE } from 'src/constants';
import Draggable from 'react-draggable';
import styles from './style.module.css';

const ChannelList = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
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

  /**
   * 处理拖拽事件
   * @param e 
   */
  const onDragStop = (e: any) => {
    const posY = e.pageY;
    const range = PageRange['homepage']
    let newIndex = index;
    for(let i = 0;i < range.length; i++) {
      if (range[i].top <= posY && posY <= range[i].bottom) {
        newIndex = i;
        break;
      }
    }
    em.emit(HOMEPAGE_LAYOUT_CHANGE, { preIndex: index, newIndex });
  }

  useEffect(() => {
    
    // 获取组件在页面的位置
    PageRange['homepage'][index].top = ref.offsetTop;
    PageRange['homepage'][index].bottom = ref.offsetTop + ref.offsetHeight;
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div className={[styles.container, editorClassName()].join(' ')} ref={e => { ref = e }}>
        {texts.map((item, index) => (
          <Channel 
            key={item+index} 
            text={item} 
            imgSource={imgSources[index]} 
          />
        ))}
      </div>
    </Draggable>
  )
} 

export default memo(ChannelList);
