import request from '@/utils/request';
import { VPP } from '@/api/constants';

// 获取接口详细统计数据
export function getInterfaceInfoCount(): Promise<object> {
  return request(`${VPP}/getInterfaceInfoCount`, {
    method: 'POST',
  });
}

// 分页查询接口
export function getInterfaceInfoListByPage(data): Promise<object> {
  return request(`${VPP}/getInterfaceInfoListByPage`, {
    method: 'POST',
    data,
  });
}

// 获取月内每日交互调用情况
export function getInterfaceMonthCount(data): Promise<object> {
  return request(`${VPP}/getInterfaceMonthCount`, {
    method: 'POST',
    data,
  });
}

// 获取每日接口上送/下发统计记录
export function getInterfaceDayCount(data = {}): Promise<object> {
  return request(`${VPP}/getInterfaceDayCount`, {
    method: 'POST',
    data,
  });
}
