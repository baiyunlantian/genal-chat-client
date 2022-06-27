import React, { useEffect } from 'react';
import { connect } from 'umi';
import Header from '@/pages/components/header';
import ChatArea from '@/pages/components/chatArea';
import LoginModal from '@/pages/components/loginModal';
import styles from './index.less';

const Main = (props: any) => {
  const { dispatch, user } = props;
  useEffect(() => {
    if (Object.keys(user.userInfo).length === 0) {
      const userInfo = sessionStorage.getItem('userInfo');
      dispatch({
        type: 'user/setUserInfo',
        payload: userInfo ? JSON.parse(userInfo) : {},
      });
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <ChatArea />
      <LoginModal />
    </div>
  );
};

export default connect(({ user }: any) => ({ user }))(Main);
