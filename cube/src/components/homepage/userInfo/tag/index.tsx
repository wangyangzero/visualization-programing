/** 用户标签 */
import React, { memo, useState, useEffect } from 'react';
import { Tag as ATag } from 'antd';
import { ITagProp, ITagState } from 'src/type/homepage';
import styles from './style.module.css';

const Tag = (props: ITagProp) => {
  const text = props?.children || '默认标签文案';
  const initState: ITagState = {
    height: 16,
    fontSize: 12,
    color: '#5B5C5E',
    fontColor: '#FFF', 
  }
  const [state, setState] = useState(initState);

  const { height, fontSize, color, fontColor } = state;

  return (
    <ATag color={color} style={{ height, fontSize }} className={styles.tag}>
      <span style={{ color: fontColor }}>{text}</span>
    </ATag>
  );
}

export default memo(Tag);
