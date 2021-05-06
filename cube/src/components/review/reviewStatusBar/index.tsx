import React, { memo, useState, useRef, useEffect } from 'react';
import { IReviewStatusBarState } from 'src/type/review';
import Draggable from 'react-draggable';
import { getStyle } from 'src/store/setting';
import { REVIEW_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { rem, editorClassName, em, PageRange } from 'src/common';
import styles from './style.module.css';

const ReviewStatusBar = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'review';
  const componentKey = 'reviewStatusBar';    
  const initState: IReviewStatusBarState = {
    text: '评论区',
    recommendText: '推荐',
    hotText: '最热',
    newText: '最新',
    fontSize: 24,
    focusColor: '#646567',
    blurColor: '#262729', 
  }

  const [state, setState] = useState(initState);
  const {
    text,
    recommendText,
    hotText,
    newText,
    fontSize,
    focusColor,
    blurColor
  } = state;

  /**
   * 处理拖拽事件
   * @param e 
   */
   const onDragStop = (e: any) => {
    const posY = e.pageY;
    const range = PageRange['review']
    let newIndex = index;
    for(let i = 0;i < range.length; i++) {
      if (range[i].top <= posY && posY <= range[i].bottom) {
        newIndex = i;
        break;
      }
    }
    em.emit(REVIEW_LAYOUT_CHANGE, { preIndex: index, newIndex });
  }

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      avatarSize: 72,
      usernameFontSize: 26,
      usernameColor: '#454648',
      dateFontSize: 16,
      dateColor: '#444345',
      likesIconColor: '#454648',
      msgFontSize: 28,
      msgColor: '#545557',
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
    PageRange['review'][index].top = ref.offsetTop;
    PageRange['review'][index].bottom = ref.offsetTop + ref.offsetHeight;
  },[])

  return (
    <Draggable onStop={onDragStop}>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        ref={e => {ref = e}}
        onContextMenu={initEditorInfo}
      >
        <span style={{ fontSize: rem(fontSize), color: focusColor }} className={styles.title}>
          {text}
        </span>
        <span style={{ fontSize: rem(fontSize), color: focusColor }} className={styles.recommend}>
          {recommendText}
        </span>
        <span style={{ fontSize: rem(fontSize), color: blurColor }} className={styles.hot}>
          {hotText}
        </span>
        <span style={{ fontSize: rem(fontSize), color: blurColor }} className={styles.new}>
          {newText}
        </span>
      </div>
    </Draggable>
  )
}

export default memo(ReviewStatusBar);
