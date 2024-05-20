import { defineConfig } from 'umi';
import { BASE_URL } from '@/utils/config';
import Routes from '@/routes/index';

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
  routes: [
    {
      title: '接口检测可视化列表',
      path: '/list',
      component: `@/pages/ApiMonitorVisual/List`,
    },
    {
      title: '接口检测可视化',
      path: '/*',
      component: `@/pages/ApiMonitorVisual/index`,
    },
  ],
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
