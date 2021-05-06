/** 歌单集模块 */
import React, { memo, useState, useRef, useEffect } from 'react';
import SongSheet from './songSheet';
import { ISongSheetListProp, ISongSheetListState } from 'src/type/homepage';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { rem, editorClassName, em, PageRange } from 'src/common';
import { getStyle } from 'src/store/setting';
import { HOMEPAGE_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import Draggable from 'react-draggable';
import styles from './style.module.css';

const SongSheetList = (props: ISongSheetListProp) => {
  const { keys, name, songSheet, index } = props;
  let ref: any = useRef();
  const initState: ISongSheetListState = {
    textFontSize: 16,
    textColor: '#3C3C3C',
    iconColor: '#3C3C3C',
  } 

  // 初始化key值
  const pageKey = 'homepage';
  const componentKey = 'songSheetList';
  const [state, setState] = useState(initState)
  const songListNum = songSheet?.length || 0;
  const { textColor, textFontSize, iconColor } = state;

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

  const initEditorInfo = (e: any) => {
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      textFontSize: 16,
      textColor: '#3C3C3C',
      iconColor: '#3C3C3C',
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
    PageRange['homepage'][index].top = ref.offsetTop;
    PageRange['homepage'][index].bottom = ref.offsetTop + ref.offsetHeight;
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        ref={e => { ref = e }}
        onContextMenu={ initEditorInfo }
      >
        <header key={keys} className={styles.header}>
          <span className={styles.text} style={{fontSize: rem(textFontSize), color: textColor}}>
            {`${name}(${songListNum}个)`}
          </span>
          <PlusOutlined style={{ color: iconColor }} className={styles.addIcon}/>
          <MoreOutlined style={{ color: iconColor }} className={styles.moreIcon}/>
        </header>
        <div className={styles.content}>
          {
            songSheet.map((item, index) => 
              <SongSheet 
                key={JSON.stringify(item)+index} 
                avatarUrl={item.avatarUrl} 
                text={item.text} 
                num={item.num}
              />
            )
          }  
        </div>
      </div>
  </Draggable>
  )
}

export default memo(SongSheetList);
