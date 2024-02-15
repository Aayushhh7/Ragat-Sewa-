import React from "react";
import logo from "../images/logo-ragatsewa.png";
import { Link } from "react-router-dom";
import { Dropdown, Space, Button } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";

const items = [
  {
    key: "1",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.antgroup.com'
      >
        Register as a individual
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.aliyun.com'
      >
        Register as a hospital
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.luohanacademy.com'
      >
        Register as a Organization
      </a>
    ),
  },
];

const navbar = () => {
  return (
    <div className='flex items-center justify-between my-3 mx-12'>
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='w-12' />
        <h1 className='text-lg font-bold'>Ragat Sewa</h1>
      </div>
      <div className='flex gap-12 items-center'>
        <Link to='/' className='hover:underline underline-offset-4'>
          Home
        </Link>
        <Link to='/aboutus' className='hover:underline underline-offset-4'>
          About Us
        </Link>
        <Link to='/requestblood' className='hover:underline underline-offset-4'>
          Request Blood
        </Link>
        <Dropdown
          menu={{
            items,
          }}
          className='cursor-pointer'
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className='flex gap-0'>
              Register Now
              <RiArrowDropDownLine size={24} />
            </Space>
          </a>
        </Dropdown>
        <Button type='primary' className='w-24 font-medium bg-primary-color'>
          Login
        </Button>
      </div>
    </div>
  );
};

export default navbar;
