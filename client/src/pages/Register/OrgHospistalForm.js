import React from "react";
import { Form, Input } from "antd";

const OrgHospistalForm = ({ type }) => {
  return (
    <>
      <Form.Item
        label={type === "hospital" ? "Hospital Name" : "Organization Name"}
        name={type === "hospital" ? "hospitalName" : "organizationName"}
        className='font-semibold'
      >
        <Input placeholder='Name' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item label='Phone' name='phone' className='font-semibold'>
        <Input placeholder='Phone Number' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item label='Email' name='email' className='font-semibold'>
        <Input placeholder='Email' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item label='Password' name='password' className='font-semibold'>
        <Input placeholder='Password' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item label='Website' name='website' className='font-semibold'>
        <Input placeholder='Website' className='border rounded-sm py-1' />
      </Form.Item>
      <Form.Item label='Address' name='address' className='font-semibold'>
        <Input placeholder='Address' className='border rounded-sm py-1' />
      </Form.Item>
    </>
  );
};

export default OrgHospistalForm;
