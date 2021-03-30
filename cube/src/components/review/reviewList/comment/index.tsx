import React, { memo, useState } from 'react';
import { ICommentProp, ICommentState } from 'src/type/review';
import avatarSource from 'src/assets/img/homepage-heart-background-ic.png'
import { LikeOutlined, RightOutlined } from '@ant-design/icons';
import { rem, timestampToTime } from 'src/common';
import styles from './style.module.css';

const Comment = (props: ICommentProp) => {
  const { avatarUrl, username, dates, likes, msg, replyId, replyNum } = props;
  const reply = `${replyNum}条回复 `;
  const date = timestampToTime(dates);
  const initState: ICommentState = {
    avatarSize: 72,
    usernameFontSize: 26,
    usernameColor: '#454648',
    dateFontSize: 12,
    dateColor: '#333234',
    likesIconColor: '#454648',
    msgFontSize: 24,
    msgColor: '#545557',
    replyFontSize: 14,
    replyColor: '#293B4F',
  }
  const [state, setState] = useState(initState);

  const {
    avatarSize,
    usernameColor,
    usernameFontSize,
    dateColor,
    dateFontSize,
    likesIconColor,
    msgColor,
    msgFontSize,
    replyColor,
    replyFontSize
  } = state;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img 
          style={{ width: rem(avatarSize), height: rem(avatarSize) }} 
          src={avatarSource}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <span 
            className={styles.username} 
            style={{ fontSize: rem(usernameFontSize), color: usernameColor }}>
              {username}
          </span>
          <span className={styles.date} style={{ fontSize: rem(dateFontSize), color: dateColor }}>
            {date}
          </span>
        </div>
        <span className={styles.likes} style={{ color: likesIconColor }}>
          {likes}&nbsp;
          <LikeOutlined />
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.msg} style={{ fontSize: rem(msgFontSize), color: msgColor }}>
          {msg}
        </p>
        <p className={styles.reply} style={{ fontSize: rem(replyFontSize), color: replyColor }}>
          {reply}
          <RightOutlined style={{ fontSize: rem(18), color: replyColor }}/>
        </p>
      </div>
    </div>
  )
}

export default memo(Comment);
