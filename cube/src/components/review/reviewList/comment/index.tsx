import React, { memo, useState, useEffect } from 'react';
import { ICommentProp, ICommentState } from 'src/type/review';
import avatarSource from 'src/assets/img/homepage-heart-background-ic.png'
import { LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { rem, timestampToTime, em } from 'src/common';
import { getStyle } from 'src/store/setting';
import { REVIEW_UPDATE, GET_STYLE_INFO, UPDATE_STYLE_INFO } from 'src/constants';
import { deleteReview, updateReviewLikes } from 'src/store';
import { Popover  } from 'antd';
import styles from './style.module.css';

const Comment = (props: ICommentProp) => {
  const { avatarUrl, username, dates, likes, msg, reviewId } = props;
  // 初始化key值
  const pageKey = 'review';
  const componentKey = 'comment';     
  const date = timestampToTime(dates);
  const initState: ICommentState = {
    avatarSize: 72,
    usernameFontSize: 26,
    usernameColor: '#454648',
    dateFontSize: 16,
    dateColor: '#444345',
    likesIconColor: '#454648',
    msgFontSize: 28,
    msgColor: '#545557',
  }
  const [state, setState] = useState(initState);
  // 评论的背景颜色
  const [backgroundColor, setBackgroundColor] = useState('#161616');  
  // 点赞按钮的颜色
  const [thumbColor, setThumbColor] = useState('');
  // 点赞个数
  const [likeNum, setLikeNum] = useState(likes);

  const {
    avatarSize,
    usernameColor,
    usernameFontSize,
    dateColor,
    dateFontSize,
    likesIconColor,
    msgColor,
    msgFontSize,
  } = state;

  /**
   * 删除评论
   */
  const deleteReviews = () => {
    deleteReview(reviewId)
      .then(res => {
        console.log(res);
        em.emit(REVIEW_UPDATE, true);
      });
  }

  /**
   * pop弹框的内容部分
   */
  const popContent = () => {
    return (
    <div className={styles.popContent} onClick={deleteReviews}>
      <DeleteOutlined style={{ color: '#aaa' }}/>
      <span>删除</span>
    </div>)
  }

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
   * 点赞
   */
  const thumbUp = () => {
    if (thumbColor === '') {
      setLikeNum((likeNum || 0) + 1);
      setThumbColor('#8E3830');
      updateReviewLikes((likeNum || 0) + 1, reviewId);
      return;
    }
    setLikeNum((likeNum || 0) - 1);
    setThumbColor('');
    updateReviewLikes((likeNum || 0) - 1, reviewId);
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
  }, [])

  return (
    <div 
      className={styles.container} 
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onContextMenu={initEditorInfo}
      style={{ backgroundColor }}
    >
      <Popover 
        placement="topRight"
        content={popContent}
      >
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
        </div>
        <div className={styles.content}>
          <p className={styles.msg} style={{ fontSize: rem(msgFontSize), color: msgColor }}>
            {msg}
          </p>
        </div>
      </Popover>
      <span className={styles.likes} style={{ color: likesIconColor }} onClick={thumbUp}>
          {likeNum}&nbsp;
          <LikeOutlined style={{ color: thumbColor }}/>
      </span>
      </div>
  )
}

export default memo(Comment);
