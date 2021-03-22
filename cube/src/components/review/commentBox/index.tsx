import React, { memo, useState } from 'react';
import { Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { ICommentBoxState } from 'src/type/review';
import { rem } from 'src/common'
import styles from './style.module.css';

const CommentBox = () => {
  const initState: ICommentBoxState = {
    text: '发送',
    fontSize: 32,
    color: '#3A3C40',
    iconColor: '#5B5C5E',
  }
  const [state, setState] = useState(initState);
  const { text, fontSize, color, iconColor } = state;
  return (
    <div className={styles.container}>
      <Input 
        placeholder='千头万绪，化成评论一句'
        bordered={false} 
        style={{ width: rem(500), color: iconColor }}
      />
      <SmileOutlined className={styles.icon} style={{ color: iconColor, fontSize: rem(40) }}/>
      <span className={styles.text} style={{ fontSize: rem(fontSize), color }}>
        {text}
      </span>
    </div>
  )
}

export default memo(CommentBox);
