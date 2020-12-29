import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { reimbursementsAction } from '../actions';

function Reimbursements() {
  const [file, setFile] = useState(0);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.authenticated);
  const dispatch = useDispatch();
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     file: '',
  //   };
  // }
  // handleFile = (file) => {
  //   this.setState({ file });
  // };
  const onFinish = (values) => {
    const reimbursement = values;
    reimbursement.reimbursementReceipt = file;
    reimbursement.reimbursementSubmitted = new Date();
    reimbursement.reimbursementStatusId = 1;
    reimbursement.reimbursementAnthorId = user.userId;
    dispatch(reimbursementsAction.addReimbursement(reimbursement));
    form.resetFields();
    alert('Reimbursement submitted!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 7,
      span: 16,
    },
  };
  const { Option } = Select;

  return (
    <div>
      {' '}
      <Form
        form={form}
        {...layout}
        style={{ horizontal: 'middle' }}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="reimbursementTypeId"
          label="Reimbursement Type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select an reimbursement type"
            //onChange={onGenderChange}

            allowClear
          >
            <Option value="1">LODGING</Option>
            <Option value="2">TRAVEL</Option>
            <Option value="3">FOOD</Option>
            <Option value="4">OTHER</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Reimbursement Amount"
          name="reimbursementAmount"
          rules={[
            {
              required: true,
              message: 'Please input your reimbursement amount!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Reimbursement Description"
          name="reimbursementDescription"
          rules={[
            {
              required: true,
              message: 'Please input the reimbursement description!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="reimbursementReceipt" label="Reimbursement Receipt">
          <Upload
            // accept=".txt, .csv"
            showUploadList={false}
            beforeUpload={(file) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                const result = e.target.result;
                setFile(result);
                //console.log(e.target.result);
              };
              reader.readAsDataURL(file);

              // Prevent upload
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     authenticated: state.authenticated,
//   };
// };
// export default connect(mapStateToProps, reimbursementsAction)(Reimbursements);
export default Reimbursements;
