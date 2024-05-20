import React, { useEffect, useMemo, useState } from 'react';
import { Table, Pagination, Modal } from 'antd';
import type { FC } from 'react';
import './index.less';
import moment from 'moment';

type Props = {
  pagination?: boolean;
};

const TableComponent: FC<Props> = ({ pagination = false }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'left',
    },
    {
      title: '接口方向',
      dataIndex: 'direction',
      key: 'direction',
      align: 'center',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '交互方平台/系统',
      dataIndex: 'system',
      key: 'system',
      align: 'center',
    },
    {
      title: '接口调用结果',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => (
        <span style={{ color: text === '0' ? '#FFF605' : '#1EF2B7' }}>
          {text === '0' ? '失败' : '成功'}
        </span>
      ),
    },
    {
      title: '耗时(秒)',
      dataIndex: 'timeConsuming',
      key: 'timeConsuming',
      align: 'center',
    },
    {
      title: '调用反馈信息',
      dataIndex: 'response',
      key: 'response',
      align: 'center',
      render: (text) => <span>{text === '0' ? '连接超时' : '操作成功'}</span>,
    },
    {
      title: '接口JSON',
      align: 'center',
      dataIndex: 'json',
      key: 'json',
      render: (text, record) => (
        <span className="btn" onClick={() => handleShowModal(record, 'json')}>
          查看
        </span>
      ),
    },
    {
      title: '异常日志',
      align: 'center',
      dataIndex: 'log',
      key: 'log',
      render: (text, record) => (
        <span className="btn" onClick={() => handleShowModal(record, 'log')}>
          查看
        </span>
      ),
    },
  ];
  const data = new Array(20).fill(0).map((item) => {
    return {
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      direction: Math.random() > 0.5 ? '南向接口' : '北向接口',
      name: 'pcpasf',
      system: 'pcpasf',
      status: Math.random() > 0.5 ? '0' : '1',
      timeConsuming: Math.random().toFixed(2),
      response: Math.random() > 0.5 ? '0' : '1',
    };
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('json');

  const handleShowModal = (record, modalType) => {
    setModalVisible(true);
    setModalType(modalType);
    console.log('record', record);
    console.log('modalType', modalType);
  };

  const handleOk = (record, modalType) => {
    console.log('record', record);
    console.log('modalType', modalType);
  };

  const handleCancel = (record, modalType) => {
    console.log('record', record);
    console.log('modalType', modalType);
    setModalVisible(false);
  };

  const changePagination = (page, pageSize) => {
    console.log('page', page);
    console.log('pageSize', pageSize);
  };

  return (
    <div className="table-container">
      <Table
        className="interface-monitor-table"
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      {pagination && (
        <Pagination
          showLessItems={false}
          total={25}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `总共${total}次记录`}
          onChange={changePagination}
        />
      )}

      <Modal
        className={`custom-modal ${
          modalType === 'json' ? 'json-modal' : 'log-modal'
        }`}
        title={modalType === 'json' ? '接口报文内容' : '调用异常日志'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="复制"
      >
        <div className="modal-content">
          a
          <br />
          d
          <br />
          b
          <br />
          f
          <br />
          h
          <br />
          j
          <br />
          n
          <br />
          j
          <br />
          u
          <br />
          d
          <br />
          t
          <br />
          c
          <br />
          q a
          <br />
          d
          <br />
          b
          <br />
          f
          <br />
          h
          <br />
          j
          <br />
          n
          <br />
          j
          <br />
          u
          <br />
          d
          <br />
          t
          <br />
          c
          <br />
          q a
          <br />
          d
          <br />
          b
          <br />
          f
          <br />
          h
          <br />
          j
          <br />
          n
          <br />
          j
          <br />
          u
          <br />
          d
          <br />
          t
          <br />
          c
          <br />q
        </div>
      </Modal>
    </div>
  );
};

export default TableComponent;
