import React, { memo, useState } from 'react';
import { Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { ICommentBoxState, ICommentProp } from 'src/type/review';
import { rem, getIndex, em, isDev } from 'src/common';
import { REVIEW_UPDATE } from 'src/constants';
import { addReview } from 'src/store/review';
import styles from './style.module.css';

const CommentBox = () => {
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

  return (
    <div className={styles.container} style={{ width: isDev() ? '25vw' : '100vw' }}>
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
