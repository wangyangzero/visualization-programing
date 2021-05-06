import React, { memo, useState, useRef, useEffect } from 'react';
import { IPlaylistState } from 'src/type/musicList';
import SongInfo from './songInfo';
import { Songs, editorClassName, em, PageRange } from 'src/common';
import Draggable from 'react-draggable';
import { MUSIC_LIST_LAYOUT_CHANGE } from 'src/constants';
import styles from './style.module.css';

const Playlist = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  const initState:IPlaylistState = {
    songInfo: Songs
  }
  const [state, setState] = useState(initState);
  const { songInfo } = state;

  /**
   * 处理拖拽事件
   * @param e 
   */
   const onDragStop = (e: any) => {
    const posY = e.pageY;
    const range = PageRange['musicList']
    let newIndex = index;
    for(let i = 0;i < range.length; i++) {
      if (range[i].top <= posY && posY <= range[i].bottom) {
        newIndex = i;
        break;
      }
    }
    em.emit(MUSIC_LIST_LAYOUT_CHANGE, { preIndex: index, newIndex });
  }

  useEffect(() => {
    // 获取组件在页面的位置
    PageRange['musicList'][index].top = ref.offsetTop;
    PageRange['musicList'][index].bottom = ref.offsetTop + ref.offsetHeight;
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div className={[styles.container, editorClassName()].join(' ')} ref={e => { ref = e }}>
        {songInfo.map((item, index) => (
          <SongInfo 
            key={JSON.stringify(item) + index} 
            index={item.index} 
            name={item.name} 
            singer={item.singer}
            source={item.source}
            image={item.image}
          />
        ))}
      </div>
    </Draggable>
  )
}

export default memo(Playlist)
