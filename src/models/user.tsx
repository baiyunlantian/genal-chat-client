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
  },

  effects: {
    async setUserToken({ payload, callback }: Effects, { put, call }: Effects) {
      console.log('effects', payload);
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
  },
};
