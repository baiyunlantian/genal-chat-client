import icon1Img from '@/assets/ApiMonitorVisual/Monitor/icon1.png';
import icon2Img from '@/assets/ApiMonitorVisual/Monitor/icon2.png';
import icon3Img from '@/assets/ApiMonitorVisual/Monitor/icon3.png';

import { Col, Row, DatePicker, InputNumber } from 'antd';
import { CalendarOutlined } from '@ant-design/icons/lib';
import React, { useEffect, useMemo, useState } from 'react';

import './index.less';
import { useMonitorService } from './service';
import BarEcharrts from './Echarts';
import GaugeContent from '../Gauge/index';
import { useSelector } from 'umi';
import moment from 'moment';

const Monitor = () => {
  const [monitorOptionsData, setMonitorOptionsData] = useState({
    apiTotal: 42,
    normal: 23,
    abnormal: 12,
    averageTime: 1.36,
    fastest: 0.33,
    slowest: 2.21,
    interactiveTotal: 3642,
    success: 2344,
    fail: 1232,
  });
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [successPresent, setSuccessPresent] = useState(0);

  useEffect(() => {
    const mock = Number((Math.random() * 100).toFixed(1));
    setSuccessPresent(mock);
  }, [month]);

  const monitorOptions = [
    {
      leftText: '北向接口总数量',
      unit: '个',
      leftProp: 'apiTotal',
      rtText: '正常',
      rtProp: 'normal',
      rtColor: '#00F5AD',
      rbText: '异常',
      rbProp: 'abnormal',
      rbColor: '#FA5353',
      iconUrl: icon1Img,
    },
    {
      leftText: '北向平均用时',
      unit: '秒',
      leftProp: 'averageTime',
      rtText: '最快',
      rtProp: 'fastest',
      rtColor: '#4DBAFF',
      rbText: '最慢',
      rbProp: 'slowest',
      rbColor: '#C57EF3',
      iconUrl: icon2Img,
    },
    {
      leftText: '北向月数据交互次数',
      unit: '次',
      leftProp: 'interactiveTotal',
      rtText: '成功',
      rtProp: 'success',
      rtColor: '#42EBFF',
      rbText: '失败',
      rbProp: 'fail',
      rbColor: '#FAB965',
      iconUrl: icon3Img,
    },
  ];

  const handleRenderMonitorOptions = (list = []) => {
    return list.map((item) => {
      return (
        <div className="Monitor_option" key={item.leftText}>
          <div className="left">
            <img className="icon" src={item.iconUrl} />
          </div>
          <div className="center">
            <div className="col">{item.leftText}</div>
            <div className="col">
              <span className="value bold-font">
                {monitorOptionsData[item.leftProp]}
              </span>
              <span className="unit">{item.unit}</span>
            </div>
          </div>
          <div className="right">
            <div className="item">
              <div className="col">{item.rtText}</div>
              <div className="col vertical-center">
                <span className="value" style={{ color: item.rtColor }}>
                  {monitorOptionsData[item.rtProp]}
                </span>
                <span className="unit">{item.unit}</span>
              </div>
            </div>
            <div className="item">
              <div className="col">{item.rbText}</div>
              <div className="col vertical-center">
                <span className="value" style={{ color: item.rbColor }}>
                  {monitorOptionsData[item.rbProp]}
                </span>
                <span className="unit">{item.unit}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleChangeMonth = (date, dateString) => {
    setMonth(dateString);
  };

  return (
    <div className="-p-Monitor">
      <div className="Monitor_options">
        {handleRenderMonitorOptions(monitorOptions.slice(0, 2))}
      </div>

      <div className="Monitor_detail">
        {handleRenderMonitorOptions(monitorOptions.slice(2, 3))}

        <div className="Monitor_select_month">
          <div className="left bold-font">月内每日交互调用情况</div>
          <div className="right">
            <DatePicker
              className="select-month"
              picker="month"
              placeholder="请选择月份"
              format={'YYYY-MM'}
              defaultValue={moment()}
              allowClear={false}
              suffixIcon={
                <CalendarOutlined
                  style={{ fontSize: '1rem', color: '#28639f' }}
                />
              }
              onChange={handleChangeMonth}
            />
          </div>
        </div>

        <BarEcharrts />
        <GaugeContent value={successPresent} />
      </div>
    </div>
  );
};

export default Monitor;
