import icon1Img from '../../../assets/ApiMonitorVisual/Monitor/icon1.png';
import icon2Img from '../../../assets/ApiMonitorVisual/Monitor/icon2.png';
import icon3Img from '../../../assets/ApiMonitorVisual/Monitor/icon3.png';

import { Col, Row, DatePicker, InputNumber, Spin } from 'antd';
import { CalendarOutlined } from '@ant-design/icons/lib';
import React, { useEffect, useMemo, useState } from 'react';

import './index.less';
import BarEcharts from './Echarts';
import GaugeContent from '../Gauge/index';
import moment from 'moment';

import { getInterfaceMonthCount } from '@/api';
import { LOOP_TIME } from '@/utils/config';
import { connect } from 'umi';

const Monitor = (props) => {
  const { direction, loading, infoCount, app, dispatch } = props;
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [ratePercent, setRatePercent] = useState(0);
  const [barMonthCurve, setBarMonthCurve] = useState({});
  const [echartsLoading, setEchartsLoading] = useState(false);

  useEffect(() => {
    handleGetInterfaceMonthCount();
  }, [month]);

  useEffect(() => {
    handleGetInterfaceMonthCount();

    if (direction === '北') {
      sessionStorage.setItem('northMonth', moment().format('YYYY-MM'));
    } else {
      sessionStorage.setItem('southMonth', moment().format('YYYY-MM'));
    }

    let _timer = setInterval(() => {
      handleGetInterfaceMonthCount();
    }, LOOP_TIME);

    return () => {
      clearInterval(_timer);
    };
  }, []);

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

  const handleGetInterfaceMonthCount = () => {
    let _month =
      direction === '北'
        ? sessionStorage.getItem('northMonth')
        : sessionStorage.getItem('southMonth');
    let params = {
      month: _month,
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
  };

  const handleRenderMonitorOptions = (list = []) => {
    return list.map((item) => {
      return (
        <div className="Monitor_option" key={item.leftText}>
          <div className="left">
            {/*<img className="icon" src={item.iconUrl} />*/}
          </div>
          <div className="center">
            <div className="col">{item.leftText}</div>
            <div className="col">
              <span className="value bold-font">
                {handleTransformUnit(item.leftProp)}
                {/*{item.unit === '秒' && infoCount[item.leftProp] >= (1000 * 100) ? handleTransformUnit(infoCount[item.leftProp]) : infoCount[item.leftProp]}*/}
                {/*{infoCount[item.leftProp]}*/}
              </span>
              <span className="unit">
                {item.unit === '秒' && infoCount[item.leftProp] >= 1000 * 100
                  ? '分'
                  : item.unit}
              </span>
            </div>
          </div>
          <div className="right">
            <div className="item">
              <div className="col">{item.rtText}</div>
              <div className="col vertical-center">
                <span className="value" style={{ color: item.rtColor }}>
                  {handleTransformUnit(item.rtProp)}
                  {/*{item.unit === '秒' && infoCount[item.rtProp] >= (1000 * 100) ? handleTransformUnit(infoCount[item.rtProp]) : infoCount[item.rtProp]}*/}
                </span>
                <span className="unit">
                  {item.unit === '秒' && infoCount[item.rtProp] >= 1000 * 100
                    ? '分'
                    : item.unit}
                </span>
              </div>
            </div>
            <div className="item">
              <div className="col">{item.rbText}</div>
              <div className="col vertical-center">
                <span className="value" style={{ color: item.rbColor }}>
                  {handleTransformUnit(item.rbProp)}
                  {/*{item.unit === '秒' && infoCount[item.rbProp] >= (1000 * 100) ? handleTransformUnit(infoCount[item.rbProp]) : infoCount[item.rbProp]}*/}
                </span>
                <span className="unit">
                  {item.unit === '秒' && infoCount[item.rbProp] >= 1000 * 100
                    ? '分'
                    : item.unit}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleChangeMonth = (date, dateString) => {
    setMonth(dateString);
    if (direction === '北') {
      sessionStorage.setItem('northMonth', dateString);
    } else {
      sessionStorage.setItem('southMonth', dateString);
    }
  };

  const handleTransformUnit = (key) => {
    if (key === 'aveTime' || key === 'fastestTime' || key === 'slowestTime') {
      // 后端返回为毫秒级
      let millisecond = infoCount[key];
      let second = millisecond / 1000;

      // 大于100秒时，将格式转换成分钟
      if (second >= 100) {
        let min = Math.floor(second / 60);
        // 秒数转换成分钟
        let decimalPoint = Math.round(second % 60) / 60;
        // 保留一位小数
        let point = Math.ceil(decimalPoint * 10) / 10;
        return min + point;
      } else if (second >= 0.1) {
        return second.toFixed(1);
      }
      // 小于0.1秒时，显示 ‘<0.1’
      else if (second > 0) {
        return '<0.1';
      } else {
        return '0';
      }
    } else {
      return infoCount[key];
    }
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
          <BarEcharts dataSource={barMonthCurve} />
          <GaugeContent value={ratePercent} />
        </Spin>
      </div>
    </div>
  );
};

export default connect(({ app }: any) => ({ app }))(Monitor);
