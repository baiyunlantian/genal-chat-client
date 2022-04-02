import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Popconfirm } from 'antd';
import styles from './index.less';
import { connect } from 'umi';

const Header = (props:any) => {
  const {app, dispatch} = props
  const { leftNavVisible, chatListVisible } = app

  const handleToggleLeftNav = (key:string, value:boolean):void => {
    dispatch({
      type:'app/changeBoolean',
      payload:{
        key,
        value: key === 'chatListVisible' ? !chatListVisible : value
      }
    })
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftIcons}>
        {
          leftNavVisible
            ? <MenuFoldOutlined className='commonIcon' onClick={()=>handleToggleLeftNav('leftNavVisible', false)}/>
            : <MenuUnfoldOutlined className='commonIcon' onClick={()=>handleToggleLeftNav('leftNavVisible', true)}/>
        }
        <MessageOutlined className='commonIcon' onClick={()=>handleToggleLeftNav('chatListVisible', false)}/>
      </div>

      <div className={styles.title}>阿童木聊天室</div>
      <div className={styles.leftIcon}>
        <Popconfirm title="确定要退出该群聊吗" okText="确定" cancelText="取消">
          <TeamOutlined className='commonIcon'/>
        </Popconfirm>
      </div>
    </div>
  );
}

export default connect(({app}:{app:object})=>({app}))(Header)
