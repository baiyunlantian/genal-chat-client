import { Row } from 'antd';
import VPS from './VPS';
import './index.less';
import Monitor from './MonitorCopy';
import Bottom from './Bottom';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { getInterfaceInfoCount } from '@/api';

const APIMonitor = () => {
  const [infoCount, setInfoCount] = useState({
    south: {
      interNum: 0,
      normalInterNum: 0,
      errorInterNum: 0,
      aveTime: 0,
      fastestTime: 0,
      slowestTime: 0,
      monthlyCount: 0,
      monthlySucceedCount: 0,
      monthlyErrorCount: 0,
    },
    north: {
      interNum: 0,
      normalInterNum: 0,
      errorInterNum: 0,
      aveTime: 0,
      fastestTime: 0,
      slowestTime: 0,
      monthlyCount: 0,
      monthlySucceedCount: 0,
      monthlyErrorCount: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInterfaceInfoCount()
      .then((res) => {
        if (res.code === 0) {
          setInfoCount(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="-p-ApiMonitor">
      <>
        <div className="header">
          <span className="title">产业虚拟电厂接口服务监测可视化</span>
        </div>
        {/* 全屏 */}
        {/*<Full />*/}
        <Row>
          <div className="top">
            <div className="left">
              <Monitor
                direction="北"
                loading={loading}
                infoCount={infoCount.north}
              />
            </div>
            <div className="content">
              <VPS />
            </div>
            <div className="right">
              <Monitor
                direction="南"
                loading={loading}
                infoCount={infoCount.south}
              />
            </div>
          </div>

          <Bottom />
        </Row>
      </>
    </div>
  );
};

export default APIMonitor;
