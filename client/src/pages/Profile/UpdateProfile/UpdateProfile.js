import React, { useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser, UpdateUser } from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";

const { Option } = Select;

function UpdateProfile() {
  const { currentUser } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await GetCurrentUser();
        dispatch(SetLoading(false));
        if (response.success) {
          form.setFieldsValue(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        dispatch(SetLoading(false));
        message.error(error.message);
      }
    };

    fetchCurrentUser();
  }, [dispatch, form]);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateUser(values);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success("Profile updated successfully");
        navigate("/profile");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div className='update-profile-container'>
      <h1 className='text-2xl font-bold text-center mb-8'>Update Profile</h1>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={currentUser}
        className='flex flex-col gap-3'
      >
        {currentUser.userType === "donor" && (
          <>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder='Full Name' />
            </Form.Item>
            <Form.Item
              name='bloodGroup'
              label='Blood Group'
              rules={[{ required: true, message: "Blood Group is required" }]}
            >
              <Select placeholder='Select Blood Group'>
                <Option value='O+'>O+</Option>
                <Option value='O-'>O-</Option>
                <Option value='A+'>A+</Option>
                <Option value='A-'>A-</Option>
                <Option value='B+'>B+</Option>
                <Option value='B-'>B-</Option>
                <Option value='AB+'>AB+</Option>
                <Option value='AB-'>AB-</Option>
              </Select>
            </Form.Item>
          </>
        )}
        {currentUser.userType === "organization" && (
          <>
            <Form.Item
              name='organizationName'
              label='Organization Name'
              rules={[
                { required: true, message: "Organization Name is required" },
              ]}
            >
              <Input placeholder='Organization Name' />
            </Form.Item>
            <Form.Item
              name='website'
              label='Website'
              rules={[{ required: true, message: "Website is required" }]}
            >
              <Input placeholder='Website' />
            </Form.Item>
          </>
        )}
        {currentUser.userType === "hospital" && (
          <>
            <Form.Item
              name='hospitalName'
              label='Hospital Name'
              rules={[{ required: true, message: "Hospital Name is required" }]}
            >
              <Input placeholder='Hospital Name' />
            </Form.Item>
            <Form.Item
              name='website'
              label='Website'
              rules={[{ required: true, message: "Website is required" }]}
            >
              <Input placeholder='Website' />
            </Form.Item>
          </>
        )}
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder='Email' disabled />
        </Form.Item>
        <Form.Item
          name='address'
          label='Address'
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input placeholder='Address' />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Phone'
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input placeholder='Phone Number' />
        </Form.Item>
        <Form.Item>
        <Button
            type='primary'
            htmlType='submit'
            className='rounded bg-primary-color text-white  active:scale-[.98] active:duration-75 transition-all ease-in-out '
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UpdateProfile;
