import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";

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
      <div className='flex '>
        {/* Home Page Content */}
        <div className='container mt-2'>
          <h2 className='text-2xl font-semibold mb-4'>
            Welcome to Ragat Sewa Blood Bank Management
          </h2>
          <div className='flex ml-auto bg-primary-color h-10'>
            <div className='flex items-center text-white font-bold'>
              <h1>Compatible Blood Type Donors</h1>
            </div>
          </div>
          <div className='flex justify-end'>
            <Table
              dataSource={bloodTypeData}
              columns={columns}
              pagination={false}
              className='mt-1'
            />
          </div>
          {/* Add more content or components as needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
