import React from "react";
import logo from "../images/logo-ragatsewa.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
        <Link to='/register' className='hover:underline underline-offset-4'>
          Register Now
        </Link>

        <Button
          type='primary'
          className='w-24 font-medium bg-primary-color'
          href='/login'
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default navbar;
