import React, { useEffect, useMemo, useState } from 'react';
import './index.less';
import InterfaceMonitorTable from '../components/Table/index';
import { getInterfaceInfoListByPage } from '@/api';
import { Spin } from 'antd';
import { history } from 'umi';

const Bottom = () => {
  const [loading, setLoading] = useState(false);
  const [tableSource, setTableSource] = useState([]);

  useEffect(() => {
    let params = {
      pageNum: 1,
      pageSize: 4,
    };

    setLoading(true);
    getInterfaceInfoListByPage(params)
      .then((res) => {
        if (res.code === 0) {
          const { datas = [] } = res.data;
          setTableSource(datas);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleJumpToList = () => {
    history.push('/list');
  };

  return (
    <div className="bottom" onClick={handleJumpToList}>
      <div className="left">南北双向接口调用监测</div>
      <div className="right">
        <Spin spinning={loading}>
          <InterfaceMonitorTable dataSource={tableSource} />
        </Spin>
      </div>
    </div>
  );
};

export default Bottom;
