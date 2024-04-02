import { Button, Table, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { GetEvent } from "../../../apicalls/events";
import { SetLoading } from "../../../redux/loadersSlice";
import EventForm from "./EventForm";
import { render } from "@testing-library/react";

function Event() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  // Define columns for the table
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
  ];

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetEvent();
      console.log(response); // Log the entire response object
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
          Post Events
        </Button>
      </div>
      {/* Render the Table component with data and columns */}
      <Table dataSource={data} columns={columns} className='mt-3' />
      {open && <EventForm open={open} setOpen={setOpen} reloadData={getData} />}
    </div>
  );
}

export default Event;
