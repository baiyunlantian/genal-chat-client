import {
  extend,
  RequestInterceptor,
  ResponseError,
  ResponseInterceptor,
} from 'umi-request';
import { Message } from 'antd';
import { BASE_URL } from '@/utils/config';

const request = extend({
  timeout: 1000 * 60,
});

// 拦截请求
request.interceptors.request.use((url, options: any) => {
  return {
    url: process.env.NODE_ENV === 'development' ? url : BASE_URL + url,
    options: {
      ...options,
      interceptors: true,
    },
  };
});

// 拦截响应
request.interceptors.response.use(async (response, options) => {
  const { code, msg } = await response.clone().json();
  if (code !== 0) {
    Message.error({
      content: msg || '服务异常',
    });
  }
  return response;
});

export default request;
