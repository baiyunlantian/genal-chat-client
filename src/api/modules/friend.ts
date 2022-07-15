import request from '@/utils/request';
import { FRIEND } from '@/api/constants';

// 好友消息
export function getFriendMessage(params: object): Promise<object> {
  return request(`${FRIEND}/friendMessage`, {
    method: 'GET',
    params,
  });
}

// 添加好友
export function addFriend(data): Promise<object> {
  return request(`${FRIEND}/addFriend`, {
    method: 'POST',
    data,
  });
}
