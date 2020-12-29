import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reimbursementsAction } from '../actions';
import { formatDate } from '../lib/utils';
import { Row, Col } from 'antd';
import { Pie } from '@ant-design/charts';

class DashBoard extends Component {
  componentDidMount() {
    if (this.props.authenticated && this.props.authenticated.userRoleId === 2) {
      this.props.getAllReimbursements();
    } else {
      this.props.getMyReimbursements(this.props.authenticated.userId);
    }
  }

  handleConfig = (data, title, amount) => {
    return {
      appendPadding: 20,
      data: data,
      height: 350,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: function content(_ref) {
          if (amount) {
            return `$${_ref.value}`;
          } else {
            var percent = _ref.percent;
            return ''.concat(parseFloat(percent * 100).toFixed(2), '%');
          }
        },
        style: {
          textAlign: 'center',
          fontSize: 10,
        },
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '20px',
          },
          formatter: function formatter() {
            return title;
          },
        },
      },
    };
  };
  render() {
    const statusData = [
      {
        type: 'PENDING',
        value: 0,
      },
      {
        type: 'APPROVED',
        value: 0,
      },
      {
        type: 'DENIED',
        value: 0,
      },
    ];

    const amountData = [
      {
        type: 'PENDING',
        value: 0,
      },
      {
        type: 'APPROVED',
        value: 0,
      },
      {
        type: 'DENIED',
        value: 0,
      },
    ];
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
        console.log(r.reimbursementStatusId);
        switch (r.reimbursementStatusId) {
          case 2:
            amountData[1].value = amountData[1].value + r.reimbursementAmount;
            statusData[1].value = statusData[1].value + 1;
            break;
          case 3:
            amountData[2].value = amountData[2].value + r.reimbursementAmount;
            statusData[2].value = statusData[1].value + 1;
            break;
          default:
            amountData[0].value = amountData[0].value + r.reimbursementAmount;
            statusData[0].value = statusData[0].value + 1;
        }

        return r;
      }) || [];
    console.log(reimbursements);
    console.log(statusData);

    return (
      <Row type="flex" align="middle" justify="center">
        <Col span={12}>Table</Col>
        <Col span={12}>
          <Pie
            {...this.handleConfig(statusData, 'Reimbursements Status', false)}
          />
          <Pie
            {...this.handleConfig(amountData, 'Reimbursements Amount', true)}
          />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    reimbursements: state.reimbursements,
  };
};
export default connect(mapStateToProps, reimbursementsAction)(DashBoard);
