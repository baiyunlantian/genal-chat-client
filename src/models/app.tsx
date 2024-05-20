interface Effects {
  payload: any;
  callback: Function;
  call: Function;
  put: Function;
}

interface InterFunction {
  [propName: string]: Function;
}

interface ChangeBoolean {
  key: string;
  value: boolean;
}

export default {
  namespace: 'app',

  state: {
    isFull: false,
    leftNavVisible: true,
    userInfoModalVisible: false,
    chatListVisible: false,
    loginModalVisible: false,
  },

  effects: {
    async setVisible({ payload, callback }: Effects, { put, call }: Effects) {
      await put({
        type: 'changeBoolean',
        payload,
      });
    },
  },

  reducers: {
    changeBoolean(
      state = Object,
      { type, payload }: { type: string; payload: ChangeBoolean },
    ) {
      const { key, value } = payload;
      let _state: any = { ...state };
      _state[key] = value;
      return _state;
    },
    setFullScreen(state = Object, { type, payload }) {
      const { key, value } = payload;
      let _state: any = { ...state };
      _state[key] = value;
      return _state;
    },
  },
};
