import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllEventVolunteers } from "../../../apicalls/volunteers";
import { getDateformat } from "../../../utils/helper";

function EventVolunteers() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await GetAllEventVolunteers();
        dispatch(SetLoading(false));
        if (response.success) {
          const sortedData = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setData(sortedData);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
        dispatch(SetLoading(false));
      }
    };

    getData();
  }, [dispatch]);

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
      dataIndex: "title",
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      render: (text) => getDateformat(text),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
}

export default EventVolunteers;
