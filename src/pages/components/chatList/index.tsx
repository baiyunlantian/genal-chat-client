import React, { useEffect, useState } from 'react';
import { Drawer, Input, Menu, Dropdown, Avatar, Badge } from 'antd';
import { connect } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
import SearchChatModal from '@/pages/components/searchChatModal';
import Friend from '@/assets/friend.png';
import Group from '@/assets/group.png';
import styles from './index.less';
import { BASE_URL } from '@/utils/config';

const MenuItems = [
  { key: '0', label: '创建群' },
  { key: '1', label: '搜索群' },
  { key: '2', label: '搜索用户' },
];

const ChatList = (props: any) => {
  const [
    { searchChatName, title, searchIconIsActive, showSearchChatModal },
    setState,
  ] = useState({
    searchChatName: '',
    title: '',
    searchIconIsActive: false,
    showSearchChatModal: false,
  });

  const { app, user, chat, dispatch } = props;
  const chatListVisible = app.chatListVisible;
  const { userInfo } = user;
  const { socket, chatList, currentChat, lastFriendMessage, lastGroupMessage } =
    chat;
  console.log('chatList', chatList);
  // useEffect(()=>{
  //   console.log('lastFriendMessage', lastFriendMessage);
  //   if (lastFriendMessage.userId) {
  //     dispatch({
  //       type:'chat/pushMessages',
  //       payload:lastFriendMessage
  //     })
  //   }
  // },[chat])

  const handleClickAvatar = () => {
    dispatch({
      type: 'app/changeBoolean',
      payload: {
        key: 'chatListVisible',
        value: false,
      },
    });
  };

  const handleClickMenuItem = ({ key }: { key: string }) => {
    setState((state) => ({ ...state, title: key, searchIconIsActive: false }));
    handleVisibleModal(true);
  };

  const handleVisibleModal = (visible: boolean) => {
    setState((state) => ({ ...state, showSearchChatModal: visible }));
  };

  const handleToggleChat = (chatInfo: any) => {
    socket.emit('joinFriendSocket', {
      userId: userInfo.userId,
      friendId: chatInfo.id,
    });

    dispatch({
      type: 'chat/setCurrentChat',
      payload: chatInfo,
    });
  };

  const MENU = (
    <Menu selectable onClick={handleClickMenuItem}>
      {MenuItems.map((item) => {
        return <Menu.Item key={item.label}>{item.label}</Menu.Item>;
      })}
    </Menu>
  );

  const SearchChatModalProps = {
    title,
    visible: showSearchChatModal,
    handleVisibleModal,
    userInfo,
    socket,
  };

  return (
    <Drawer
      className={styles.chatListContainer}
      closable={false}
      placement={'left'}
      visible={chatListVisible}
      onClose={handleClickAvatar}
    >
      <div className={'search-input-container'}>
        <Input
          placeholder="搜索聊天组"
          value={searchChatName}
          onChange={(e) =>
            setState((state) => ({ ...state, searchChatName: e.target.value }))
          }
        />
        <Dropdown
          overlay={MENU}
          onVisibleChange={(visible) =>
            setState((state) => ({ ...state, searchIconIsActive: visible }))
          }
        >
          <PlusCircleOutlined
            className={`${searchIconIsActive ? 'isActive' : ''} commonIcon`}
          />
        </Dropdown>
      </div>

      <div className="chart-list">
        {chatList.map((item) => {
          let imgUrl = item.chatType === 'friend' ? Friend : Group;
          if (item.avatar) {
            imgUrl = `${BASE_URL}${item.avatar}`;
          }

          return (
            <Badge
              count={item.unread}
              className={`${
                currentChat.id === item.id ? 'bgcDynamic' : 'bgcNone'
              } chart-item`}
              key={item.id}
            >
              <Avatar src={imgUrl} alt="*" className="chart-avatar" size={45} />
              <div
                className={`item-content`}
                onClick={() => handleToggleChat(item)}
              >
                <div>{item.name}</div>
                <div>{item.lastMsg}</div>
              </div>
            </Badge>
          );
        })}
      </div>

      <SearchChatModal {...SearchChatModalProps} />
    </Drawer>
  );
};

export default connect(({ app, user, chat }) => ({ app, user, chat }))(
  ChatList,
);
