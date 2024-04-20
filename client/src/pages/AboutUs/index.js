import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Footer from "../../components/Footer";
const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto px-5 py-8'>
        <h1 className='text-3xl font-semibold mb-4'>About Ragat Sewa</h1>
        <p className='text-lg mb-4'>
          Ragat Sewa is a platform dedicated to facilitating blood donation
          requests and connecting donors with those in need of blood. Our goal
          is to make the process of organizing blood donation events and finding
          blood donors as seamless as possible.
        </p>
        <p className='text-lg mb-4'>
          We believe in the power of community and the importance of coming
          together to support one another in times of need. With Ragat Sewa,
          users can create and manage blood donation events, search for
          available blood donors, and express their interest in donating blood
          to help save lives.
        </p>
        <p className='text-lg mb-4'>
          Our mission is to make blood donation more accessible and efficient,
          ultimately contributing to the well-being of individuals and
          communities.
        </p>
        <Link
          to='/requestblood'
          className='text-2xl font-semibold mb-2 block hover:underline'
        >
          Events
        </Link>
        <p className='text-lg mb-4'>
          Ragat Sewa hosts various blood donation events throughout the year.
          These events provide opportunities for individuals to donate blood and
          contribute to saving lives in their communities.
        </p>
        <Link
          to='/requestblood'
          className='text-2xl font-semibold mb-2 block hover:underline'
        >
          Blood Requests
        </Link>
        <p className='text-lg mb-4'>
          Individuals in need of blood can submit blood donation requests
          through Ragat Sewa. These requests are then shared with registered
          donors who may be able to provide the required blood type.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>
          Blood Inventory Management
        </h2>
        <p className='text-lg mb-4'>
          Ragat Sewa provides a comprehensive blood inventory management system,
          allowing organizations to track and manage blood supplies efficiently.
          Users can monitor donation history, ensuring that blood supplies are
          adequately stocked and utilized.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>
          Volunteer Registration for Events
        </h2>
        <p className='text-lg mb-4'>
          Ragat Sewa facilitates volunteer registration for blood donation
          events, allowing individuals to sign up and participate in upcoming
          donation drives. Volunteers can easily register, view event details,
          and contribute to organizing successful blood donation campaigns in
          their communities.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>
          Organization Event Posting
        </h2>
        <p className='text-lg mb-4'>
          Organizations can leverage Ragat Sewa to post and manage blood
          donation events. They can create event listings, specify details such
          as date, time, and location, and reach out to potential donors to
          participate in their organized blood donation initiatives. This
          feature streamlines the process of event organization and helps
          organizations maximize participation and impact.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>Contact Us</h2>
        <p className='text-lg mb-4'>
          If you have any questions, suggestions, or feedback, please feel free
          to reach out to us at:
        </p>
        <p className='text-lg'>Email: ragatsewa@gmail.com</p>
        <p className='text-lg'>Phone: +977 9806073373</p>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
