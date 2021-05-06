import React, { memo, useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { ICommentBoxState, ICommentProp } from 'src/type/review';
import { getStyle } from 'src/store/setting';
import { rem, getIndex, em, isDev, editorClassName, PageRange } from 'src/common';
import { REVIEW_UPDATE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { addReview } from 'src/store/review';
import styles from './style.module.css';

const CommentBox = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  // 初始化key值
  const pageKey = 'review';
  const componentKey = 'commentBox';   
  const initState: ICommentBoxState = {
    text: '发送',
    fontSize: 32,
    color: '#3A3C40',
    iconColor: '#5B5C5E',
  }
  // 获取歌曲标识
  const songId: number = getIndex();
  const [state, setState] = useState(initState);
  const { text, fontSize, color, iconColor } = state;
  // 输入框的内容值
  const [inputValue, setInputValue] = useState('');

  const submitReview = () => {
    const data: ICommentProp = {
      avatarUrl: null,
      username: 'lucifer',
      likes: 0,
      msg: inputValue,
      replyId: -1,
      replyNum: 0,
      songId
    };
    addReview(data)
      .then(res => {
        em.emit(REVIEW_UPDATE, true);
        setInputValue('');
      });
  }

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      text: '发送',
      fontSize: 32,
      color: '#3A3C40',
      iconColor: '#5B5C5E',
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
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        style={{ width: isDev() ? '25vw' : '100vw', left: isDev() ? '37.5vw' : 0 }}
        ref={e => {ref = e}}
        onContextMenu={initEditorInfo}
      >
        <Input 
          placeholder='千头万绪，化成评论一句'
          bordered={false} 
          maxLength={200}
          onChange={(e) => { setInputValue(e.target.value) }}
          value={inputValue}
          style={{ width: rem(500), color: iconColor }}
        />
        <SmileOutlined className={styles.icon} style={{ color: iconColor, fontSize: rem(40) }}/>
        <span className={styles.text} style={{ fontSize: rem(fontSize), color }} onClick={submitReview}>
          {text}
        </span>
      </div>
  )
}

export default memo(CommentBox);
