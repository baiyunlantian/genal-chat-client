import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './index.less';

export default (
  {
    title,
    visible,
    handleVisibleModal
  } : {
    title:string,
    visible:boolean,
    handleVisibleModal:Function
  }) => {

  const [name, setName] = useState<string>('')
  const [showErr, setShowErr] = useState<boolean>(false)

  const handleClickBtn = () => {
    if (!name || name === ' ') {
      setShowErr(true)
    }else {
      handleOnClose()
    }
  };

  const handleOnClose = () => {
    setName('')
    setShowErr(false)
    handleVisibleModal(false)
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
      <div className='modalBody'>
        <Input placeholder={`请输入${title ? title.substring(0,2) : ''}名字`} value={name} onChange={e=>setName(e.target.value)} />
        <Button onClick={handleClickBtn}>
          { title === '搜索群' ? '加入群'
            : title === '创建群' ? '确定' : '添加好友'
          }
        </Button>
      </div>
      {showErr ? <div className={styles.errTip}>{`请输入${title ? title.substring(0,2) : ''}名字！`}</div> : ''}
    </Modal>
  );
}
