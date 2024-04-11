import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import { GetInventorywithFilters } from "../apicalls/inventory";
import { getDateformat } from "../utils/helper";
import { SetLoading } from "../redux/loadersSlice";

function InventoryTable({ filters, userType }) {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity of Blood",
      dataIndex: "quantityofBlood",
      render: (text) => text + " ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => record.organization?.organizationName,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateformat(text),
    },
  ];

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventorywithFilters(filters);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} className='mt-3' />
    </div>
  );
}

export default InventoryTable;
