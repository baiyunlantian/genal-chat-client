import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import './index.less';
import { getInterfaceDayCount } from '@/api';

const VPS = () => {
  /**
   * wlsb:物联设备
   * xndc:虚拟电厂运服平台
   * zhny:综合能源服务平台
   * clw:车联网平台
   * hwd:恒旺电管家
   * gzpt:国综平台
   * dsf:第三方市场化平台
   * */
  const data = ['wlsb', 'xndc', 'zhny', 'clw', 'hwd', 'gzpt', 'dsf'].map(
    (item) => {
      return {
        type: item,
        order: Math.ceil(Math.random() * 200),
        send: Math.ceil(Math.random() * 200),
      };
    },
  );

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({
    //恒旺电管家
    hengWang: {
      upCount: 0,
      downCount: 0,
    },
    //第三方市场化平台
    third: {
      upCount: 0,
      downCount: 0,
    },
    //物联网设备直连
    devices: {
      upCount: 0,
      downCount: 0,
    },
    //市级虚拟电厂运服平台
    north: {
      upCount: 0,
      downCount: 0,
    },
    //国综平台
    national: {
      upCount: 0,
      downCount: 0,
    },
    //综合能源服务平台
    energy: {
      upCount: 0,
      downCount: 0,
    },
    //车联网
    vehicle: {
      upCount: 0,
      downCount: 0,
    },
  });

  useEffect(() => {
    setLoading(true);
    getInterfaceDayCount()
      .then((res) => {
        if (res.code === 0) {
          setDataSource(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="VPS">
      <Spin spinning={loading}>
        <div className="VPS_content">
          {Object.keys(dataSource).map((key) => {
            return (
              <div className={`item ${key}`} key={key}>
                <div className="order">
                  <div>今日下达</div>
                  <div>{dataSource[key]['downCount'] || 0}次</div>
                </div>
                <div className="send">
                  <div>今日上送</div>
                  <div>{dataSource[key]['upCount'] || 0}次</div>
                </div>
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default VPS;
