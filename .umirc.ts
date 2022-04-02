import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 提升编译速度
  mfsu:{},
  // 开启ant-design-pro布局
  // layout: {},
  devtool: false,
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
