/** 单个频道组件 */
import React, { memo, useState } from 'react';
import { IChannelProp, IChannelState } from 'src/type/homepage';
import { rem } from 'src/common';
import styles from './style.module.css';

const Channel = (props: IChannelProp) => {
  const { imgSource, text } = props;
  const initState: IChannelState = {
    imgSize: 72,
    textFontSize: 16,
    textColor: '#565759'
  }

  const [state, setState] = useState(initState);
  const { imgSize, textFontSize, textColor } = state;
  return (
    <div className={styles.container}>
      <img src={imgSource} style={{width: rem(imgSize)}}/>
      <p className={styles.text} style={{ fontSize: rem(textFontSize), color: textColor }}>
        {text}
      </p>
    </div>
  )
}

export default memo(Channel);
