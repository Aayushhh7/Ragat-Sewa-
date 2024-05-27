import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { ChangePassword } from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";

function ChangePasswords() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await ChangePassword(values);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success("Password changed successfully");
        form.resetFields();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div className='change-password-container'>
      <h1 className='text-2xl font-bold text-center mb-8'>Change Password</h1>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        className='flex flex-col gap-3'
      >
        <Form.Item
          name='currentPassword'
          label='Current Password'
          rules={[{ required: true, message: "Current password is required" }]}
        >
          <Input.Password placeholder='Current Password' />
        </Form.Item>
        <Form.Item
          name='newPassword'
          label='New Password'
          rules={[
            { required: true, message: "New password is required" },
            { min: 8, message: "Password must be at least 8 characters long" },
          ]}
        >
          <Input.Password placeholder='New Password' />
        </Form.Item>
        <Form.Item
          name='confirmNewPassword'
          label='Confirm New Password'
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm New Password' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='rounded bg-primary-color text-white  active:scale-[.98] active:duration-75 transition-all ease-in-out '
            block
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePasswords;
