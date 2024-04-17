import React from "react";
import logo from "../images/logo-ragatsewa.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Nav = () => {
  return (
    <div className='flex items-center justify-between my-3 mx-12'>
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='w-12' />
        <Link
          to='/'
          className='hover:underline underline-offset-4 text-lg font-bold'
        >
          Ragat Sewa
        </Link>
      </div>
    </div>
  );
};

export default Nav;
