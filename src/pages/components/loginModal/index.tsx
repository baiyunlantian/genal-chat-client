import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Tabs, message } from 'antd';
import { connect } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, register } from '@/api';
// @ts-ignore
import md from 'js-md5';
import styles from './index.less';

const { TabPane } = Tabs;

const LoginModal = (props: any) => {
  const [tab, setTab] = useState<string>('1');
  const { user, dispatch } = props;
  const token = user.token
    ? user.token
    : sessionStorage.getItem('access_token');
  const [form] = Form.useForm();

  const onFinish = (values: { account: string; password: string }) => {
    const { password, account } = values;
    const params = { username: account, password: md(password) };

    if (tab === '1') {
      login(params).then((res: any) => {
        if (res.code === 200) {
          message.success(res.msg);
          const { access_token, ...userInfo } = res.data;
          dispatch({
            type: 'user/setUserInfo',
            payload: userInfo,
          });
          dispatch({
            type: 'user/setToken',
            payload: access_token,
          });
          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          form.resetFields();
        }
      });
    } else {
      register(params).then((res: any) => {
        if (res.code === 200) {
          setTab('1');
          form.resetFields();
          message.success(res.msg);
        }
      });
    }
  };

  return (
    <Modal
      visible={!token}
      footer={null}
      className={styles.loginModal}
      forceRender
      closable={false}
    >
      <Tabs
        defaultActiveKey="1"
        activeKey={tab}
        onChange={(e) => {
          setTab(e);
          form.resetFields();
        }}
      >
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
          name="account"
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
            placeholder="account"
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
