import React, { Component } from 'react';
import { connect } from 'react-redux';
class Profile extends Component {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    return <div>This is Profile</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};
export default connect(mapStateToProps, {})(Profile);
