export default [
  {
    title: '虚拟电厂运行管控平台',
    component: '@/layouts/index',
    path: '/',
    routes: [
      {
        title: '接口检测可视化',
        path: '/Cq/Cockpit/ApiMonitor',
        iconfont: 'icon-dapingkanban',
        component: `@/pages/ApiMonitorVisual/index`,
      },
      {
        title: '接口检测可视化列表',
        path: '/Cq/Cockpit/ApiMonitor/list',
        iconfont: 'icon-dapingkanban',
        component: `@/pages/ApiMonitorVisual/List`,
      },
    ],
  },
];
