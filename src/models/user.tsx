interface Effects {
  payload: any;
  callback: Function;
  call: Function;
  put: Function;
}

export default {
  namespace: 'user',

  state: {
    token: null,
    userInfo: {},
  },

  effects: {
    async setUserInfo({ payload, callback }: Effects, { put, call }: Effects) {
      await put({
        type: 'setUserInfo',
        payload,
      });
    },
    async setToken({ payload, callback }: Effects, { put, call }: Effects) {
      await put({
        type: 'setToken',
        payload,
      });
    },
  },

  reducers: {
    setToken(
      state = Object,
      { type, payload }: { type: string; payload: string },
    ) {
      let _state: any = { ...state };
      _state['token'] = payload;
      return _state;
    },
    setUserInfo(
      state = Object,
      { type, payload }: { type: string; payload: string },
    ) {
      let _state: any = { ...state };
      _state['userInfo'] = payload;
      return _state;
    },
  },
};
