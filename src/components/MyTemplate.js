import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../actions';
import { Layout, Menu, Typography } from 'antd';
import {
  FileOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export const my_layout = (ComposedComponent, title, index) => {
  class Mylayout extends Component {
    handleLogout = () => {
      this.props.logout();
    };

    render() {
      const { Header, Content, Footer, Sider } = Layout;
      const { Title } = Typography;
      return (
        <Layout style={{ height: '100vh' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              //console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              //console.log(collapsed, type);
            }}
          >
            <div
              className="logo"
              style={{
                height: '60px',

                backgroundImage: `url("https://app.revature.com/core/resources/download/organizations/logos/89c5d424854a06ca216c885f43550bcc.png/empImage")`,
                margin: '',
              }}
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${index}`]}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Dash Board
                <Link to="/home" />
              </Menu.Item>
              <Menu.Item key="2" icon={<FileOutlined />}>
                Reimbursements
                <Link to="/reimbursement" />
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                My Profile
                <Link to="/profile" />
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<LogoutOutlined />}
                onClick={this.handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0 }}
            >
              <Title
                align="middle"
                style={{ marginBottom: '100px', color: 'linen' }}
              >
                {title}
              </Title>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <ComposedComponent {...this.props} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
          </Layout>
        </Layout>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.authenticated,
      errorMessage: state.errorMessage,
    };
  };

  return connect(mapStateToProps, auth)(Mylayout);
};

export default my_layout;
