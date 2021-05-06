/** 评论界面顶层状态栏 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { IStatusBarState } from 'src/type/review';
import { ArrowLeftOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { getStyle } from 'src/store/setting';
import { REVIEW_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { rem, getIndex, isDev, editorClassName, em, PageRange } from 'src/common';
import styles from './style.module.css';

const StatusBar = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'review';
  const componentKey = 'statusBar'; 
  // 歌曲索引
  const songIndex = getIndex();  
  const initState: IStatusBarState = {
    text: '评论(233)',
    textFontSize: 28,
    textColor: '#93A39F',
    iconColor: '#859790'
  }
  const [state, setState] = useState(initState);
  const {
    text,
    textFontSize,
    textColor,
    iconColor,
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
      text: '评论(233)',
      textFontSize: 28,
      textColor: '#93A39F',
      iconColor: '#859790'
    })
  }

  useEffect(() => {
    // 获取样式信息
    getStyle('review', 'statusBar')
      .then((res: any) => {
        console.log('res', res);
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
        style={{ width: isDev() ? '25vw' : '100vw', left: isDev() ? '37.5vw' : 0 }}
        ref={e => {ref = e}}
        onContextMenu={initEditorInfo}
      >
        <Link to={`music/info=${songIndex}`}>
          <ArrowLeftOutlined style={{ color: iconColor, fontSize: rem(40) }}/>
        </Link>
        <span className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
          {text}
        </span>
        <ShareAltOutlined style={{ color: iconColor, fontSize: rem(40) }} className={styles.shareIcon}/>
      </div>
    </Draggable>
  )
}

export default memo(StatusBar);
