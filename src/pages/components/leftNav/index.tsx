import React, { useState, useEffect } from 'react';
import { connect } from 'umi'
import { Avatar } from 'antd';
import { BulbOutlined, PoweroffOutlined, SkinOutlined } from '@ant-design/icons';
import UserInfoModal from '@/pages/components/userInfoModal';
import styles from './index.less'

const LeftNav = (props:any) => {
  const {app, dispatch} = props
  const leftNavVisible = app.leftNavVisible

  const handleClickAvatar = () => {
    dispatch({
      type:'app/changeBoolean',
      payload:{
        key:'userInfoModalVisible',
        value:true
      },
    })
  };

  return(
    <div className={`${styles.leftMenu} ${leftNavVisible ? styles.fadeOut : styles.fadeIn}`}>
      <div className={styles.userInfo} onClick={handleClickAvatar}>
        <Avatar size={45} className={styles.userImg} src={require('@/assets/avatar(1).png')}/>
        <div className={styles.userName}>yzh</div>
      </div>
      <div className={styles.toolBtns}>
        <BulbOutlined className='commonIcon'/>
        <SkinOutlined className='commonIcon' />
        <PoweroffOutlined className='commonIcon' />
      </div>

      <UserInfoModal />
    </div>
  )
}

export default connect(({app}:{app:object})=>({app}))(LeftNav)
