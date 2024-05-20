import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import './index.less';
import GaugeEcharts from './Echarts';
import computePointerDeviation from './computeDeviation';

type Props = {
  value: number;
};

const GaugeContainer: FC<Props> = ({ value }) => {
  const [deviation, setDeviation] = useState({
    rotate: -90,
    top: 31.5,
    left: 48.5,
  });

  useEffect(() => {
    setDeviation(computePointerDeviation(value));
  }, [value]);

  return (
    <div className="gauge_container" style={{ height: '9.2857rem' }}>
      <div className="gauge_echarts">
        <div
          className="pointer"
          style={{
            transform: `rotate(${deviation.rotate}deg)`,
            top: `${deviation.top}%`,
            left: `${deviation.left}%`,
          }}
        ></div>
        <GaugeEcharts value={value} />
      </div>

      <div className="present">
        <span className="label">接口调用成功率</span>
        <span className="gap-icon">----</span>
        <span className="value">{value || 0}%</span>
      </div>
    </div>
  );
};

export default GaugeContainer;
