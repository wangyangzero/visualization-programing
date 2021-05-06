/** 评论页面deal */
import React, { memo, useState, useRef, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { IDealState } from 'src/type/review';
import Draggable from 'react-draggable';
import { getStyle } from 'src/store/setting';
import { REVIEW_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { rem, Songs, getIndex, editorClassName , em, PageRange} from 'src/common';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Deal = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'review';
  const componentKey = 'deal';   
  // 歌曲索引
  const songIndex = getIndex();  
  const music = Songs[songIndex];
  const initState: IDealState = {
    avatarSize: 120,
    nameFontSize: 28,
    nameColor: '#595B5B',
    singerFontSize: 16,
    singerColor: '#506A90',
    iconColor: '#595B5B',
  }

  const [state, setState] = useState(initState);
  // 评论的背景颜色
  const [backgroundColor, setBackgroundColor] = useState('#161616');    
  const {
    avatarSize,
    nameFontSize,
    nameColor,
    singerFontSize,
    singerColor,
    iconColor,   
  } = state;

  /**
   * 触摸组件按下
   */
   const onTouchStart = () => {
    setBackgroundColor('#232323');
  }

  /**
   * 触摸组件弹起
   */
  const onTouchEnd = () => {
    setBackgroundColor('#161616');
  }

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
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      avatarSize: 120,
      nameFontSize: 28,
      nameColor: '#595B5B',
      singerFontSize: 16,
      singerColor: '#506A90',
      iconColor: '#595B5B',
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
      <Link to={`music/info=${songIndex}`}>
        <div 
          className={[styles.container, editorClassName()].join(' ')}      
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ backgroundColor }}
          ref={e => {ref = e}}
          onContextMenu={initEditorInfo}
        >
          <img 
            src={music.image}
            className={styles.avatar} 
            style={{ width: rem(avatarSize), height: rem(avatarSize) }} 
          />
          <div className={styles.content}>
            <p className={styles.text} style={{ fontSize: rem(nameFontSize), color: nameColor }}>
              {music.name}
            </p>
            <p className={styles.num} style={{ fontSize: rem(singerFontSize), color: singerColor }}>
              {music.singer}
            </p>
          </div>
          <RightOutlined style={{ color: iconColor, fontSize: rem(24) }} className={styles.icon}/>
        </div>
      </Link>
    </Draggable>
  )
}

export default memo(Deal);