import React, { memo, useState, useEffect, useRef } from 'react';
import { IReviewListState, ICommentProp } from 'src/type/review';
import Comment from './comment';
import { getReviewList } from 'src/store';
import Draggable from 'react-draggable';
import { REVIEW_LAYOUT_CHANGE } from 'src/constants';
import { em, getIndex, editorClassName, PageRange } from 'src/common';
import styles from './style.module.css';
import { REVIEW_UPDATE } from 'src/constants';

const ReviewList = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  const initState: IReviewListState = {
    reviews: []
  };
  // replyId = -1 表示对评论进行回复功能失效
  const replyId = -1;
  // 歌曲索引
  const songId = getIndex();  
  const [state, setState] = useState(initState);

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
    // 获取组件在页面的位置
    PageRange['review'][index].top = ref.offsetTop;
    PageRange['review'][index].bottom = ref.offsetTop + ref.clientHeight;    
  },[]);

  /**
   * 滚动到页面底部
   */
   const scrollToBottom = () => {
     // 获取组件根节点
     const container: any = document.getElementById('container');
     // 获取页面根节点
     const root: any = document.getElementById('root');
    // 页面实际高度
    const pageHeight = container?.scrollHeight || 0;
    // 页面可视高度
    const clientHeight = root?.clientHeight || 0;
    // 滚动偏移量
    const scrollOffset = pageHeight - clientHeight;
    // 首尾固定布局偏移量
    const initOffset = 300;

    // 滚动到最下层，兼容旧版Chrome
    document.body.scrollTop = scrollOffset + initOffset;
    document.documentElement.scrollTop = scrollOffset + initOffset;
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
    <Draggable onStop={onDragStop}>
      <div className={[styles.container, editorClassName()].join(' ')} id="container" ref={e => {ref = e}}>
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
    </Draggable>
  )
}

export default memo(ReviewList);
