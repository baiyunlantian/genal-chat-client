import React, { useEffect, useState } from 'react';
import './index.less';

const VPS = () => {
  /**
   * wlsb:物联设备
   * xndc:虚拟电厂运服平台
   * zhny:综合能源服务平台
   * clw:车联网平台
   * hwd:恒旺电管家
   * gzpt:国综平台
   * dsf:第三方市场化平台
   * */
  const data = ['wlsb', 'xndc', 'zhny', 'clw', 'hwd', 'gzpt', 'dsf'].map(
    (item) => {
      return {
        type: item,
        order: Math.ceil(Math.random() * 200),
        send: Math.ceil(Math.random() * 200),
      };
    },
  );

  return (
    <div className="VPS">
      <div className="VPS_content">
        {data.map((item) => {
          return (
            <div className={`item ${item.type}`} key={item.type}>
              <div className="order">
                <div>今日下达</div>
                <div>{item.order}次</div>
              </div>
              <div className="send">
                <div>今日上送</div>
                <div>{item.send}次</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VPS;
