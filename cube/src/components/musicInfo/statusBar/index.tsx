/** 顶部的状态栏信息 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { IStatusBarState } from 'src/type/musicInfo';
import { DownOutlined, ShareAltOutlined } from '@ant-design/icons';
import { rem, Songs, getIndex, editorClassName, PageRange, em } from 'src/common';
import { getStyle } from 'src/store/setting';
import Draggable from 'react-draggable';
import { MUSIC_INFO_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const StatusBar = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
    // 初始化key值
    const pageKey = 'musicInfo';
    const componentKey = 'player';    
  // 歌曲索引
  const songIndex = getIndex();
  const initState: IStatusBarState = {
    nameFontSize: 28,
    nameColor: '#93A39F',
    singerFontSize: 16,
    singerColor: '#758A6F',
    iconColor: '#859790'
  }
  const [ state, setState ] = useState(initState);
  const {
    nameColor,
    nameFontSize,
    singerColor,
    singerFontSize,
    iconColor,
  } = state;

  /**
   * 处理拖拽事件
   * @param e 
   */
   const onDragStop = (e: any) => {
    const posY = e.pageY;
    const range = PageRange['musicInfo']
    let newIndex = index;
    for(let i = 0;i < range.length; i++) {
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
      nameFontSize: 28,
      nameColor: '#93A39F',
      singerFontSize: 16,
      singerColor: '#758A6F',
      iconColor: '#859790'
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
    PageRange['musicInfo'][index].top = ref.offsetTop;
    PageRange['musicInfo'][index].bottom = ref.offsetTop + ref.offsetHeight;
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        ref={e => {ref = e}}
        onContextMenu={initEditorInfo}
      >
        <Link to='/'>
          <DownOutlined style={{ fontSize: rem(40), color: iconColor }}/>
        </Link>
        <div className={styles.content}>
          <span className={styles.name} style={{fontSize: rem(nameFontSize), color: nameColor}}>
            {Songs[songIndex]?.name}
          </span>
          <span className={styles.singer} style={{fontSize: rem(singerFontSize), color: singerColor}}>
            {Songs[songIndex]?.singer}
          </span>
        </div>
        <ShareAltOutlined 
          className={styles.shareIcon} 
          style={{ fontSize: rem(40), color: iconColor }} 
        />
      </div>
    </Draggable>
  )
}

export default memo(StatusBar);
