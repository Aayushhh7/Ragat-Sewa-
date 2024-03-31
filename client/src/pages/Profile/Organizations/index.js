import React from "react";
import {
  GetAllOrganizationofDonor,
  GetAllOrganizationofHospital,
} from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { Table, message } from "antd";
import { getDateformat } from "../../../utils/helper";

function Organizations({ userType }) {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (userType === "hospital") {
        response = await GetAllOrganizationofHospital();
      } else {
        response = await GetAllOrganizationofDonor();
      }
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
      title: "Organization Name",
      dataIndex: "organizationName",
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

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} className='mt-3' />
    </div>
  );
}

export default Organizations;
