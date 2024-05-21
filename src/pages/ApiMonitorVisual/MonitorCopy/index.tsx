import icon1Img from '@/assets/ApiMonitorVisual/Monitor/icon1.png';
import icon2Img from '@/assets/ApiMonitorVisual/Monitor/icon2.png';
import icon3Img from '@/assets/ApiMonitorVisual/Monitor/icon3.png';

import { Col, Row, DatePicker, InputNumber, Spin } from 'antd';
import { CalendarOutlined } from '@ant-design/icons/lib';
import React, { useEffect, useMemo, useState } from 'react';

import './index.less';
import BarEcharrts from './Echarts';
import GaugeContent from '../Gauge/index';
import moment from 'moment';

import { getInterfaceMonthCount } from '@/api';

const Monitor = (props) => {
  const { direction, loading, infoCount } = props;
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [ratePercent, setRatePercent] = useState(0);
  const [barMonthCurve, setBarMonthCurve] = useState({});
  const [echartsLoading, setEchartsLoading] = useState(false);

  useEffect(() => {
    let params = {
      month,
      direction: direction === '北' ? '1' : '0',
    };

    setEchartsLoading(true);
    getInterfaceMonthCount(params)
      .then((res) => {
        if (res.code === 0) {
          const { rate = 0, monthCurve = {} } = res.data;
          setRatePercent(rate);
          setBarMonthCurve(monthCurve);
        }
      })
      .finally(() => {
        setEchartsLoading(false);
      });
  }, [month]);

  const monitorOptions = [
    {
      leftText: `${direction}向接口总数量`,
      unit: '个',
      leftProp: 'interNum',
      rtText: '正常',
      rtProp: 'normalInterNum',
      rtColor: '#00F5AD',
      rbText: '异常',
      rbProp: 'errorInterNum',
      rbColor: '#FA5353',
      iconUrl: icon1Img,
    },
    {
      leftText: `${direction}向平均用时`,
      unit: '秒',
      leftProp: 'aveTime',
      rtText: '最快',
      rtProp: 'fastestTime',
      rtColor: '#4DBAFF',
      rbText: '最慢',
      rbProp: 'slowestTime',
      rbColor: '#C57EF3',
      iconUrl: icon2Img,
    },
    {
      leftText: `${direction}向月数据交互次数`,
      unit: '次',
      leftProp: 'monthlyCount',
      rtText: '成功',
      rtProp: 'monthlySucceedCount',
      rtColor: '#42EBFF',
      rbText: '失败',
      rbProp: 'monthlyErrorCount',
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
                {infoCount[item.leftProp]}
              </span>
              <span className="unit">{item.unit}</span>
            </div>
          </div>
          <div className="right">
            <div className="item">
              <div className="col">{item.rtText}</div>
              <div className="col vertical-center">
                <span className="value" style={{ color: item.rtColor }}>
                  {infoCount[item.rtProp]}
                </span>
                <span className="unit">{item.unit}</span>
              </div>
            </div>
            <div className="item">
              <div className="col">{item.rbText}</div>
              <div className="col vertical-center">
                <span className="value" style={{ color: item.rbColor }}>
                  {infoCount[item.rbProp]}
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
        <Spin spinning={loading}>
          {handleRenderMonitorOptions(monitorOptions.slice(0, 2))}
        </Spin>
      </div>

      <div className="Monitor_detail">
        <Spin spinning={loading}>
          {handleRenderMonitorOptions(monitorOptions.slice(2, 3))}
        </Spin>

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

        <Spin spinning={echartsLoading}>
          <BarEcharrts dataSource={barMonthCurve} />
          <GaugeContent value={ratePercent} />
        </Spin>
      </div>
    </div>
  );
};

export default Monitor;
