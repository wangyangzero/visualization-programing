import EM from 'eventemitter3';
/**
 * 转换rem单位
 * 单位值
 */
export const rem = (num: number): string => `${num}rem`;

/**
 * 跳转到指定页面
 */
export const jump = (url: string): void => {
  document.location.pathname = url;
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

export const em = new EM();