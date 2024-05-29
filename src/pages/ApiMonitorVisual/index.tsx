import { Row } from 'antd';
import VPS from './VPS';
import './index.less';
import Monitor from './MonitorCopy';
import Bottom from './Bottom';
import React, { useEffect, useState, useRef } from 'react';
import { getInterfaceInfoCount } from '@/api';
import { LOOP_TIME } from '@/utils/config';
import { KeepAlive, history, connect } from 'umi';

const APIMonitor = (props) => {
  const { app, dispatch } = props;

  const Monitor1Ref = useRef(null);
  const Monitor2Ref = useRef(null);
  const VPSRef = useRef(null);
  const BottomRef = useRef(null);

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
    if (app.isKeepAlive) {
      setInfoCount({ south: app.south, north: app.north });
    } else {
      handleGetInterfaceInfoCount();
    }

    // 重置isKeepAlive
    dispatch({
      type: 'app/setIsKeepAlive',
      payload: {
        key: 'isKeepAlive',
        value: false,
      },
    });

    let _timer = setInterval(() => {
      handleGetInterfaceInfoCount();
    }, LOOP_TIME);

    return () => {
      clearInterval(_timer);
    };
  }, []);

  const handleGetInterfaceInfoCount = () => {
    setLoading(true);
    getInterfaceInfoCount()
      .then((res) => {
        if (res.code === 0) {
          setInfoCount(res.data);

          dispatch({
            type: 'app/setSouth',
            payload: {
              key: 'south',
              value: res.data.south,
            },
          });

          dispatch({
            type: 'app/setNorth',
            payload: {
              key: 'north',
              value: res.data.north,
            },
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeepAlive>
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
    </KeepAlive>
  );
};

export default connect(({ app }: any) => ({ app }))(APIMonitor);
