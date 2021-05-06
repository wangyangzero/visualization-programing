/** 歌单内的个人信息吗模块 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { HeartFilled, RightOutlined } from '@ant-design/icons';
import { IPlayListInfoState } from 'src/type/musicList';
import { rem, editorClassName, em, PageRange } from 'src/common';
import { getStyle } from 'src/store/setting';
import Draggable from 'react-draggable';
import { MUSIC_LIST_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import userIcon from 'src/assets/img/homepage-heart-background-ic.png';
import styles from './style.module.css';

const PlaylistInfo = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'musicList';
  const componentKey = 'playlistInfo';  
  const initState: IPlayListInfoState = {
    avatarSize: 220,
    avatarUrl: '',
    heartSize: 80,
    heartColor: '#B2B2B2',
    text: '我喜欢的音乐',
    textFontSize: 28,
    textColor: '#595B5B',
    userIconUrl: '',
    userIconSize: 40,
    username: '洋洋的小娇妻',
    usernameFontSize: 20,
    usernameColor: '#636363',
    iconColor: '#636363',
  }
  const [state, setState] = useState(initState);
  const {
    avatarSize,
    avatarUrl,
    heartSize,
    heartColor,
    text,
    textColor,
    textFontSize,
    username,
    userIconUrl,
    userIconSize,
    usernameColor,
    usernameFontSize,
    iconColor
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
      avatarSize: 220,
      avatarUrl: '',
      heartSize: 80,
      heartColor: '#B2B2B2',
      text: '我喜欢的音乐',
      textFontSize: 28,
      textColor: '#595B5B',
      userIconUrl: '',
      userIconSize: 40,
      username: '洋洋的小娇妻',
      usernameFontSize: 20,
      usernameColor: '#636363',
      iconColor: '#636363',
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
        ref={e => {ref=e}}
        onContextMenu={initEditorInfo}
      >
        <div 
          className={styles.avatar} 
          style={{ width: rem(avatarSize), height: rem(avatarSize) }}>
            <div className={styles.mask}>
              <HeartFilled style={{ fontSize: rem(heartSize), color: heartColor }}/>
            </div>
        </div>
        <div className={styles.content}>
          <p className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
            {text}
          </p>
          <span 
            className={styles.username} 
            style={{ fontSize: rem(usernameFontSize), color: usernameColor }}>
              <img 
                src={userIcon} 
                style={{ width: rem(userIconSize), height: rem(userIconSize) }} 
                className={styles.userIcon}
              />
              <span className={styles.userText}>{username}</span>
              <RightOutlined style={{ color: iconColor, fontSize: '20rem' }}/>
          </span>
        </div>
      </div>
    </Draggable>
  )
}

export default memo(PlaylistInfo)
