import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reimbursementsAction } from '../actions';
import { formatDate } from '../lib/utils';
class DashBoard extends Component {
  componentDidMount() {
    if (this.props.authenticated && this.props.authenticated.userRoleId === 2) {
      this.props.getAllReimbursements();
    } else {
      this.props.getMyReimbursements(this.props.authenticated.userId);
    }
  }

  handleLogout = () => {
    this.props.logout();
  };
  render() {
    const reimbursements =
      this.props.reimbursements.map((r) => {
        r.reimbursementSubmitted = formatDate(
          new Date(r.reimbursementSubmitted)
        );
        console.log(r.reimbursementResolved === null);
        if (r.reimbursementResolved === null) {
          r.reimbursementResolved = '';
        } else {
          r.reimbursementResolved = formatDate(Date(r.reimbursementResolved));
        }
        return r;
      }) || [];
    console.log(reimbursements);

    return <div>This is Dash</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    reimbursements: state.reimbursements,
  };
};
export default connect(mapStateToProps, reimbursementsAction)(DashBoard);
