import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Avatar, Popconfirm } from 'antd';
import {
  BulbOutlined,
  PoweroffOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import UserInfoModal from '@/pages/components/userInfoModal';
import styles from './index.less';
import { BASE_URL } from '@/utils/config';

const LeftNav = (props: any) => {
  const { app, user, dispatch } = props;
  const { avatar = '', username } = user.userInfo;
  const leftNavVisible = app.leftNavVisible;

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

    if (userInfo && userInfo.userId) {
      dispatch({
        type: 'user/setUserInfo',
        payload: userInfo,
      });
    }
  }, []);

  const handleClickAvatar = () => {
    dispatch({
      type: 'app/changeBoolean',
      payload: {
        key: 'userInfoModalVisible',
        value: true,
      },
    });
  };

  const handleLogout = () => {
    dispatch({
      type: 'user/setToken',
      payload: null,
    });
    dispatch({
      type: 'user/setUserInfo',
      payload: {},
    });
    sessionStorage.clear();
  };

  return (
    <div
      className={`${styles.leftMenu} ${
        leftNavVisible ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <div className={styles.userInfo} onClick={handleClickAvatar}>
        <Avatar
          size={45}
          className={styles.userImg}
          src={`${BASE_URL}${avatar}`}
        />
        <div className={styles.userName}>{username}</div>
      </div>
      <div className={styles.toolBtns}>
        <BulbOutlined className="commonIcon" />
        <SkinOutlined className="commonIcon" />
        <Popconfirm
          title="是否确定退出登录?"
          onConfirm={handleLogout}
          okText="Yes"
          cancelText="No"
        >
          <PoweroffOutlined className="commonIcon" />
        </Popconfirm>
      </div>

      <UserInfoModal />
    </div>
  );
};

export default connect(({ app, user }: any) => ({ app, user }))(LeftNav);
