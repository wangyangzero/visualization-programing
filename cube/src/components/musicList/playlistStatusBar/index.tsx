/** 歌单播放列表头部的状态栏 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { PlayCircleTwoTone, CheckCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { IPlaylistStatusBarState } from 'src/type/musicList';
import Draggable from 'react-draggable';
import { getStyle } from 'src/store/setting';
import { MUSIC_LIST_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { rem, editorClassName, em, PageRange } from 'src/common';
import styles from './style.module.css';

const PlaylistStatusBar = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'musicList';
  const componentKey = 'playlistStatusBar';    
  const initState: IPlaylistStatusBarState = {
    iconBackgroundColor: '#A53E38',
    iconColor: '#6E6F71',
    text: '播放全部',
    textFontSize: 32,
    textColor: '#767779',
    num: '(2)',
    numFontSize: 24,
    numColor: '#27282A',
  }
  const [state, setState] = useState(initState);
  const { 
    iconBackgroundColor,
    iconColor,
    text,
    textFontSize,
    textColor,
    num,
    numFontSize,
    numColor,  
  } = state;

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

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      iconBackgroundColor: '#A53E38',
      iconColor: '#6E6F71',
      text: '播放全部',
      textFontSize: 32,
      textColor: '#767779',
      num: '(2)',
      numFontSize: 24,
      numColor: '#27282A',
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
    // 获取组件在页面的位置
    PageRange['musicList'][index].top = ref.offsetTop;
    PageRange['musicList'][index].bottom = ref.offsetTop + ref.offsetHeight;
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        ref={e => { ref = e }}
        onContextMenu={initEditorInfo}
      >
        <PlayCircleTwoTone twoToneColor={iconBackgroundColor} style={{ fontSize: 18 }} />
        <span style={{ fontSize: rem(textFontSize), color: textColor }} className={styles.text}>
          {text}
        </span>
        <span style={{ fontSize: rem(numFontSize), color: numColor }} className={styles.num}>
          {num}
        </span>
        <DownloadOutlined style={{ color: iconColor, fontSize: 18 }} className={styles.downloadIcon}/>
        <CheckCircleOutlined style={{ color: iconColor, fontSize: 18 }} className={styles.checkIcon}/>
      </div>
    </Draggable>
  )
}

export default memo(PlaylistStatusBar);
