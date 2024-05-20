import React, { useEffect } from 'react';
import { connect } from 'umi';
import { BASE_URL } from '@/utils/config';
import { message } from 'antd';
import Header from '@/pages/components/header';
import ChatArea from '@/pages/components/chatArea';
import LoginModal from '@/pages/components/loginModal';
import styles from './index.less';
import socketIo from 'socket.io-client';
import { getUserListByGroupId } from '@/api';

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
      console.log('chatData', res.data);
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
          type: 'chat/setUserList',
          payload: res.data.userData,
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

    // 删除好友
    socket.on('exitFriend', (res: any) => {
      console.log('exitFriend', res);
      if (res.code === 0) {
        dispatch({
          type: 'chat/removeChatList',
          payload: { ...res.data, chatType: 'friend' },
        });
        dispatch({
          type: 'chat/setCurrentChat',
          payload: { messages: [] },
        });
        message.success(res.msg);
      } else {
        message.warning(res.msg);
      }
    });

    // 添加群聊
    socket.on('addGroup', (res: any) => {
      console.log('addGroup', res);
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

    // 删除群聊
    socket.on('exitGroup', (res: any) => {
      console.log('exitGroup', res);
      if (res.code === 0) {
        dispatch({
          type: 'chat/removeChatList',
          payload: { ...res.data, chatType: 'group' },
        });
        dispatch({
          type: 'chat/setCurrentChat',
          payload: { messages: [] },
        });
        message.success(res.msg);
      } else {
        message.warning(res.msg);
      }
    });

    // 进入群聊组
    socket.on('joinGroup', (res: any) => {
      console.log('joinGroup', res);
      const { group, user } = res.data;
      if (res.code === 0) {
        // 当前用户界面显示提示信息
        if (userInfo.userId === user.userId) {
          dispatch({
            type: 'chat/unshiftChatList',
            payload: {
              ...group,
              chatType: 'group',
              id: group.groupId,
              name: group.groupName,
            },
          });

          message.success('加入群聊成功！');
        } else {
          // 其他用户界面，群聊记录显示某某加入群聊
          dispatch({
            type: 'chat/acceptNewMessage',
            payload: {
              groupId: group.groupId,
              chatType: 'joinGroup',
              username: user.username,
            },
          });
        }
      } else {
        userInfo.userId === user.userId && message.warning(res.msg);
      }
    });

    // （聊天框）监听 接收/发送 群聊组消息
    socket.on('groupMessage', (res: any) => {
      if (res.code === 0) {
        dispatch({
          type: 'chat/setChatItemLastMsg',
          payload: res.data,
        });
        dispatch({
          type: 'chat/acceptNewMessage',
          payload: { ...res.data, chatType: 'group' },
        });
      }
    });

    // （聊天框）监听 接收/发送 好友消息
    socket.on('friendMessage', (res: any) => {
      console.log('friendMessage', res);
      if (res.code === 0) {
        dispatch({
          type: 'chat/setChatItemLastMsg',
          payload: res.data,
        });
        dispatch({
          type: 'chat/acceptNewMessage',
          payload: { ...res.data, chatType: 'friend' },
        });
      }
    });

    // 进入群聊聊天
    socket.on('joinGroupSocket', (res: any) => {
      const { user, group } = res.data;
      if (res.code === 0) {
        getUserListByGroupId({ groupId: group.groupId }).then((resp) => {
          dispatch({
            type: 'chat/setUserList',
            payload: resp.data || [],
          });
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
