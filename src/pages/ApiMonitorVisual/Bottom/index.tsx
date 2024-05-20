import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import InterfaceMonitorTable from '../components/Table/index';

const Bottom = () => {
  return (
    <div className="bottom">
      <div className="left">南北双向接口调用监测</div>
      <div className="right">
        <InterfaceMonitorTable />
      </div>
    </div>
  );
};

export default Bottom;
