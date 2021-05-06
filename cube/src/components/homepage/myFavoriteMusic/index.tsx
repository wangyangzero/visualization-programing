/** 我喜欢的音乐模块 */
import React, { memo, useState, useRef, useEffect } from 'react';
import { Tag } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { IMyFavoriteMusicState } from 'src/type/homepage';
import { rem, editorClassName, em, PageRange } from 'src/common';
import { getStyle } from 'src/store/setting';
import { HOMEPAGE_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const MyFavoriteMusic = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  const initState: IMyFavoriteMusicState = {
    avatarSize: 100,
    avatarUrl: '',
    heartSize: 40,
    heartColor: '#B2B2B2',
    text: '我喜欢的音乐',
    textFontSize: 28,
    textColor: '#595B5B',
    num: '15首',
    numFontSize: 16,
    numColor: '#3C3C3C',
    tagColor: '#1E1F20',
    tagHeartColor: '#DC143C',
    tagText: '心动模式',
    tagTextFontSize: 16,
    tagTextColor: '',
  }

  // 初始化key值
  const pageKey = 'homepage';
  const componentKey = 'myFavoriteMusic';
  const [state, setState] = useState(initState);
  const [backgroundColor, setBackgroundColor] = useState('#19191B');
  const {
    avatarSize,
    avatarUrl,
    heartSize,
    heartColor,
    text,
    textFontSize,
    textColor,
    num,
    numFontSize,
    numColor,
    tagColor,
    tagHeartColor,
    tagText,
    tagTextFontSize,
    tagTextColor,    
  } = state;

  /**
   * 触摸组件按下
   */
   const onTouchStart = () => {
    setBackgroundColor('#2B2C2E');
  }
  /**
   * 触摸组件弹起
   */
  const onTouchEnd = () => {
    setBackgroundColor('#161719');
  }
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
      avatarSize,
      avatarUrl,
      heartSize,
      heartColor,
      text,
      textFontSize,
      textColor,
      num,
      numFontSize,
      numColor,
      tagColor,
      tagHeartColor,
      tagText,
      tagTextFontSize,
      tagTextColor, 
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
      <Link to='/music/list'>
        <div 
          className={[styles.container, editorClassName()].join(' ')} 
          style={{ backgroundColor }}
          onTouchStart={ onTouchStart }
          onTouchEnd={ onTouchEnd }
          onContextMenu={ initEditorInfo }
          ref = {e => {ref = e}}
        >
          <div 
            className={styles.avatar} 
            style={{ width: rem(avatarSize), height: rem(avatarSize) }}
          >
            <div className={styles.mask}>
              <HeartFilled style={{ fontSize: rem(heartSize), color: heartColor }}/>
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
              {text}
            </p>
            <p className={styles.num} style={{ fontSize: rem(numFontSize), color: numColor }}>
              {num}
            </p>
          </div>
          <Tag color={tagColor} className={styles.tag}>
            <HeartOutlined style={{color: tagHeartColor}}/>
            <p className={styles.tagText} style={{ fontSize: rem(tagTextFontSize), color: tagTextColor }}>
              {tagText}
            </p>
          </Tag>
        </div>
      </Link>
    </Draggable>
  )
}

export default memo(MyFavoriteMusic);
