import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import { Form, Input, Radio, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helper";

const Login = () => {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await LoginUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
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
          className='border-1 border-primary-color rounded-sm shadow grid p-4 gap-x-7 gap-y-4 w-1/3'
          onFinish={onFinish}
        >
          <h1 className=' uppercase text-2xl font-medium '>
            <span className='text-primary-color '>
              {type.toUpperCase()} - Login
            </span>
            <hr />
          </h1>

          <Radio.Group
            onChange={(e) => setType(e.target.value)}
            value={type}
            className=' font-semibold'
          >
            <Radio value='donor'>Donor</Radio>
            <Radio value='hospital'>Hospital</Radio>
            <Radio value='organization'>Organization</Radio>
          </Radio.Group>

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
            <Input.Password
              type='password'
              placeholder='Password'
              className='border rounded-sm py-1'
            />
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            block
            className='  rounded bg-primary-color text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out '
          >
            Login
          </Button>
          <Link to='/register' className=' text-center text-primary-color'>
            Don't have an account? Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
