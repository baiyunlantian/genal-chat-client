import request from '@/utils/request';

export function getGroupsByName(groupName: string): Promise<object> {
  return request(`/group/findByName?groupName=${groupName}`, {
    method: 'GET',
  });
}

// 群聊消息
export function getGroupsMessage(params: object): Promise<object> {
  return request(`/group/groupMessage`, {
    method: 'GET',
    params,
  });
}
