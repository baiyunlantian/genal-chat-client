import moment from 'moment';

export default {
  namespace: 'app',

  state: {
    south: {
      interNum: 0,
      normalInterNum: 0,
      errorInterNum: 0,
      aveTime: 0,
      fastestTime: 0,
      slowestTime: 0,
      monthlyCount: 0,
      monthlySucceedCount: 0,
      monthlyErrorCount: 0,
    },
    north: {
      interNum: 0,
      normalInterNum: 0,
      errorInterNum: 0,
      aveTime: 0,
      fastestTime: 0,
      slowestTime: 0,
      monthlyCount: 0,
      monthlySucceedCount: 0,
      monthlyErrorCount: 0,
    },
    // 首页数据是否缓存
    isKeepAlive: false,
  },

  effects: {},

  reducers: {
    setSouth(state = Object, { type, payload }) {
      const { key, value } = payload;
      let _state: any = { ...state };
      _state[key] = value;
      return _state;
    },
    setNorth(state = Object, { type, payload }) {
      const { key, value } = payload;
      let _state: any = { ...state };
      _state[key] = value;
      return _state;
    },
    setIsKeepAlive(state = Object, { type, payload }) {
      const { key, value } = payload;
      let _state: any = { ...state };
      _state[key] = value;
      return _state;
    },
  },
};
