import React, { useEffect } from 'react';
import { connect } from 'umi';
import Header from '@/pages/components/header';
import ChatArea from '@/pages/components/chatArea';
import LoginModal from '@/pages/components/loginModal';
import styles from './index.less';
import socketIo from 'socket.io-client';
import { BASE_URL } from '@/utils/config';
import { message } from 'antd';

const Main = (props: any) => {
  const { dispatch, user, chat } = props;
  const { userInfo } = user;
  useEffect(() => {
    if (userInfo && userInfo.userId) {
      connectionSocket(userInfo.userId);
    }
  }, [userInfo]);

  const connectionSocket = (userId: string) => {
    let socket: any = socketIo.connect(`${BASE_URL}/?userId=${userId}`, {
      reconnection: true,
    });
    dispatch({
      type: 'chat/setSocket',
      payload: socket,
    });

    socket.on('connect', async () => {
      console.log('连接成功');

      // 获取聊天室所需所有信息
      socket.emit('chatData', userId);
    });

    // 获取聊天室所需所有信息
    socket.on('chatData', (res: any) => {
      if (res.code === 0) {
        let chatList: any = [];
        res.data.friendData.forEach((item) => {
          chatList.push({
            ...item,
            chatType: 'friend',
            id: item.userId,
            name: item.username,
          });
        });

        res.data.groupData.forEach((item) => {
          chatList.push({
            ...item,
            chatType: 'group',
            id: item.groupId,
            name: item.groupName,
          });
        });

        dispatch({
          type: 'chat/setChatList',
          payload: chatList,
        });
      }
    });

    // 添加好友
    socket.on('addFriend', (res: any) => {
      if (res.code === 0) {
        dispatch({
          type: 'chat/unshiftChatList',
          payload: {
            ...res.data,
            chatType: 'friend',
            id: res.data.userId,
            name: res.data.username,
          },
        });
        message.success(res.msg);
      } else {
        message.warning(res.msg);
      }
    });

    // 添加群聊
    socket.on('addGroup', (res: any) => {
      if (res.code === 0) {
        dispatch({
          type: 'chat/unshiftChatList',
          payload: {
            ...res.data,
            chatType: 'group',
            id: res.data.groupId,
            name: res.data.groupName,
          },
        });
        message.success(res.msg);
      } else {
        message.warning(res.msg);
      }
    });

    // 进入群聊组
    socket.on('joinGroup', (res: any) => {
      console.log('joinGroup', res);
    });

    // 接受好友发送消息
    socket.on('friendMessage', (res: any) => {
      if (res.code === 0) {
        dispatch({
          type: 'chat/acceptNewMessage',
          payload: { ...res.data, chatType: 'friend' },
        });
      }
    });

    // 进入好友聊天
    socket.on('joinFriendSocket', (res: any) => {
      console.log('joinFriendSocket', res);
    });
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <ChatArea />
      <LoginModal />
    </div>
  );
};

export default connect(({ user, chat }: any) => ({ user, chat }))(Main);
