import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import InterfaceMonitorTable from '../components/Table/index';
import moment from 'moment';
import BottomBgImg from '@/assets/ApiMonitorVisual/Bottom/bottom_bg.png';

const Bottom = () => {
  const data = new Array(4).fill(0).map((item) => {
    return {
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      direction: Math.random() > 0.5 ? '南向接口' : '北向接口',
      name: 'pcpasf',
      system: 'pcpasf',
      status: Math.random() > 0.5 ? '0' : '1',
      timeConsuming: Math.random().toFixed(2),
      response: Math.random() > 0.5 ? '0' : '1',
    };
  });

  return (
    <div className="bottom">
      <div className="left">南北双向接口调用监测</div>
      <div className="right">
        <InterfaceMonitorTable dataSource={data} />
      </div>
    </div>
  );
};

export default Bottom;
