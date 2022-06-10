import request from '@/utils/request';

export function login(params: object): Promise<object> {
  return request('/user/login/', {
    method: 'GET',
    params,
  });
}

export function logout(): Promise<object> {
  return request('/user/logout', {
    method: 'GET',
  });
}

export function updatePassword(data: object): Promise<object> {
  return request('/user/updatePassword', {
    method: 'POST',
    data,
  });
}

export function getUsersByUserName(name: string): Promise<object> {
  return request(`/user/findByName?userName=${name}`, {
    method: 'GET',
  });
}

export function uploadAvatar(data: FormData): Promise<object> {
  return request(`/user/upload`, {
    method: 'POST',
    data,
  });
}

export function deleteUserById(userId: string): Promise<object> {
  return request(`/user/delete?id=${userId}`, {
    method: 'DELETE',
  });
}
