import TCharts from '@/pages/ApiMonitorVisual/components/TCharts';
import EChartsReact from 'echarts-for-react';
import * as echarts from 'echarts';
import type { FC } from 'react';
import React from 'react';
import { getFontSize } from '../utils';

type Props = {
  data?: number[];
  color?: string;
};

const Echarts: FC<Props> = ({ data = [], color = '#42C7FF' }) => {
  const option = {
    color,
    tooltip: {
      trigger: 'axis',
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
      data: new Array(30).fill(1).map((item, index) => index + 1),
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
        data: new Array(30).fill(1).map((item) => {
          return Math.ceil(Math.random() * 100);
        }),
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

  return <EChartsReact option={option} style={{ height: '12.1428rem' }} />;
};

export default Echarts;
