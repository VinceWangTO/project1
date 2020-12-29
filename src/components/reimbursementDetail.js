import React from 'react';
import { Modal, Button, Row, Col } from 'antd';

const ReimbursementsDetail = (props) => {
  const { record } = props;
  return (
    record && (
      <Modal
        title="Reimbursement Detail"
        visible={props.show}
        // onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <th>Reimbursement #</th>
              <td>{record.reimbursementId}</td>
            </tr>
            <tr>
              <th>Reimbursement Amount</th>
              <td>${record.reimbursementAmount}</td>
            </tr>
            <tr>
              <th>Reimbursement Description</th>
              <td>{record.reimbursementDescription}</td>
            </tr>
            <tr>
              <th>Reimbursement Receipt</th>
              <td>Receipt</td>
            </tr>
            <tr>
              <th>Reimbursement Status</th>
              <td>{record.status}</td>
            </tr>
          </tbody>
        </table>
        {record.status === 'PENDING' && (
          <div>
            <hr />
            <Row>
              <Col span={8}>
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={() => props.handleManageReimbursement(record, 2)}
                >
                  Accept
                </Button>
              </Col>
              <Col span={8}></Col>
              <Col span={8}>
                <Button
                  type="primary"
                  danger
                  style={{ width: '100%' }}
                  onClick={() => props.handleManageReimbursement(record, 3)}
                >
                  Deny
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    )
  );
};

export default ReimbursementsDetail;
