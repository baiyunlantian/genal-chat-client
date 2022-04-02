import React, {useState} from 'react';
import { Modal, Avatar, Form, Input, Button } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const UserInfoModal = (props:any) => {
  const {app, dispatch} = props
  const visible = app.userInfoModalVisible
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnCancel = () => {
    form.resetFields();

    dispatch({
      type:'app/changeBoolean',
      payload:{
        key:'userInfoModalVisible',
        value:false
      },
    })
  };

  return (
    <Modal
      title="用户信息"
      visible={visible}
      onCancel={handleOnCancel}
      footer={null}
      className={styles.userInfoModal}
      forceRender
    >
      <div className={styles.avatar}>
        <Avatar size={45} className={styles.userImg} src={require('@/assets/avatar(1).png')} />
      </div>

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{xs:{span:8}}}
        wrapperCol={{xs:{span:12}}}
      >
        <Form.Item
          label="更改用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!', whitespace:true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="更改密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!', whitespace:true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connect(({app}:{app:object})=>({app}))(UserInfoModal)
