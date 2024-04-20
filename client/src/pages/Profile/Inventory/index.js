import React, { useState, useEffect } from "react";
import { Button, Table, message, Popconfirm } from "antd";
import InventoryForm from "./InventoryForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetInventory, DeleteInventory } from "../../../apicalls/inventory";
import { getDateformat } from "../../../utils/helper"; 

function Inventory() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

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

  const handleEdit = (record) => {
    setOpen(true);
    setInitialValues(record);
  };

  const handleDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteInventory(id);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        getData();
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
          return record.hospital.hospitalName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateformat(text),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <span>
          <Button
            type='primary'
            block
            className='rounded bg-primary-color text-white mb-2'
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>{" "}
          <Popconfirm
            title='Are you sure you want to delete this inventory item?'
            onConfirm={() => handleDelete(record._id)}
            okText='Yes'
            cancelText='No'
            okButtonProps={{ style: { backgroundColor: "#6a0b37" } }}
          >
            <Button
              type='secondary'
              block
              className='rounded bg-secondary text-white'
            >
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-end'>
        <Button type='default' onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className='mt-3'
      />
      {open && (
        <InventoryForm
          open={open}
          setOpen={setOpen}
          initialValues={initialValues}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Inventory;
