import React from "react";
import { Form, Input, Button, message } from "antd";
import { createVolunteerRegistration } from "../../apicalls/volunteers";
import { SetLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

function VolunteerRegistrationForm({ title, eventId, closeModal }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
console.log(title)
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true)); // Dispatch the action to set loading to true
      // Submit volunteer registration data to the backend
      const response = await createVolunteerRegistration({
        ...values,
        eventId: eventId,
        title: title,
      });
      dispatch(SetLoading(false)); // Dispatch the action to set loading to false
      if (response.success) {
        message.success("Volunteer registration successful");
        form.resetFields();
        closeModal();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error submitting volunteer registration:", error);
      message.error("Failed to submit volunteer registration"); // Display error message
      dispatch(SetLoading(false)); // Dispatch the action to set loading to false
    }
  };

  return (
    <Form
      layout='vertical'
      className='flex flex-col gap-2'
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name='name'
        label='Name'
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='Email'
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Phone'
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='rounded bg-primary-color text-white  active:scale-[.98] active:duration-75 transition-all ease-in-out '
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default VolunteerRegistrationForm;
