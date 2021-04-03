import axios from 'axios';
import { BASE_URL } from '../constants';
import { ICommentProp } from '../type/review';

/**
 * 获取评论/回复列表
 * @param replyId 回复的主键 | 顶层评论使用-1进行区分 
 */
export const getReviewList = async (replyId = -1, songId: number): Promise<ICommentProp[] | []> => {
  try {
    const data: ICommentProp[] = (await axios.get(`${BASE_URL}/review/select`, {
      params: {
        replyId,
        songId,
      }
    })).data;
    return data;
  } catch(e) {
    console.log('e', e);
    return [];
  }
}

/**
 * 新增评论
 * @param review 评论
 * @returns 
 */
export const addReview = async (review: ICommentProp): Promise<string | undefined> => {
  const { avatarUrl, username, likes, msg, replyId, replyNum, songId } = review;
  try{
    const data: string = await axios.post(`${BASE_URL}/review/insert`, {
      avatarUrl,
      username,
      msg,
      likes,
      replyId,
      replyNum,
      songId
    });
    return data;
  } catch(e) {
    console.log(e);
  }
}

/**
 * 删除评论
 * @param reviewId 评论标识
 * @returns 
 */
export const deleteReview = async (reviewId: number | undefined): Promise<string | undefined> => {
  try{
    const data: string = await axios.post(`${BASE_URL}/review/delete`, {
      reviewId
    });
    return data;
  } catch(e) {
    console.log(e);
  }
}

export const updateReviewLikes = async (
  likes: number | undefined, reviewId: number | undefined): Promise<string | undefined> => {
    try{
      const data: string = await axios.post(`${BASE_URL}/review/update`, {
        likes,
        reviewId,
      });
      return data;
    } catch(e) {
      console.log(e);
    }
}
