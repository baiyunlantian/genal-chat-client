import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Select, message } from 'antd';
import { getUsersByUserName, addFriend, getGroupsByName } from '@/api';
import styles from './index.less';

const { Option, OptGroup } = Select;
let timer: any = null;

export default (props: any) => {
  const { title, visible, handleVisibleModal, userInfo, socket } = props;

  const [{ modalType, name, optionId, options, showErr }, setState] = useState({
    modalType: '0',
    name: '',
    optionId: '',
    options: [],
    showErr: false,
  });

  useEffect(() => {
    if (title === '创建群') {
      setState((state) => ({ ...state, modalType: '0' }));
    } else if (title === '搜索群') {
      setState((state) => ({ ...state, modalType: '1' }));
    } else if (title === '搜索用户') {
      setState((state) => ({ ...state, modalType: '2' }));
    }

    if (!visible) {
      setState((state) => ({ ...state, name: '', optionId: '', options: [] }));
    }
  }, [visible]);

  const handleClickBtn = () => {
    if (!name || name === ' ') {
      setState((state) => ({ ...state, showErr: true }));
    } else {
      let data: any = { userId: userInfo.userId };
      if (modalType === '0') {
        data['groupName'] = name;
        socket.emit('addGroup', data);
      } else if (modalType === '1') {
        data['groupId'] = optionId;
        socket.emit('joinGroup', data);
      } else if (modalType === '2') {
        data['friendId'] = optionId;
        data['friendName'] = name;
        socket.emit('addFriend', data);
      }
    }
  };

  const handleOnClose = () => {
    setState((state) => ({
      ...state,
      name: '',
      optionId: '',
      options: [],
      showErr: false,
    }));
    handleVisibleModal(false);
  };

  const handleSelectChange = (val, option) => {
    const { children, value } = option;
    setState((state) => ({
      ...state,
      name: children,
      optionId: value,
      showErr: false,
    }));
  };

  const handleSearchList = (name: string) => {
    setState((state) => ({ ...state, name }));

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    let data: any = {},
      fn = new Function(),
      VALUE = '',
      LABEL = '';

    if (modalType === '1') {
      data['groupName'] = name;
      fn = getGroupsByName;
      VALUE = 'groupId';
      LABEL = 'groupName';
    } else if (modalType === '2') {
      data['userId'] = userInfo.userId;
      data['username'] = name;
      fn = getUsersByUserName;
      VALUE = 'userId';
      LABEL = 'username';
    }

    timer = setTimeout(() => {
      fn(data).then((res) => {
        if (res.code === 200) {
          setState((state) => ({
            ...state,
            options: res.data.map((item) => {
              return { value: item[VALUE], label: item[LABEL] };
            }),
          }));
        }
      });
    }, 1500);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      className={styles.searchChatModal}
      onCancel={handleOnClose}
      forceRender
    >
      <div className="modalBody">
        {title === '创建群' ? (
          <Input
            placeholder={`请输入${title ? title.substring(0, 2) : ''}名字`}
            value={name}
            onChange={(e) =>
              setState((state) => ({ ...state, name: e.target.value }))
            }
          />
        ) : (
          <Select
            showSearch
            value={name ? name : undefined}
            placeholder={`请输入${title ? title.substring(0, 2) : ''}名字`}
            autoFocus={true}
            allowClear={true}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
            defaultActiveFirstOption={false}
            onSearch={handleSearchList}
            onSelect={handleSelectChange}
            onClear={() => {
              setState((state) => ({ ...state, name: '', optionId: '' }));
            }}
          >
            <OptGroup label="">
              {options.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </OptGroup>
          </Select>
        )}

        <Button onClick={handleClickBtn}>
          {title === '搜索群'
            ? '加入群'
            : title === '创建群'
            ? '确定'
            : '添加好友'}
        </Button>
      </div>
      {showErr ? (
        <div className={styles.errTip}>{`请输入${
          title ? title.substring(0, 2) : ''
        }名字！`}</div>
      ) : (
        ''
      )}
    </Modal>
  );
};
