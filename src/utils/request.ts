import { extend } from 'umi-request';

const request = extend({
  timeout: 6000,
  prefix: '/api',
});

// 拦截请求
request.interceptors.request.use((url, options) => {
  console.log('url', url);
  console.log('options', options);

  return {
    url,
    options: { ...options, interceptors: true },
  };
});

// 拦截相应
request.interceptors.response.use((response, options) => {
  console.log('response', response);
  console.log('options', options);
  return response;
});

export default request;
