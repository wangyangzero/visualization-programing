import React, { memo, useState, useEffect, useRef } from 'react';
import { IReviewListState, ICommentProp } from 'src/type/review';
import Comment from './comment';
import { getReviewList } from 'src/store';
import { em, getIndex } from 'src/common';
import styles from './style.module.css';
import { REVIEW_UPDATE } from 'src/constants';

const ReviewList = () => {
  const initState: IReviewListState = {
    reviews: []
  };
  // replyId = -1 表示对评论进行回复功能失效
  const replyId = -1;
  // 歌曲索引
  const songId = getIndex();  
  const [state, setState] = useState(initState);

  useEffect(() => {
    // 页面初始化时请求评论数据
    getReviewList(replyId, songId)
      .then((data) => {
        const states: IReviewListState = {
          reviews: data,
        }
        setState(states);
      });
    em.on(REVIEW_UPDATE, (isReviewUpdate) => {
      isReviewUpdate && updateReviewList();
    })
  },[]);

  /**
   * 滚动到页面底部
   */
   const scrollToBottom = () => {
     // 获取页面根节点
     const container: any = document.getElementById('container');
    // 页面实际高度
    const pageHeight = container?.scrollHeight || 0;
    // 页面可视高度
    const clientHeight = container?.clientHeight || 0;
    // 滚动偏移量
    const scrollOffset = pageHeight - clientHeight;
    // 滚动到最下层，兼容旧版Chrome
    document.body.scrollTop = scrollOffset;
    document.documentElement.scrollTop = scrollOffset;
  };

  /**
   * 更新评论列表
   */
   const updateReviewList = () => {
    getReviewList(replyId, songId)
    .then((data) => {
      const states: IReviewListState = {
        reviews: data,
      };
      setState(states);
      scrollToBottom();
      em.emit(REVIEW_UPDATE,false);
    });
  };

  const { reviews } = state;

  return (
    <div className={styles.container} id="container">
      {
        reviews.map((item: ICommentProp, index: number) => (
          <Comment 
            key={JSON.stringify(item)+index}
            reviewId={item.reviewId}
            avatarUrl={item.avatarUrl}
            username={item.username}
            dates={item.dates}
            likes={item.likes}
            msg={item.msg}
            replyId={item.replyId}
            replyNum={item.replyNum}
          />
        ))
      }
    </div>
  )
}

export default memo(ReviewList);
