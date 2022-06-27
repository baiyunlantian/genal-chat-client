import React, { useState } from 'react';
import { Modal, Avatar, Form, Input, Button, Upload, message } from 'antd';
import { connect } from 'umi';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { uploadAvatar } from '@/api';
import { BASE_URL } from '@/utils/config';
import styles from './index.less';

const UserInfoModal = (props: any) => {
  const { app, user, dispatch } = props;
  const { userInfo } = user;
  const visible = app.userInfoModalVisible;
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
      type: 'app/changeBoolean',
      payload: {
        key: 'userInfoModalVisible',
        value: false,
      },
    });
  };

  const beforeUpload = (file: RcFile) => {
    console.log('handleChange', file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (res: any) => {
    const { file } = res;
    let formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userInfo.userId);

    uploadAvatar(formData).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        dispatch({
          type: 'user/setUserInfo',
          payload: res.data,
        });
        sessionStorage.setItem('userInfo', JSON.stringify(res.data));
      }
    });
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
      <Upload
        accept="image/jpeg,image/jpeg,image/png"
        name="file"
        listType="picture"
        className={styles.avatarUploader}
        showUploadList={false}
        // beforeUpload={beforeUpload}
        customRequest={handleChange}
      >
        {userInfo && userInfo.avatar ? (
          <div className={styles.avatar}>
            <Avatar
              size={70}
              className={styles.userImg}
              src={`${BASE_URL}${userInfo.avatar}`}
            />
          </div>
        ) : (
          <div className={styles.uploadBtn}>上传</div>
        )}
      </Upload>

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ xs: { span: 8 } }}
        wrapperCol={{ xs: { span: 12 } }}
        form={form}
      >
        <Form.Item
          label="更改用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名!', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="更改密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!', whitespace: true }]}
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
};

export default connect(({ app, user }: any) => ({ app, user }))(UserInfoModal);
