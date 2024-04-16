import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import ragatsewaLogo from "../images/logo-ragatsewa.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <img src={ragatsewaLogo} alt="Ragat Sewa Logo" className="h-10 mb-4" />
          <p className="mb-2">Got Question? Call us on</p>
          <p className="mb-2">+977-9806073373</p>
          <p className="mb-2">ragatsewa@gmail.com</p>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="font-medium mb-4">Company</h2>
          <div className="flex flex-col gap-2">
            <Link to="/aboutus" className="hover:text-blue-400">About Us</Link>
            <p>Advertise With Us</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="font-medium mb-4">Category</h2>
          <div className="flex flex-col gap-2">
            <p>Mobile Phone</p>
            <p>Laptop</p>
            <p>Motorcycle</p>
            <p>Car</p>
            <p>Gaming</p>
            <p>Home Appliance</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="font-medium mb-4">Follow Us</h2>
          <div className="flex items-center gap-4">
            <BsFacebook className="social" size={22} />
            <BsInstagram className="social" size={22} />
            <BsTwitter className="social" size={22} />
            <BsLinkedin className="social" size={22} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
