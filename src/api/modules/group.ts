import request from '@/utils/request';
import { GROUP } from '@/api/constants';

export function getGroupsByName(data): Promise<object> {
  return request(`${GROUP}/findListByName`, {
    method: 'POST',
    data,
  });
}

// 群聊消息
export function getGroupsMessage(params: object): Promise<object> {
  return request(`${GROUP}/groupMessage`, {
    method: 'GET',
    params,
  });
}
