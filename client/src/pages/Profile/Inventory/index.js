import { Button, Table, message } from "antd";
import React from "react";
import InventoryForm from "./InventoryForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetInventory } from "../../../apicalls/inventory";
import { render } from "@testing-library/react";
import { getDateformat } from "../../../utils/helper";

function Inventory() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
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
      render: (text, record) => {
        if (record.inventoryType === "in") {
          return record.donor.name;
        } else {
          return record.hospital.name;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "Created At",
      render: (text) => getDateformat()
    },
  ];

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventory();
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

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='flex justify-end'>
        <Button type='default' onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>
      <Table columns={columns} dataSource={data} 
      className="mt-3"
      />
      {open && <InventoryForm open={open} setOpen={setOpen} />}
    </div>
  );
}

export default Inventory;
