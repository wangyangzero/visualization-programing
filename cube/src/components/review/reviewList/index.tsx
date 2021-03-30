import React, { memo, useState } from 'react';
import { IReviewListState } from 'src/type/review';
import Comment from './comment';
import styles from './style.module.css';

const ReviewList = () => {
  const initState: IReviewListState = {
    reviews: [
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        dates: '1617113143303',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        replyId: -1,
        replyNum: 136,
      },
    ]
  }
  const [state, setState] = useState(initState);
  const { reviews } = state;
  return (
    <div className={styles.container}>
      {
        reviews.map((item, index) => (
          <Comment 
            key={JSON.stringify(item)+index}
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
