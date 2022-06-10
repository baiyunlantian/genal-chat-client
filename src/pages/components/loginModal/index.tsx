import React from 'react';
import { Button, Form, Input, Modal, Tabs } from 'antd';
import { connect } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/api';
// @ts-ignore
import md from 'js-md5';
import styles from './index.less';

const { TabPane } = Tabs;

const LoginModal = (props: any) => {
  const { user, dispatch } = props;
  const token = user.token;
  const [form] = Form.useForm();

  const onFinish = (values: { username: string; password: string }) => {
    const { password, username } = values;
    const params = { username, password: md(password) };

    login(params).then((res) => {
      console.log('res', res);
    });
  };

  return (
    <Modal
      visible={!token}
      footer={null}
      className={styles.loginModal}
      forceRender
      closable={false}
    >
      <Tabs defaultActiveKey="1" onChange={() => form.resetFields()}>
        <TabPane tab="登录" key="1" />
        <TabPane tab="注册" key="2" />
      </Tabs>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ xs: { span: 8 } }}
        wrapperCol={{ xs: { span: 12 } }}
        form={form}
      >
        <Form.Item
          label=""
          name="username"
          rules={[
            { required: true, message: '请输入用户名!', whitespace: true },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                style={{ fontSize: '1rem', color: 'rgb(164 164 164)' }}
              />
            }
            placeholder="username"
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: '请输入密码!', whitespace: true }]}
        >
          <Input.Password
            prefix={
              <LockOutlined
                style={{ fontSize: '1rem', color: 'rgb(164 164 164)' }}
              />
            }
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ user }: { user: object }) => ({ user }))(LoginModal);
