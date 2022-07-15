import request from '@/utils/request';
import { AUTH, USER } from '@/api/constants';

export function login(data: object): Promise<object> {
  return request(`${AUTH}/login`, {
    method: 'POST',
    data,
  });
}

export function register(data: object): Promise<object> {
  return request(`${AUTH}/register`, {
    method: 'POST',
    data,
  });
}

export function logout(): Promise<object> {
  return request('/user/logout', {
    method: 'GET',
  });
}

export function updatePassword(data): Promise<object> {
  return request('/user/updatePassword', {
    method: 'POST',
    data,
  });
}

export function getUsersByUserName(data): Promise<object> {
  return request(`${USER}/findListByUsername`, {
    method: 'POST',
    data,
  });
}

export function uploadAvatar(data: FormData): Promise<object> {
  return request(`${USER}/uploadAvatar`, {
    method: 'POST',
    requestType: 'form',
    data,
  });
}

export function deleteUserById(userId: string): Promise<object> {
  return request(`/user/delete?id=${userId}`, {
    method: 'DELETE',
  });
}
