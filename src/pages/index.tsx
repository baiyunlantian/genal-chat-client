import React, { useState } from 'react';
import LeftNav from '@/pages/components/leftNav';
import Main from '@/pages/components/main';
import ChatList from '@/pages/components/chatList';
import styles from './index.less';

export default () => {

  return (
    <div className={styles.container}>
      <LeftNav />
      <Main />
      <ChatList />
    </div>
  );
}




