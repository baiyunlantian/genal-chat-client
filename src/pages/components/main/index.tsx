import React from 'react';
import Header from '@/pages/components/header';
import ChatArea from '@/pages/components/chatArea';
import LoginModal from '@/pages/components/loginModal';
import styles from './index.less';

export default (props: any) => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <ChatArea />
      <LoginModal />
    </div>
  );
};
