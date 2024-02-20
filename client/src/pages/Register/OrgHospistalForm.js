import React from "react";
import { Form, Input } from "antd";
import { getAntdInputValidation } from "../../utils/helper";

const OrgHospistalForm = ({ type }) => {
  return (
    <>
      <Form.Item
        label={type === "hospital" ? "Hospital Name" : "Organization Name"}
        name={type === "hospital" ? "hospitalName" : "organizationName"}
        className='font-semibold'
        rules={getAntdInputValidation()}
      >
        <Input placeholder='Name' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item
        label='Phone'
        name='phone'
        className='font-semibold'
        rules={getAntdInputValidation()}
      >
        <Input placeholder='Phone Number' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        className='font-semibold'
        rules={getAntdInputValidation()}
      >
        <Input placeholder='Email' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        className='font-semibold'
        rules={getAntdInputValidation()}
      >
        <Input placeholder='Password' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item
        label='Website'
        name='website'
        className='font-semibold'
        rules={getAntdInputValidation()}
      >
        <Input placeholder='Website' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item
        label='Address'
        name='address'
        className='font-semibold'
        rules={getAntdInputValidation()}
      >
        <Input placeholder='Address' className='border rounded-sm py-1' />
      </Form.Item>
    </>
  );
};

export default OrgHospistalForm;
