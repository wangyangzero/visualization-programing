/** 中间的磁带模块 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { IMusicTapeState } from 'src/type/musicInfo';
import { rem, em, Songs, getIndex, editorClassName, PageRange } from 'src/common';
import { getStyle } from 'src/store/setting';
import Draggable from 'react-draggable';
import { MUSIC_PLAY, MUSIC_INFO_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import styles from './style.module.css';

const MusicTape = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'musicInfo';
  const componentKey = 'musicTape';  
  // 歌曲索引
  const songIndex = getIndex();
  const timerId = useRef(-1);
  const initState: IMusicTapeState = {
    avatarSize: 480,
    inlineIconSize: 320,
  }
  const [state, setState] = useState(initState);
  // 设置头像旋转的初始位置
  const [rotatePos, setRotatePos] = useState(0);   
  const { 
    avatarSize,
    inlineIconSize,
  } = state;
  /**
   * 控制头像旋转动画的开始
   */
   const avatarRotatePlay = () => {
    setRotatePos(prerotatePos => (prerotatePos + 0.5) % 360);
    timerId.current = requestAnimationFrame(avatarRotatePlay);
  }
  /**
   * 控制头像旋转动画的停止
   */
  const avatarRotateStop = () => {
    cancelAnimationFrame(timerId.current);
  }

  /**
   * 处理拖拽事件
   * @param e 
   */
   const onDragStop = (e: any) => {
    const posY = e.pageY;
    const range = PageRange['musicInfo']
    let newIndex = index;
    for(let i = 0;i < range.length; i++) {
      console.log(range[i].top, posY, range[i].bottom)
      if (range[i].top <= posY && posY <= range[i].bottom) {
        newIndex = i;
        break;
      }
    }
    em.emit(MUSIC_INFO_LAYOUT_CHANGE, { preIndex: index, newIndex });
  }

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      avatarSize: 480,
      inlineIconSize: 320,
    })
  }

  useEffect(() => {
    // 获取样式信息
    getStyle(pageKey, componentKey)
      .then((res: any) => {
        setState(res);
      });
    // 更新样式信息
    em.on(UPDATE_STYLE_INFO, (data: any) => {
      if(data.pageKey === pageKey && data.componentKey === componentKey) {
        getStyle(pageKey, componentKey)
        .then((res: any) => {
          setState(res);
        });
      }
    })   
    em.on(MUSIC_PLAY,function(value: boolean) {
      value ? avatarRotatePlay() : avatarRotateStop();
    });
    // 进入页面时自动播放
    avatarRotatePlay();
    // 获取组件在页面的位置
    PageRange['musicInfo'][index].top = ref.offsetTop;
    PageRange['musicInfo'][index].bottom = ref.offsetTop + ref.offsetHeight;
    // 清除头像旋转定时器
    return () => cancelAnimationFrame(timerId.current);
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        ref={e => { ref = e }}
        onContextMenu={initEditorInfo}
      >
        <div 
          className={styles.avatar} 
          style={{ width: rem(avatarSize), height: rem(avatarSize), transform: `rotate(${rotatePos}deg)` }}>
          <img src={Songs[songIndex].image} className={styles.inlineIcon}/>      
        </div>
      </div>
    </Draggable>
  )
}

export default memo(MusicTape);
