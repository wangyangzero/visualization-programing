import React, { memo } from 'react';
import { Select, Button, Progress  } from 'antd';
import { jump } from 'src/common';
import { ROUTE_PATHNAME } from 'src/constants';
import styles from './style.module.css';

const Option = Select.Option;

const Layout = () => {
  // 获取路由信息
  const pathname = location.pathname;

  const choosePage = (value: string) => {
    jump(ROUTE_PATHNAME[value]);
  }
  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        <p className={styles.title}>欢迎来到Cube页面设计平台~</p>
        <p className={styles.description}>
          &nbsp;&nbsp;&nbsp;Cube平台致力于让用户自主的修改页面的布局顺序和样式特征，无需编程即可设计出自己喜欢的音乐页面。
          设计平台分为三个区域，左侧为工具栏，有页面选择，页面打包，自动化部署三个功能；中间为页面内容展示区；
          右侧为样式编辑区，您可以自主的为页面中的每一个组件设计其样式。
          快来体验一下Cube设计的乐趣吧~
        </p>
        <p className={styles.watermark}>@design by lucifer</p>
      </div>
      <div className={styles.pageInfo}>
        <span className={styles.content}>请选择您要编辑的页面：&nbsp;&nbsp;&nbsp;</span>
        <Select defaultValue={ROUTE_PATHNAME[pathname]} style={{ width: 300 }} onChange={choosePage}>
          <Option value="homepage">首页</Option>
          <Option value="musicInfo">音乐播放页</Option>
          <Option value="musicList" >我喜欢的音乐列表</Option>
          <Option value="review">评论页</Option>
        </Select> 
      </div>
      <div className={styles.build}>
        <span className={styles.content}>自动化打包：&nbsp;&nbsp;&nbsp;</span>
        <Button type="primary">一键打包</Button>
        <div>
          <Progress 
            type="circle" 
            percent={30} 
            width={140} 
            format={(percent) => <span style={{ color:'#fff' }}>{percent}</span>}
            className={styles.progress}/>
        </div>
        <span className={styles.content}>自动化部署：&nbsp;&nbsp;&nbsp;</span>
        <Button type="primary">一键部署</Button>
        <div>
          <Progress 
            type="circle" 
            percent={30} 
            width={140} 
            format={(percent) => <span style={{ color:'#fff' }}>{percent}</span>}
            className={styles.progress}/>
        </div>
      </div>
    </div>
  );
}

export default memo(Layout);