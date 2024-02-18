import React, { useEffect } from "react";
import Navbar from "./../../components/Navbar";
import { Form, Input, Radio, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import OrgHospistalForm from "./OrgHospistalForm";
import { RegisterUser } from "../../apicalls/users";

const Register = () => {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
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
      <Navbar />
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
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input
                  placeholder='Blood Group'
                  className='border rounded-sm py-1'
                />
              </Form.Item>
              <Form.Item
                label='Address'
                name='address'
                className='font-semibold'
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
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
                  {
                    required: true,
                    message: "Required",
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
                  {
                    required: true,
                    message: "Required",
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
