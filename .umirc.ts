import { defineConfig } from 'umi';
import { BASE_URL } from '@/utils/config';
import Routes from './src/routes/index';

export default defineConfig({
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  // 提升编译速度
  mfsu: {},
  // 开启ant-design-pro布局
  // layout: {},
  devtool: false,
  routes: Routes,
  fastRefresh: {},
  proxy: {
    '/vpp': {
      target: 'http://10.8.0.129:8080',
      changeOrigin: true,
      pathRewrite: { '^/vpp': '/vpp' },
    },
    '/socket': {
      target: 'http://localhost:3025',
      ws: true,
      changeOrigin: true,
      pathRewrite: { '^/socket': '' },
    },
  },
});
