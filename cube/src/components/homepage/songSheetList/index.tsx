/** 歌单集模块 */
import React, { memo, useState } from 'react';
import SongSheet from './songSheet';
import { ISongSheetListProp, ISongSheetListState } from 'src/type/homepage';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { rem, editorClassName } from 'src/common';
import styles from './style.module.css';

const SongSheetList = (props: ISongSheetListProp) => {
  const { keys, name, songSheet } = props;
  const initState: ISongSheetListState = {
    textFontSize: 16,
    textColor: '#3C3C3C',
    iconColor: '#3C3C3C',
  } 

  const [state, setState] = useState(initState)
  const songListNum = songSheet?.length || 0;
  const { textColor, textFontSize, iconColor } = state;

  return (
  <div className={[styles.container, editorClassName()].join(' ')}>
    <header key={keys} className={styles.header}>
      <span className={styles.text} style={{fontSize: rem(textFontSize), color: textColor}}>
        {`${name}(${songListNum}个)`}
      </span>
      <PlusOutlined style={{ color: iconColor }} className={styles.addIcon}/>
      <MoreOutlined style={{ color: iconColor }} className={styles.moreIcon}/>
    </header>
    <div className={styles.content}>
      {
        songSheet.map((item, index) => 
          <SongSheet 
            key={JSON.stringify(item)+index} 
            avatarUrl={item.avatarUrl} 
            text={item.text} 
            num={item.num}
          />
        )
      }
      
    </div>
  </div>
  )
}

export default memo(SongSheetList);
