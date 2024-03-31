import React, { useState } from "react";
import axios from "axios";
import { Form, Input, DatePicker, TimePicker, Button, message } from "antd";

function BloodRequest() {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      const response = await axios.post("/api/send-email", formData);
      console.log(response.data);
      message.success("Blood donation request submitted successfully.");
    } catch (error) {
      console.error("Error:", error);
      message.error(
        "Failed to submit blood donation request. Please try again."
      );
    }
  };

  // Basic form validation function
  const validateForm = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      const newErrors = {};
      error.errorFields.forEach((field) => {
        newErrors[field.name[0]] = field.errors[0];
      });
      setErrors(newErrors);
      return false;
    }
  };

  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit}>
      <Form.Item
        label='Blood Group'
        name='bloodGroup'
        rules={[{ required: true, message: "Blood Group is required" }]}
      >
        <Input placeholder='Blood Group' />
      </Form.Item>
      {errors.bloodGroup && (
        <span className='error-message'>{errors.bloodGroup}</span>
      )}
      <Form.Item
        label='Date'
        name='date'
        rules={[{ required: true, message: "Date is required" }]}
      >
        <DatePicker />
      </Form.Item>
      {errors.date && <span className='error-message'>{errors.date}</span>}
      <Form.Item
        label='Time'
        name='time'
        rules={[{ required: true, message: "Time is required" }]}
      >
        <TimePicker />
      </Form.Item>
      {errors.time && <span className='error-message'>{errors.time}</span>}
      <Form.Item
        label='Location'
        name='location'
        rules={[{ required: true, message: "Location is required" }]}
      >
        <Input placeholder='Location' />
      </Form.Item>
      {errors.location && (
        <span className='error-message'>{errors.location}</span>
      )}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BloodRequest;
