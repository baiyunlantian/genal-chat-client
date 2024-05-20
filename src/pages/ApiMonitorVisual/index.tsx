import { Row } from 'antd';
import VPS from './VPS';
import Full from './Full';
import './index.less';
import Monitor from './MonitorCopy';
import Bottom from './Bottom';
import React, { useEffect } from 'react';
import { connect } from 'umi';

const APIMonitor = (props) => {
  const { app, dispatch } = props;
  const isFull = app.isFull;

  useEffect(() => {
    if (document.body.clientHeight > 3000) {
      const element = document.getElementById('-p-tieTa');
      element?.requestFullscreen();
      dispatch({
        type: 'app/setFullScreen',
        payload: {
          key: 'isFull',
          value: true,
        },
      });
    }
  }, []);

  return (
    <div className={isFull ? '-p-ApiMonitor full' : '-p-ApiMonitor'}>
      <>
        <div className="header">
          <span className="title">产业虚拟电厂接口服务检测可视化</span>
        </div>
        {/* 全屏 */}
        {/*<Full />*/}
        <Row>
          <div className="top">
            <div className="left">
              <Monitor />
            </div>
            <div className="content">
              <VPS />
            </div>
            <div className="right">
              <Monitor />
            </div>
          </div>

          <Bottom />
        </Row>
      </>
    </div>
  );
};

export default connect(({ app }) => ({ app }))(APIMonitor);
