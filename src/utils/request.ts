import {
  extend,
  RequestInterceptor,
  ResponseError,
  ResponseInterceptor,
} from 'umi-request';
import { message } from 'antd';

const request = extend({
  timeout: 1000 * 60,
});

// 拦截请求
request.interceptors.request.use((url, options: any) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    token: sessionStorage.getItem('access_token'),
  };

  return {
    url,
    options: {
      ...options,
      ...headers,
      interceptors: true,
    },
  };
});

// 拦截响应
request.interceptors.response.use(async (response, options) => {
  const { code, msg } = await response.clone().json();
  if (code !== 200) {
    message.error(msg || '服务异常');
  }
  return response;
});

export default request;
