/** 格言模块 */
import React, { memo, useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { editorClassName, PageRange, em } from 'src/common';
import { HOMEPAGE_LAYOUT_CHANGE } from 'src/constants';
import styles from './style.module.css'

const Motto = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  const [motto, setMotto] = useState('更好的十年~ with c.c');
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
        <span className={styles.splitLine} />
        <span className={styles.text}>{motto}</span>
        <span className={styles.splitLine} />
      </div>
    </Draggable>
  )
}

export default memo(Motto);
