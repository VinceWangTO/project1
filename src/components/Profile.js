import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
class Profile extends Component {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    return <Typography.Title align="middle">My Profile</Typography.Title>;
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};
export default connect(mapStateToProps, {})(Profile);
