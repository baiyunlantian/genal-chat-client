import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, message, Row, Select, DatePicker } from 'antd';
import './index.less';
import InterfaceMonitorTable from '../components/Table/index';
import moment from 'moment';
import { history, connect } from 'umi';
import GoBackIcon from '@/assets/ApiMonitorVisual/List/goBack_icon.png';
import { getInterfaceInfoListByPage } from '@/api';
import { Spin } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const List = (props) => {
  const { dispatch } = props;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [tableSource, setTableSource] = useState([]);
  const [paginationParams, setPaginationParams] = useState({
    pageNum: 1,
    pageSize: 15,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    handleSearchTable();
  }, [paginationParams]);

  const goBack = () => {
    dispatch({
      type: 'app/setIsKeepAlive',
      payload: {
        key: 'isKeepAlive',
        value: true,
      },
    });
    history.push('/');
  };

  const handleSearchTable = () => {
    let formData = form.getFieldsValue();

    if (formData.time && formData.time.length > 0) {
      formData.preOccurTime = moment(formData.time[0]).format(
        'YYYY-MM-DD HH:mm:ss',
      );
      formData.afterOccurTime = moment(formData.time[1]).format(
        'YYYY-MM-DD HH:mm:ss',
      );
    }

    let params = {
      ...formData,
      ...paginationParams,
    };

    setLoading(true);
    getInterfaceInfoListByPage(params)
      .then((res) => {
        if (res.code === 0) {
          const { datas = [], rowCount = 0 } = res.data;
          setTableSource(datas);
          setTotal(rowCount);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangePagination = (pageNum, pageSize) => {
    setPaginationParams({ pageNum, pageSize });
  };

  return (
    <div className="-p-ApiMonitorList">
      <div className="header">
        <span className="title">产业虚拟电厂接口服务监测可视化</span>
        <div className="goBack-btn" onClick={goBack}>
          <img src={GoBackIcon} />
          <span>返回</span>
        </div>
      </div>

      <div className="main">
        <Form form={form} className="form-container">
          <div className="item">
            <Form.Item label="时间范围:" name="time">
              <RangePicker showTime placeholder={['开始时间', '结束时间']} />
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item label="接口方向:" name="direction">
              <Select style={{ width: '168px' }} allowClear>
                <Option value={'1'} key={'1'}>
                  {'北向接口'}
                </Option>
                <Option value={'0'} key={'0'}>
                  {'南向接口'}
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item label="接口名称:" name="interfaceName">
              <Input maxLength={100} style={{ width: '168px' }} allowClear />
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item label="调用结果:" name="resultState">
              <Select style={{ width: '168px' }} allowClear>
                <Option value={'1'} key={'1'}>
                  {'成功'}
                </Option>
                <Option value={'0'} key={'0'}>
                  {'失败'}
                </Option>
              </Select>
            </Form.Item>
          </div>
          <Button
            type="primary"
            className="search-btn"
            onClick={handleSearchTable}
          >
            查询
          </Button>
        </Form>

        <div className="list-container">
          <Spin spinning={loading}>
            <InterfaceMonitorTable
              showPagination={true}
              dataSource={tableSource}
              pagination={paginationParams}
              total={total}
              onChangePagination={handleChangePagination}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default connect(({ app }: any) => ({ app }))(List);
