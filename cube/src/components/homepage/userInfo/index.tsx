/** 首页用户信息模块 */
import React, { memo, useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import Tag from './tag';
import { IUserInfoState } from 'src/type/homepage';
import { rem } from 'src/common'
import styles from './style.module.css';

const UserInfo = () => {
  const initState: IUserInfoState = {
    username: '洋洋的小娇妻',
    usernameFontSize: 32,
    usernameColor: '#7D7D7D',
    avatarUrl: '',
    avatarSize: 56,
    arrowColor: '#6C6C6C',
    tags: ['高贵的至尊vip','lv6']
  }
  const [state, setState] = useState(initState)
  const { 
    username,
    usernameFontSize,
    usernameColor, 
    avatarUrl,
    avatarSize, 
    arrowColor,
    tags
   } = state;
  
  return (
    <div className={styles.container}>
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
  )
}

export default memo(UserInfo);
