/** 首页用户信息模块 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import Tag from './tag';
import { IUserInfoState } from 'src/type/homepage';
import { rem, editorClassName, em, PageRange } from 'src/common';
import { getStyle } from 'src/store/setting';
import { HOMEPAGE_LAYOUT_CHANGE, GET_STYLE_INFO, UPDATE_STYLE_INFO  } from 'src/constants';
import Draggable from 'react-draggable';
import styles from './style.module.css';

const UserInfo = (props: any) => {
  const { index } = props;
  let ref: any = useRef();
  const initState: IUserInfoState = {
    username: '洋洋的小娇妻',
    usernameFontSize: 32,
    usernameColor: '#7D7D7D',
    avatarUrl: '',
    avatarSize: 56,
    arrowColor: '#6C6C6C',
  }
  // 初始化key值
  const pageKey = 'homepage';
  const componentKey = 'userInfo';
  const tags = ['高贵的至尊vip','lv6'];
  const [state, setState] = useState(initState);
  const { 
    username,
    usernameFontSize,
    usernameColor, 
    avatarUrl,
    avatarSize, 
    arrowColor,
   } = state;

  /**
   * 处理拖拽事件
   * @param e 
   */
   const onDragStop = (e: any) => {
    const { index } = props;
    const posY = e.pageY;
    const range = PageRange['homepage']
    let newIndex = index;
    for(let i = 0;i < range.length; i++) {
      if (range[i].top <= posY && posY <= range[i].bottom) {
        newIndex = i;
        break;
      }
    }
    em.emit(HOMEPAGE_LAYOUT_CHANGE, { preIndex: index, newIndex });
  }   

  const initEditorInfo = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    em.emit(GET_STYLE_INFO, {
      pageKey,
      componentKey,
      username: '洋洋的小娇妻',
      usernameFontSize: 32,
      usernameColor: '#7D7D7D',
      avatarUrl: '',
      avatarSize: 56,
      arrowColor: '#6C6C6C',
    })
  }

   useEffect(() => {
    // 获取样式信息
    getStyle(pageKey, componentKey)
      .then((res: any) => {
        setState(res);
      });
    // 更新样式信息
    em.on(UPDATE_STYLE_INFO, (data: any) => {
      if(data.pageKey === pageKey && data.componentKey === componentKey) {
        getStyle(pageKey, componentKey)
        .then((res: any) => {
          setState(res);
        });
      }
    })   
    // 获取组件在页面的位置
     PageRange['homepage'][index].top = ref.offsetTop;
     PageRange['homepage'][index].bottom = ref.offsetTop + ref.offsetHeight;
   },[])
  
  return (
    <Draggable onStop={onDragStop}>
      <div 
        className={[styles.container, editorClassName()].join(' ')} 
        ref={e => { ref = e }}
        onContextMenu={initEditorInfo}
      >
        <Avatar size={avatarSize} icon={<UserOutlined />} className={styles.avatar}/>
        <div className={styles.content}>
          <p className={styles.text} style={{ fontSize: rem(usernameFontSize), color: usernameColor }}>
            {username}
          </p>
          {tags && tags.map((item, index) => 
            <Tag key={item + index} >{item}</Tag>
          )}
        </div>
        <RightOutlined style={{color: arrowColor }}/>
      </div>
    </Draggable>
  )
}

export default memo(UserInfo);
