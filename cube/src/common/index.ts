import React from 'react';
import EM from 'eventemitter3';
import styles from './index.module.css';
import A_LITTLE_STORY from 'src/assets/music/a_little_story.mp3';
import CANDY_WIND from 'src/assets/music/candy_wind.mp3';
import INTO_THE_FIRE from 'src/assets/music/into_the_fire.mp3';
import MELANCHOLY from 'src/assets/music/melancholy.mp3';
import MELODIES_OF_LIFE from 'src/assets/music/melodies_of_life.mp3';
import NEXT_TO_YOU from 'src/assets/music/next_to_you.mp3';
import NOTHING_TO_FEAR from 'src/assets/music/nothing_to_fear.mp3';
import NUIT_SILENCIEUSE from 'src/assets/music/nuit_silencieuse.mp3';
import ONLY_MY_RAILGUN from 'src/assets/music/only_my_railgun.mp3';
import PROMISE from 'src/assets/music/promise.mp3';
import RAINY_DUMPLINGS from 'src/assets/music/rainy_dumplings.mp3';
import THE_FAREWELL from 'src/assets/music/the_farewell.mp3';
import A_LITTLE_STORY_IMAGE from 'src/assets/img/a_little_story.jpg';
import CANDY_WIND_IMAGE from 'src/assets/img/candy_wind.jpg';
import INTO_THE_FIRE_IMAGE_IMAGE from 'src/assets/img/into_the_fire.jpg';
import MELANCHOLY_IMAGE from 'src/assets/img/melancholy.jpg';
import MELODIES_OF_LIFE_IMAGE from 'src/assets/img/melodies_of_life.jpg';
import NEXT_TO_YOU_IMAGE from 'src/assets/img/next_to_you.jpg';
import NOTHING_TO_FEAR_IMAGE from 'src/assets/img/nothing_to_fear.jpg';
import NUIT_SILENCIEUSE_IMAGE from 'src/assets/img/nuit_silencieuse.jpg';
import ONLY_MY_RAILGUN_IMAGE from 'src/assets/img/only_my_railgun.jpg';
import PROMISE_IMAGE from 'src/assets/img/promise.jpg';
import RAINY_DUMPLINGS_IMAGE from 'src/assets/img/rainy_dumplings.jpg';
import THE_FAREWELL_IMAGE from 'src/assets/img/the_farewell.jpg';

/**
 * 转换rem单位
 * 单位值
 */
export const rem = (num: number): string => `${num}rem`;

/**
 * 跳转到指定页面
 */
export const jump = (url: string): void => {
  location.pathname = url;
}

/**
 * 秒数转时分格式
 * @param value 秒数
 * @returns 
 */
export function formatSeconds(value: number): string {
  if(!value) return '';
  const m = Math.floor((value / 60 % 60)) < 10 ? '0' + Math.floor((value / 60 % 60)) : Math.floor((value / 60 % 60))
  const s = Math.floor((value % 60)) < 10 ? '0' + Math.floor((value % 60)) : Math.floor((value % 60))
  return `${m}:${s}`
}
/**
 * 时间戳转日历格式
 * @param timestamp 时间戳
 * @returns 
 */
export function timestampToTime(timestamp: string | undefined): string {
  if(!timestamp) return '';
  const date =new Date(Number(timestamp));
  const y = date.getFullYear();
  const m = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
  const d = date.getDate();
  
  return `${y}年${m}月${d}日`;
}

// 创建一个事件订阅器
export const em = new EM();

// 获取URL中的索引信息
export const getIndex = (): number => Number(location.pathname.split('=').pop());

// 是开发环境还是生产环境
export const isDev = (): boolean => {
  if (process.env.NODE_ENV === 'development') {
    // 注意：写入脚本时会在未必加入空格，需要清理
    return process.env.REACT_APP_ENV?.trim() === 'development';
  }
  return false;
}

// 编辑框border的样式，开发环境下展示，生产环境下不展示
export const editorClassName = (): string => {
  if(isDev()) return styles.border;
  return '';
}

/**
 * 更新组件的位置
 */
export const updateComponentPos = (prePosList: number[], preIndex: number, newIndex: number) => {
  const direct = preIndex - newIndex;
  let posList: number[] = prePosList.slice();
  posList = posList.map((item) => {
    // 向前移动
    if(direct > 0) {
      if (item === preIndex) {
        return newIndex;
      } else if (newIndex <= item && item < preIndex) {
        return item + 1;
      }
    }
    // 向后移动
    if(direct < 0) {
      if (item === preIndex) {
        return newIndex;
      } else if (preIndex < item && item <= newIndex) {
        return item - 1;
      }
    }
    return item;
  });
  return posList;
}

// 页面组件的top / bottom
// eslint-disable-next-line prefer-const
export let PageRange = {
  homepage: [
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
  ],
  musicInfo: [
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
  ],
  musicList: [
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
  ],
  review: [
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
    {top: 0, bottom: 0},
  ]
};

// 歌曲的本地数据
export const Songs = [
  {
    index: 0,
    name: 'a little story',
    singer: 'Valentin',
    source: A_LITTLE_STORY,
    image: A_LITTLE_STORY_IMAGE
  },
  {
    index: 1,
    name: '和煦的糖果风',
    singer: 'Candy_Wind',
    source: CANDY_WIND,
    image: CANDY_WIND_IMAGE
  },  {
    index: 2,
    name: 'into the fire',
    singer: 'Thirteen Senses',
    source: INTO_THE_FIRE,
    image: INTO_THE_FIRE_IMAGE_IMAGE
  },  {
    index: 3,
    name: 'melancholy',
    singer: 'White Cherry',
    source: MELANCHOLY,
    image: MELANCHOLY_IMAGE
  },
  {
    index: 4,
    name: 'melodies of life',
    singer: '白鸟英美子',
    source: MELODIES_OF_LIFE,
    image: MELODIES_OF_LIFE_IMAGE
  },
  {
    index: 5,
    name: 'next to you',
    singer: 'Ken arai',
    source: NEXT_TO_YOU,
    image: NEXT_TO_YOU_IMAGE
  },  {
    index: 6,
    name: 'nothing to fear',
    singer: 'Dexter Britain',
    source: NOTHING_TO_FEAR,
    image: NOTHING_TO_FEAR_IMAGE
  },  {
    index: 7,
    name: 'nuit silencieuse',
    singer: 'Days',
    source: NUIT_SILENCIEUSE,
    image: NUIT_SILENCIEUSE_IMAGE
  },  {
    index: 8,
    name: 'only my railgun',
    singer: 'Anison Piano',
    source: ONLY_MY_RAILGUN,
    image: ONLY_MY_RAILGUN_IMAGE
  },
  {
    index: 9,
    name: 'promise',
    singer: '山冈晃',
    source: PROMISE,
    image: PROMISE_IMAGE
  },  {
    index: 10,
    name: 'rainy dumplings',
    singer: '饭碗的彼岸',
    source: RAINY_DUMPLINGS,
    image: RAINY_DUMPLINGS_IMAGE
  },  {
    index: 11,
    name: 'the farewell',
    singer: 'Alexey Omelchuk',
    source: THE_FAREWELL,
    image:THE_FAREWELL_IMAGE
  },
]
