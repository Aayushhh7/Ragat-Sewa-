import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllEventVolunteers } from "../../../apicalls/volunteers"; // Import the API function to fetch event volunteers
import { getDateformat } from "../../../utils/helper";

function EventVolunteers() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllEventVolunteers();
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      render: (text) => getDateformat(text),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Event Volunteers</h1>
      <Table columns={columns} dataSource={data} className='mt-3' />
    </div>
  );
}

export default EventVolunteers;
