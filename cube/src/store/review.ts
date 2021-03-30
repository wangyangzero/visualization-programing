import axios from 'axios';
import { BASE_URL } from '../constants';
import { ICommentProp } from '../type/review';

/**
 * 获取评论/回复列表
 * @param replyId 回复的主键 | 顶层评论使用-1进行区分 
 */
export const getReviewList = async (replyId = -1): Promise<ICommentProp | undefined> => {
  try {
    const data: ICommentProp = await axios.get(`${BASE_URL}/review/select`, {
      params: {
        replyId
      }
    });
    return data;
  } catch(e) {
    console.log('e', e);
  }
}

export const addReview = async (review: ICommentProp): Promise<string | undefined> => {
  const { avatarUrl, username, msg, replyId, replyNum } = review;
  try{
    const data: string = await axios.post(`${BASE_URL}/review/insert`, {
      avatarUrl,
      username,
      msg,
      replyId,
      replyNum,
    });
    return data;
  } catch(e) {
    console.log(e);
  }
}

export const deleteReview = async (reviewId: number): Promise<string | undefined> => {
  try{
    const data: string = await axios.post(`${BASE_URL}/review/delete`, {
      reviewId
    });
    return data;
  } catch(e) {
    console.log(e);
  }
}
