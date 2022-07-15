import { defineConfig } from 'umi';
import { BASE_URL } from '@/utils/config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 提升编译速度
  mfsu: {},
  // 开启ant-design-pro布局
  // layout: {},
  devtool: false,
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3025',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/socket': {
      target: 'http://localhost:3025',
      ws: true,
      changeOrigin: true,
      pathRewrite: { '^/socket': '' },
    },
  },
});
