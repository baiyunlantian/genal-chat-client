import { defineConfig } from 'umi';

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
      target: 'http://192.168.3.84:3025',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
