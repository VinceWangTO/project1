import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reimbursementsAction } from '../actions';
import { formatDate } from '../lib/utils';
import { Row, Col, Table, Space, Typography, Button } from 'antd';
import { Pie } from '@ant-design/charts';
import { UnorderedListOutlined } from '@ant-design/icons';

import ReimbursementsDetail from './reimbursementDetail';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      record: null,
    };
  }
  componentDidMount() {
    if (this.props.authenticated && this.props.authenticated.userRoleId === 2) {
      this.props.getAllReimbursements();
    } else {
      this.props.getMyReimbursements(this.props.authenticated.userId);
    }
  }
  handleViewDetail = (record) => {
    this.setState({
      show: true,
      record,
    });
  };
  handleCancel = () => {
    this.setState({
      show: false,
    });
  };
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

  onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  handleManageReimbursement = async (record, statusId) => {
    record.reimbursementStatusId = statusId;
    record.reimbursementResolved = new Date();
    record.reimbursementResolverId = this.props.authenticated.userId;

    delete record.key;
    delete record.status;
    console.log(record);
    //do update
    await this.props.updateReimbursement(record);

    this.setState({
      show: false,
    });
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
        r.key = r.reimbursementId;
        r.reimbursementSubmitted = formatDate(Date(r.reimbursementSubmitted));

        if (
          r.reimbursementResolved === null ||
          r.reimbursementResolved === ''
        ) {
          r.reimbursementResolved = '';
        } else {
          r.reimbursementResolved = formatDate(Date(r.reimbursementResolved));
        }

        switch (r.reimbursementStatusId) {
          case 2:
            amountData[1].value = amountData[1].value + r.reimbursementAmount;
            statusData[1].value = statusData[1].value + 1;
            r.status = 'APPROVED';
            break;
          case 3:
            amountData[2].value = amountData[2].value + r.reimbursementAmount;
            statusData[2].value = statusData[1].value + 1;
            r.status = 'DENIED';
            break;
          default:
            amountData[0].value = amountData[0].value + r.reimbursementAmount;
            statusData[0].value = statusData[0].value + 1;
            r.status = 'PENDING';
        }
        // r.reimbursementAmount = Number.parseFloat(
        //   r.reimbursementAmount
        // ).toFixed(2);
        return r;
      }) || [];
    const columns = [
      {
        title: '#',
        dataIndex: 'reimbursementId',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.reimbursementId - b.reimbursementId,
      },
      {
        title: 'Amount',
        dataIndex: 'reimbursementAmount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.reimbursementAmount - b.reimbursementAmount,
      },
      {
        title: 'Submitted',
        dataIndex: 'reimbursementSubmitted',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.reimbursementSubmitted - b.reimbursementSubmitted,
      },
      {
        title: 'Resloved',
        dataIndex: 'reimbursementResolved',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.reimbursementResolved - b.reimbursementResolved,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        filters: [
          {
            text: 'PENDING',
            value: 'PENDING',
          },
          {
            text: 'APPROVED',
            value: 'APPROVED',
          },
          {
            text: 'DENIED',
            value: 'DENIED',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button
            onClick={() => this.handleViewDetail(record)}
            icon={<UnorderedListOutlined />}
          >
            View Details
          </Button>
        ),
      },
    ];

    return (
      <Row align="middle" justify="center">
        <Col span={12}>
          {this.props.authenticated &&
          this.props.authenticated.userRoleId === 2 ? (
            <Typography.Title align="middle">
              All Reimbursements
            </Typography.Title>
          ) : (
            <Typography.Title align="middle">
              My Reimbursements
            </Typography.Title>
          )}
          <Table
            columns={columns}
            dataSource={reimbursements}
            // onChange={this.onChange}
            pagination={{ defaultPageSize: 10, showSizeChanger: true }}
          />
          <ReimbursementsDetail
            show={this.state.show}
            record={this.state.record}
            handleCancel={this.handleCancel}
            handleManageReimbursement={this.handleManageReimbursement}
            roleId={this.props.authenticated.userRoleId}
          />
        </Col>
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
