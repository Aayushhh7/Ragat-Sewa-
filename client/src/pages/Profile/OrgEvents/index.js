import { Button, Table, message, Popconfirm } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GetEventsByOrganization, DeleteEvent } from "../../../apicalls/events";
import { SetLoading } from "../../../redux/loadersSlice";
import EventForm from "./EventForm";
import { getDateformat } from "./../../../utils/helper";

function Event() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetEventsByOrganization();
      console.log(response); // Log the entire response object
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

  const handleEdit = (record) => {
    setOpen(true);
    setInitialValues(record);
  };

  const handleDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteEvent(id);
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
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Event Time",
      dataIndex: "eventTime",
      key: "eventTime",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Event Venue",
      dataIndex: "eventVenue",
      key: "eventVenue",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Posted Date",
      dataIndex: "createdAt",
      key: "timestamp",
      render: (text) => getDateformat(text),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            block
            className="rounded bg-primary-color text-white mb-2"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this event?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { backgroundColor: "#6a0b37" } }}
          >
            <Button
              type="secondary"
              block
              className="rounded bg-secondary text-white"
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
      <div className="flex justify-end">
        <Button type="default" onClick={() => setOpen(true)}>
          Post Event
        </Button>
      </div>
      <Table dataSource={data} columns={columns} className="mt-3" />
      {open && (
        <EventForm
          open={open}
          setOpen={setOpen}
          initialValues={initialValues}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Event;
