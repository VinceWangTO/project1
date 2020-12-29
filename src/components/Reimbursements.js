import React, { Component } from 'react';
import { connect } from 'react-redux';
class Reimbursements extends Component {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    return <div>This is Reimbursements</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};
export default connect(mapStateToProps, {})(Reimbursements);
