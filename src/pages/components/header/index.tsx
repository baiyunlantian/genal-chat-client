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

const Header = (props: any) => {
  const { app, chat, user, dispatch } = props;
  const { leftNavVisible, chatListVisible } = app;
  const { userInfo } = user;
  const { currentChat, socket } = chat;
  const { chatType } = currentChat;

  const handleToggleLeftNav = (key: string, value: boolean): void => {
    dispatch({
      type: 'app/changeBoolean',
      payload: {
        key,
        value: key === 'chatListVisible' ? !chatListVisible : value,
      },
    });
  };

  const handleConfirm = () => {
    let data: any = {
      userId: userInfo.userId,
    };

    if (chatType === 'friend') {
      data['friendId'] = currentChat.id;
      socket.emit('exitFriend', data);
    } else {
      data['groupId'] = currentChat.id;
      socket.emit('exitGroup', data);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftIcons}>
        {leftNavVisible ? (
          <MenuFoldOutlined
            className="commonIcon"
            onClick={() => handleToggleLeftNav('leftNavVisible', false)}
          />
        ) : (
          <MenuUnfoldOutlined
            className="commonIcon"
            onClick={() => handleToggleLeftNav('leftNavVisible', true)}
          />
        )}
        <MessageOutlined
          className="commonIcon"
          onClick={() => handleToggleLeftNav('chatListVisible', false)}
        />
      </div>

      <div className={styles.title}>{currentChat.name || ''}</div>
      <div className={styles.leftIcon}>
        <Popconfirm
          title={`确定要${
            chatType === 'friend' ? '删除该好友' : '退出该群聊'
          }吗`}
          okText="确定"
          cancelText="取消"
          onConfirm={handleConfirm}
          disabled={!chatType}
        >
          <TeamOutlined className="commonIcon" />
        </Popconfirm>
      </div>
    </div>
  );
};

export default connect(({ app, chat, user }) => ({ app, chat, user }))(Header);
