import { Button, Checkbox, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

/*
Cách copy component:
1: import
2: nội dung bên ngoài component
3: nội dung bên trong  component

*/

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

export default function Register() {
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);
  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return (
    <div className="container">
      <Form form={form} name="dynamic_rule" className='container'>
        <h3>Register</h3>
        <br />
        <div className="row">
          <div className="col-6">
            <Form.Item
              {...formItemLayout}
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Email is not valid',
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                },
              ]}
            >
              <Input placeholder="Please input your email" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}
            >
              <Input placeholder="Please input your password" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="passwordConfirm"
              label="PasswordConfirm"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input placeholder="Please input your passwordConfirm" />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              {...formItemLayout}
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name',
                },
              ]}
            >
              <Input placeholder="Please input your name" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone',
                },
              ]}
            >
              <Input placeholder="Please input your phone" />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please check an item:' }]}>
              <Radio.Group>
                <Radio value={true}>Male</Radio>
                <Radio value={false}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  onClick={onCheck}
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                 Register
                </Button>
              )}
            </Form.Item>
          </div>
        </div>

      </Form>
    </div>

  );
}
