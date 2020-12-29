import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
const ReimbursementsDetail = (props) => {
  const { record } = props;
  const viewReceipt = (receipt, mimeType) => {
    if (receipt !== null) {
      var byteCharacters = receipt;
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: mimeType + ';base64' });
      var fileURL = URL.createObjectURL(file);

      var image = new Image();
      image.src = receipt;
      var w = window.open(fileURL);
      w.document.write(image.outerHTML);
    }
  };
  console.log(props.roleId);
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
              <td>
                <Button
                  type="default"
                  onClick={() =>
                    viewReceipt(record.reimbursementReceipt, 'image/jpg')
                  }
                  icon={<ZoomInOutlined />}
                >
                  View Receipt
                </Button>
              </td>
            </tr>
            <tr>
              <th>Reimbursement Status</th>
              <td>{record.status}</td>
            </tr>
          </tbody>
        </table>
        {record.status === 'PENDING' && props.roleId === 2 && (
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
