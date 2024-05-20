interface State {
  isFull: boolean;
  selectStationId: string;
}
const homeModel = {
  namespace: 'EMS能源管理平台',
  state: {
    isFull: false,
    selectStationId: 'all',
  },
};

export default homeModel;
