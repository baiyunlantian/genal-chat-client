import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Table, Pagination, Modal, Message } from 'antd';
import type { FC } from 'react';
import './index.less';
import moment from 'moment';
import CopyJS from 'copy-to-clipboard';

type Props = {
  showPagination?: boolean;
  total?: number;
  onChangePagination?: Function;
  dataSource: [];
  pagination?: {};
};

const TableComponent: FC<Props> = ({
  showPagination = false,
  dataSource = [],
  onChangePagination,
  total,
  pagination,
}) => {
  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '时间',
      dataIndex: 'occurTime',
      key: 'occurTime',
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
      dataIndex: 'interfaceName',
      key: 'interfaceName',
      align: 'center',
    },
    {
      title: '交互方平台/系统',
      dataIndex: 'platform',
      key: 'platform',
      align: 'center',
    },
    {
      title: '接口调用结果',
      dataIndex: 'resultState',
      key: 'resultState',
      align: 'center',
      render: (text) => (
        <span style={{ color: text === '失败' ? '#FFF605' : '#1EF2B7' }}>
          {text}
        </span>
      ),
    },
    {
      title: '耗时(秒)',
      dataIndex: 'consumeTime',
      key: 'consumeTime',
      align: 'center',
      render: (text) => <span>{text > 0 ? (text / 1000).toFixed(2) : 0}</span>,
    },
    {
      title: '调用反馈信息',
      dataIndex: 'feedback',
      key: 'feedback',
      align: 'center',
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

  const copyRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('json');
  const [modalContent, setModalContent] = useState('');

  const handleShowModal = (record, modalType) => {
    if (modalType === 'json') {
      setModalContent(record.inputInfo);
    } else {
      setModalContent(record.errorInfo);
    }
    setModalVisible(true);
    setModalType(modalType);
  };

  const handleOk = () => {
    try {
      CopyJS(copyRef.current.innerText);
      Message.success({
        content: '复制成功!',
      });
    } catch (e) {
      Message.error({
        content: '复制失败!',
      });
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const changePagination = (page, pageSize) => {
    onChangePagination(page, pageSize);
  };

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={
          showPagination === true
            ? {
                scrollToFirstRowOnChange: true,
                y: 600,
              }
            : {}
        }
      />

      {showPagination && (
        <Pagination
          showLessItems={false}
          total={total}
          current={pagination.pageNum}
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
        <div className="modal-content" ref={copyRef}>
          {modalContent}
        </div>
      </Modal>
    </div>
  );
};

export default TableComponent;
