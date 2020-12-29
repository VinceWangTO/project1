import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions';
import { Row, Col, Form, Input, Button, Typography } from 'antd';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

class Login extends Component {
  handleLogin = async (values) => {
    await this.props.login(values);
    if (this.props.authenticated) {
      this.props.history.push('/dashboard');
    }
  };

  onFinish = (values) => {
    this.handleLogin(values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    const { Title } = Typography;
    return (
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{
          height: '100vh',
          backgroundColor: 'aliceblue',
          backgroundImage: `url("https://www.papa-mike.com/v6/wp-content/uploads/2014/05/LOGIN-BACKGROUND-1.jpg")`,
          opacity: '0.6',
        }}
      >
        <Col span={6}></Col>
        <Col span={12}>
          {' '}
          <Title align="middle" style={{ marginBottom: '100px' }}>
            Reimbursement Pro
          </Title>
          <Form
            {...layout}
            style={{ horizontal: 'middle' }}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    errorMessage: state.errorMessage,
  };
};

export default connect(mapStateToProps, auth)(Login);
