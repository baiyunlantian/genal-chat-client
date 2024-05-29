import TCharts from '@/pages/ApiMonitorVisual/components/TCharts';
import EChartsReact from 'echarts-for-react';
import * as echarts from 'echarts';
import type { FC } from 'react';
import React, { useRef, useEffect } from 'react';

type Props = {
  value: number;
};

const Echarts: FC<Props> = ({ value }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartsInstance = echarts.init(chartRef.current);

    const option = {
      series: [
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 15,
          },
          axisLine: {
            lineStyle: {
              width: 15,
              color: [[1, '#36576b']],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            distance: -20,
            length: 5,
            lineStyle: {
              width: 1,
              color: '#6CA3CF',
            },
          },
          axisLabel: {
            distance: -10,
            color: '#6CA3CF',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [{ value: value || 0 }],
          pointer: {
            show: false,
            itemStyle: {
              color: '#28cefb',
            },
          },
          min: 0,
          max: 100,
          splitNumber: 5,
          startAngle: 180,
          endAngle: 360,
          center: ['50%', '85%'],
          radius: 75,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(8,149,217, 0.5)' },
              { offset: 0.4, color: 'rgba(13,200,73, 0.8)' },
              { offset: 0.7, color: 'rgba(83,255,176, 0.8)' },
              { offset: 0.9, color: 'rgba(143,252,205, 0.8)' },
              { offset: 1, color: 'rgba(8,149,217, 0.6)' },
            ]),
          },
        },
      ],
    };

    chartsInstance.setOption(option);

    return () => {
      chartsInstance && chartsInstance.dispose();
    };
  }, [value]);

  return <div ref={chartRef} style={{ height: '100%' }} />;
};

export default Echarts;
