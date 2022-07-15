import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Avatar, Input, Button } from 'antd';
import Friend from '@/assets/friend.png';
import { BASE_URL } from '@/utils/config';
import moment from 'moment';
import styles from './index.less';

const ChatArea = (props: any) => {
  const { dispatch, user, chat } = props;
  const { socket, currentChat } = chat;
  const { avatar, id: chatId, messages, chatType } = currentChat;
  const { userInfo } = user;
  const [message, setMessage] = useState<string>('');
  let chatMsgListRef: any = React.createRef();

  // useEffect(() => {
  //   console.log('useEffect messages', messages);
  //   console.log('chatMsgListRef', chatMsgListRef);
  //   if (chatMsgListRef && chatMsgListRef.current && messages.length > 0) {
  //     // chatMsgListRef.current.scrollIntoView({ behavior: 'smooth' });
  //     chatMsgListRef.current.scrollTop = chatMsgListRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const handleSendMsg = () => {
    let data: any = {
      userId: userInfo.userId,
      content: message,
      messageType: 'text',
    };

    if (chatType === 'friend') {
      data['friendId'] = chatId;
      socket.emit('friendMessage', data);
    } else {
      data['groupId'] = chatId;
      socket.emit('friendMessage', data);
    }
    setMessage('');
  };

  return (
    <div className={styles.chatMsgContainer}>
      <div ref={chatMsgListRef} className={styles.chatMsgList}>
        {(messages || []).map((item, index) => {
          let avatarUrl;
          // 判断消息是否是用户发送的
          if (item.userId === userInfo.userId) {
            avatarUrl = `${BASE_URL}${userInfo.avatar}`;
          } else {
            avatarUrl = avatar ? `${BASE_URL}${avatar}` : Friend;
          }

          return (
            <div
              className={`${
                item.userId === userInfo.userId ? styles.right : styles.left
              } ${styles.msgItem}`}
              key={index}
            >
              <div className={styles.userInfo}>
                <Avatar src={avatarUrl} alt="*" size={36} shape={'circle'} />
                <div>{moment(item.time).format('YYYY/MM/DD HH:mm:ss')}</div>
              </div>
              <div className={styles.msg}>{item.content}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.inputContainer}>
        <Input.Group compact className={styles.inputGroup}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.elInput}
            placeholder="输入内容..."
          />
          <Button
            className={styles.elButton}
            type="primary"
            onClick={handleSendMsg}
          >
            发送
          </Button>
        </Input.Group>
      </div>
    </div>
  );
};

export default connect(({ chat, user }: any) => ({ chat, user }))(ChatArea);
