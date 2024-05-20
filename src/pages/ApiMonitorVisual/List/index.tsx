import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, message, Row, Select, DatePicker } from 'antd';
import './index.less';
import InterfaceMonitorTable from '../components/Table/index';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const List = () => {
  const [form] = Form.useForm();

  return (
    <div className="-p-ApiMonitorList">
      <div className="header">
        <span className="title">产业虚拟电厂接口服务检测可视化</span>
      </div>

      <div className="main">
        <Form form={form} className="form-container">
          <div className="item">
            <Form.Item label="时间范围:" name="time">
              <RangePicker showTime placeholder={['开始时间', '结束时间']} />
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item label="接口方向:" name="provinceCode">
              <Select style={{ width: '168px' }} allowClear>
                <Option value={'all'} key={'all'}>
                  {'全部'}
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item label="接口名称:" name="userName">
              <Input maxLength={100} style={{ width: '168px' }} allowClear />
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item label="调用结果:" name="cityCode">
              <Select style={{ width: '168px' }} allowClear>
                <Option value={'all'} key={'all'}>
                  {'全部'}
                </Option>
              </Select>
            </Form.Item>
          </div>
          <Button type="primary" className="search-btn">
            查询
          </Button>
        </Form>

        <div className="list-container">
          <InterfaceMonitorTable pagination={true} />
        </div>
      </div>
    </div>
  );
};

export default List;
