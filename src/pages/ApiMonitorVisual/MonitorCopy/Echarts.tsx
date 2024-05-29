import EChartsReact from 'echarts-for-react';
import * as echarts from 'echarts';
import type { FC } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { getFontSize } from '../utils';

type Props = {
  dataSource: {};
};

const Echarts: FC<Props> = ({ dataSource = {} }) => {
  const chartRef = useRef(null);
  const [xAxis, setXAxis] = useState([0]);
  const [barData, setBarData] = useState(['1']);

  useEffect(() => {
    let _xAxis = [],
      _barData = [];

    Object.keys(dataSource).forEach((key) => {
      _xAxis.push(key.split('-')[2] || '-');
      _barData.push(dataSource[key] || 0);
    });

    setXAxis(_xAxis);
    setBarData(_barData);

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{c}次',
      },
      grid: {
        width: '85%',
        height: '80%',
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '5%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: _xAxis,
        axisLabel: {
          color: '#6CA3CF',
          fontSize: getFontSize(0.8),
          interval: 0,
        },
        axisLine: {
          lineStyle: {
            color: '#264d63',
            width: getFontSize(0.1),
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        nameGap: getFontSize(1.2),
        nameTextStyle: {
          fontSize: getFontSize(),
          color: '#6CA3CF',
        },
        type: 'value',
        axisLabel: {
          color: '#6CA3CF',
          fontSize: getFontSize(0.8),
          margin: getFontSize(0.6),
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#264d63',
            width: getFontSize(0.1),
          },
        },
        splitLine: {
          lineStyle: {
            color: '#264d63',
            width: getFontSize(0.1),
            type: 'dashed',
          },
        },
      },
      series: [
        {
          data: _barData,
          type: 'bar',
          barWidth: 4,
          lineStyle: {
            width: getFontSize(0.16),
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3A6DFF' },
              { offset: 0.32, color: 'rgba(4,234,255,0.45)' },
              { offset: 1, color: 'rgba(115,219,232,0.3)' },
            ]),
          },
        },
      ],
    };

    let chartsInstance = echarts.init(chartRef.current);
    chartsInstance.setOption(option);

    return () => {
      chartsInstance && chartsInstance.dispose();
    };
  }, [dataSource]);

  return <div ref={chartRef} style={{ height: '12.1428rem' }} />;
};

export default Echarts;
