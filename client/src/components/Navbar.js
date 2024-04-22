import React, { useState, useEffect } from "react";
import logo from "../images/logo-ragatsewa.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract the pathname from the location object
    const { pathname } = location;
    // Set active link based on the current pathname
    setActiveLink(pathname);
  }, [location]);

  return (
    <div className='flex items-center justify-between my-3 mx-12'>
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='w-12' />
        <h1 className='text-lg font-bold'>Ragat Sewa</h1>
      </div>
      <div className='flex gap-12 items-center'>
        <Link to='/' className={activeLink === "/" ? 'active-link' : null}>
          Home
          {activeLink === "/" && <div className="underline"></div>}
        </Link>
        <Link to='/aboutus' className={activeLink === "/aboutus" ? 'active-link' : null}>
          About Us
          {activeLink === "/aboutus" && <div className="underline"></div>}
        </Link>
        <Link to='/donationevents' className={activeLink === "/donationevents" ? 'active-link' : null}>
          Events
          {activeLink === "/donationevents" && <div className="underline"></div>}
        </Link>
        <Link to='/requestblood' className={activeLink === "/requestblood" ? 'active-link' : null}>
          Request Blood
          {activeLink === "/requestblood" && <div className="underline"></div>}
        </Link>
        <Link to='/register' className={activeLink === "/register" ? 'active-link' : null}>
          Register Now
          {activeLink === "/register" && <div className="underline"></div>}
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

export default Navbar;
