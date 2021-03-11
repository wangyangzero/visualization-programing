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
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
      },
      {
        avatarUrl: '',
        username: '为2020决一死战',
        date: '2019年11月29日',
        likes: 663,
        msg: '更好的十年~，和宸宸一起',
        reply: '136条回复',
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
            date={item.date}
            likes={item.likes}
            msg={item.msg}
            reply={item.reply}
          />
        ))
      }
    </div>
  )
}

export default memo(ReviewList);
