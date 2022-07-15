import socketIo from 'socket.io-client';
import { BASE_URL } from '@/utils/config';
import { message } from 'antd';

export default {
  namespace: 'chat',

  state: {
    socket: null,
    currentChat: {
      messages: [],
    },
    chatList: [],
    lastFriendMessage: {},
    lastGroupMessage: {},
  },

  effects: {},

  reducers: {
    setSocket(state: any, { type, payload }: any) {
      let _state = { ...state };
      _state['socket'] = payload;
      return _state;
    },
    setChatList(state: any, { type, payload }: any) {
      let _state = { ...state };
      _state['chatList'] = payload;
      return _state;
    },
    unshiftChatList(state: any, { type, payload }: any) {
      let _state = { ...state };
      _state['chatList'].unshift(payload);
      return _state;
    },
    setCurrentChat(state: any, { type, payload }: any) {
      let _state = { ...state };
      _state['currentChat'] = payload;
      return _state;
    },
    acceptNewMessage(state: any, { type, payload }: any) {
      let _state = { ...state },
        index = 0,
        chatType = payload.chatType,
        currentChatId = state['currentChat']['id'];

      console.log('acceptNewMessage', payload);
      console.log('_state', _state);
      // item['id']--聊天好友的userId
      index = _state['chatList']
        .map((item) => item['id'])
        .indexOf(payload['friendId']);

      // 将接收到新消息的聊天项置顶
      let topChat = _state['chatList'].splice(index, 1);
      if (topChat && topChat.length > 0) {
        _state['chatList'].unshift(topChat[0]);
      }

      /**
       * payload.userId: 消息发送人的id
       * payload.friendId: 消息接收人的id
       * currentChatId: 当前聊天好友的Id
       *
       * 逻辑说明：
       * A、B互为好友，A给B发消息，A作为发送方，B作为接收方
       * 此时 payload.userId === A.UserId， payload.friendId === B.UserId
       * 在A方面，currentChatId === B.UserId
       * 在B方面，currentChatId === A.UserId
       * */
      if (
        currentChatId === payload['userId'] ||
        currentChatId === payload['friendId']
      ) {
        _state['currentChat']['messages'].push(payload);
      }

      return _state;
    },
  },
};
