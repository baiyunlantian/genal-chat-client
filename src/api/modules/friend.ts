import request from '@/utils/request';

// 好友消息
export function getFriendMessage(params: object): Promise<object> {
  return request(`/friend/friendMessage`, {
    method: 'GET',
    params,
  });
}
