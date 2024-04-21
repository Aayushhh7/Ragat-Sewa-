import React, { useEffect } from "react";
import Nav from "./../../components/Nav";
import { Form, Input, Radio, Button, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import OrgHospistalForm from "./OrgHospistalForm";
import { RegisterUser } from "../../apicalls/users";
import { getAntdInputValidation } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";

const Register = () => {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className='flex justify-center items-center my-12'>
        <Form
          layout='vertical'
          className='border-1 border-primary-color rounded-sm shadow grid grid-cols-2 p-4 gap-x-7 gap-y-4 w-1/2'
          onFinish={onFinish}
        >
          <h1 className='col-span-2 uppercase text-2xl font-medium '>
            <span className='text-primary-color '>
              {type.toUpperCase()} - Registration
            </span>
            <hr />
          </h1>

          <Radio.Group
            onChange={(e) => setType(e.target.value)}
            value={type}
            className='col-span-2 font-semibold'
          >
            <Radio value='donor'>Donor</Radio>
            <Radio value='hospital'>Hospital</Radio>
            <Radio value='organization'>Organization</Radio>
          </Radio.Group>

          {type === "donor" && (
            <>
              {""}
              <Form.Item
                label='Name'
                name='name'
                className='font-semibold'
                rules={getAntdInputValidation()}
              >
                <Input
                  placeholder='Full Name'
                  className='border rounded-sm py-1'
                />
              </Form.Item>
              <Form.Item
                label='Phone'
                name='phone'
                className='font-semibold'
                rules={getAntdInputValidation()}
              >
                <Input
                  placeholder='Phone Number'
                  className='border rounded-sm py-1'
                />
              </Form.Item>
              <Form.Item
                label='Blood Group'
                name='bloodGroup'
                className='font-semibold'
                rules={getAntdInputValidation()}
              >
                <Select className='rounded-sm'>
                  <Option value='A+'>A+</Option>
                  <Option value='A-'>A-</Option>
                  <Option value='B+'>B+</Option>
                  <Option value='B-'>B-</Option>
                  <Option value='AB+'>AB+</Option>
                  <Option value='AB-'>AB-</Option>
                  <Option value='O+'>O+</Option>
                  <Option value='O-'>O-</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label='Address'
                name='address'
                className='font-semibold'
                rules={getAntdInputValidation()}
              >
                <Input
                  placeholder='Address'
                  className='border rounded-sm py-1'
                />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                className='font-semibold'
                rules={[
                  ...getAntdInputValidation(),
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder='Email' className='border rounded-sm py-1' />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                className='font-semibold'
                rules={[
                  ...getAntdInputValidation(),
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long!",
                  },
                ]}
              >
                <Input.Password
                  type='password'
                  placeholder='Password'
                  className='border rounded-sm py-1'
                />
              </Form.Item>
            </>
          )}

          {type !== "donor" && <OrgHospistalForm type={type} />}

          <Button
            type='primary'
            htmlType='submit'
            block
            className=' col-span-2 rounded bg-primary-color text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out '
          >
            Register
          </Button>
          <Link
            to='/login'
            className='col-span-2 text-center text-primary-color'
          >
            Already have an account? Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
