/** 顶部状态栏 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { IStatusBarState } from 'src/type/musicList';
import { ArrowLeftOutlined, SearchOutlined, MoreOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { getStyle } from 'src/store/setting';
import { MUSIC_LIST_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { rem, isDev, editorClassName, em, PageRange } from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const StatusBar = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'musicList';
  const componentKey = 'statusBar';      
  const initState: IStatusBarState = {
    text: '歌单',
    textFontSize: 32,
    textColor: '#8F9490',
    iconColor: '#8F9490'
  }
  const [state, setState] = useState(initState);
  const { text, textFontSize, textColor, iconColor } = state;
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
      text: '歌单',
      textFontSize: 32,
      textColor: '#8F9490',
      iconColor: '#8F9490'
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
        style={{ width: isDev() ? '25vw' : '100vw', left: isDev() ? '37.5vw' : 0 }}
        ref={e => { ref = e }}
        onContextMenu={initEditorInfo}
      >
        <Link to='/'><ArrowLeftOutlined style={{ fontSize: rem(36), color: iconColor }} /></Link>
        <span style={{ fontSize: rem(textFontSize), color: textColor }} className={styles.text}>
          {text}
        </span>
        <SearchOutlined style={{ fontSize: rem(36), color: iconColor }} className={styles.search}/>
        <MoreOutlined style={{ fontSize: rem(36), color: iconColor }} className={styles.more}/>
      </div>
    </Draggable>
  )
}

export default memo(StatusBar);
