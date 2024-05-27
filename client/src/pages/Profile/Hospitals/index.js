import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { GetAllHospitalsOfOrganization } from "../../../apicalls/users";
import { getDateformat } from "../../../utils/helper";

function Hospitals() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllHospitalsOfOrganization();
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
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Hospital Name",
      dataIndex: "hospitalName",
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Created At",
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

export default Hospitals;
