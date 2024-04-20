import React from "react";
import logo from "../images/logo-ragatsewa.png";

const Footer = () => {
  return (
    <footer className='bg-gray-200 py-4'>
      <div className='container mx-auto flex items-center justify-center flex-wrap'>
        <div className='text-gray-600 mr-2'>
          &copy; {new Date().getFullYear()} Ragat Sewa
        </div>
        <div className='ragatsewa'>
          <img src={logo} alt='logo' className='w-8' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
