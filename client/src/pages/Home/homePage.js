import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import banner from "../../images/banner.png";
import donation from "../../images/donation.png";
import upcommingeventsIMG from "../../images/View Upcomming Events.png";
import { getLoggedInUserName } from "../../utils/helper";
import Navbar from "./../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  const { currentUser } = useSelector((state) => state.users);

  const bloodTypeData = [
    { type: "A+", donateTo: "A+ AB+", receiveFrom: "A+ A- O+ O-" },
    { type: "O+", donateTo: "O+ A+ B+ AB+", receiveFrom: "O+ O-" },
    { type: "B+", donateTo: "B+ AB+", receiveFrom: "B+ B- O+ O-" },
    { type: "AB+", donateTo: "AB+", receiveFrom: "Everyone" },
    { type: "A-", donateTo: "A+ A- AB+ AB-", receiveFrom: "A- O-" },
    { type: "O-", donateTo: "Everyone", receiveFrom: "O-" },
    { type: "B-", donateTo: "B+ B- AB+ AB-", receiveFrom: "B- O-" },
    { type: "AB-", donateTo: "AB+ AB-", receiveFrom: "AB- A- B- O-" },
  ];

  const columns = [
    {
      title: "Blood Type",
      dataIndex: "type",
      key: "type",
    },
    { title: "Donate Blood To", dataIndex: "donateTo", key: "donateTo" },
    {
      title: "Receive Blood From",
      dataIndex: "receiveFrom",
      key: "receiveFrom",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex justify-start my-3 mx-12">
        <div className="container mt-2">
          <span className="text-2xl font-semibold">
            {/* Welcome {getLoggedInUserName(currentUser)} */}
            {/* {currentUser.userType} */}
          </span>
          <div className="flex mt-3 justify-center border-b">
            <img src={banner} alt="banner" className="flex w-1/2" />
          </div>
          <h1 className="text-center text-primary-color font-medium text-2xl mt-2">
            Events
          </h1>
          <div className="flex mt-3 justify-center border-1 h-[13%] relative">
            <img
              src={upcommingeventsIMG}
              alt=""
              className="flex w-[100%]"
            />
            <a
              href="/donationevents"
              className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white text-center py-2 flex justify-center items-center hover:no-underline"
            >
              View Upcoming Events{" "}
              <span className="text-2xl ml-2">&#8594;</span>
            </a>
          </div>
          <h1 className="text-center text-primary-color font-medium text-2xl p-2">
            Learn About Blood Donation{" "}
          </h1>
          <div className="flex gap-8 border-b p-2">
            <img src={donation} className="w-1/2 h-96 mt-8" />
            <div className="flex flex-col justify-center w-full">
              <h1 className="text-white flex items-center justify-center bg-primary-color py-2">
                Compatible Blood Type Donors
              </h1>
              <Table
                dataSource={bloodTypeData}
                columns={columns}
                pagination={false}
                className="w-full py-2"
              />
            </div>
          </div>
          <h1 className="text-center text-primary-color font-medium text-2xl p-2">
            Types of Blood Donation
          </h1>
          <div className="h-[20%] mt-3">
            <p className="text-center leading-loose">
              Welcome to <strong>Ragat Sewa</strong>, where every drop counts in
              saving lives. Whether you're a first-time donor or a regular
              contributor, understanding the various types of blood donation can
              help you make an even more significant impact. We offer diverse
              donation options, each serving specific medical needs. Explore the
              different ways you can contribute and join us in the noble cause
              of giving the gift of life.
            </p>
            <p className="text-center p-3">
              The average human body contains about five liters of blood,
              which is made of several cellular and non-cellular components
              such as "<strong>Red Blood Cell</strong>,{" "}
              <strong>Platelet</strong>, and <strong>Plasma</strong>
            </p>
            <p className="text-center p-3">
              Each type of component has its unique properties and can be
              used for different indications. The donated blood is separated
              into these components by the blood centre and one donated unit
              can save upto four lives depending on the number of components
              separated from your blood.
            </p>
            <ul className="text-left list-disc ml-6">
              <li className="mb-4">
                <strong>Whole Blood Donation:</strong> Give a pint of blood
                containing red cells, plasma, and platelets. Crucial for various
                medical treatments and surgeries.
              </li>
              <li className="mb-4">
                <strong>Platelet Donation (Plateletpheresis):</strong> Targeted
                impact for cancer patients and those in chemotherapy. Advanced
                technology ensures a direct contribution to those in need.
              </li>
              <li className="mb-4">
                <strong>Plasma Donation (Plasmapheresis):</strong> Contribute
                the "liquid gold" of blood—plasma. Essential for clotting and
                protein transport, aiding patients with various medical
                conditions.
              </li>
              <li className="mb-4">
                <strong>
                  Double Red Cell Donation (Double Red Cell Apheresis):
                </strong>{" "}
                Maximize red blood cell impact by collecting a larger volume
                while supporting patients with specific medical conditions.
              </li>
              <li className="mb-4">
                <strong>Autologous and Directed Donation:</strong> Personalize
                your contribution by donating for your future use or supporting
                a loved one. These options cater to specific medical needs,
                offering a unique way to make a difference.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
