import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { PostEvent } from "../../../apicalls/events";

const { Option } = Select;
function EventForm({ open, setOpen, reloadData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));

      const formattedValues = {
        ...values,
        eventDate: values.eventDate.format("YYYY-MM-DD ddd"),
        organization: currentUser._id,
      };

      const response = await PostEvent(formattedValues);

      dispatch(SetLoading(false));
      if (response.success) {
        reloadData();
        message.success("Event Posted Successfully");
        setOpen(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      title='POST EVENT'
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        form.submit();
      }}
      centered
      okButtonProps={{ style: { backgroundColor: "#6a0b37" } }}
    >
      <Form
        layout='vertical'
        className='flex flex-col gap-2'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='eventName'
          label='Event Name'
          rules={[{ required: true, message: "Please enter event name!" }]}
        >
          <Input placeholder='Event Name' className='rounded-sm shadow-none' />
        </Form.Item>

        <Form.Item
          name='eventVenue'
          label='Event Venue'
          rules={[{ required: true, message: "Please enter event venue!" }]}
        >
          <Input placeholder='Event Venue' className='rounded-sm shadow-none' />
        </Form.Item>
        <Form.Item
          name='contact'
          label='Contact Number'
          rules={[{ required: true, message: "Please enter event venue!" }]}
        >
          <Input
            placeholder='Contact Number'
            className='rounded-sm shadow-none'
          />
        </Form.Item>

        <Form.Item
          name='eventDate'
          label='Event Date'
          rules={[{ required: true, message: "Please enter event date!" }]}
        >
          <DatePicker format='YYYY-MM-DD ddd' showToday />
        </Form.Item>
        <Form.Item
          name='eventTime'
          label='Event Time'
          rules={[{ required: true, message: "Please enter event time!" }]}
        >
          <Select className='rounded-sm'>
            <Option value='00:00'>12:00 AM</Option>
            <Option value='01:00'>1:00 AM</Option>
            <Option value='02:00'>2:00 AM</Option>
            <Option value='03:00'>3:00 AM</Option>
            <Option value='04:00'>4:00 AM</Option>
            <Option value='05:00'>5:00 AM</Option>
            <Option value='06:00'>6:00 AM</Option>
            <Option value='07:00'>7:00 AM</Option>
            <Option value='08:00'>8:00 AM</Option>
            <Option value='09:00'>9:00 AM</Option>
            <Option value='10:00'>10:00 AM</Option>
            <Option value='11:00'>11:00 AM</Option>
            <Option value='12:00'>12:00 PM</Option>
            <Option value='13:00'>1:00 PM</Option>
            <Option value='14:00'>2:00 PM</Option>
            <Option value='15:00'>3:00 PM</Option>
            <Option value='16:00'>4:00 PM</Option>
            <Option value='17:00'>5:00 PM</Option>
            <Option value='18:00'>6:00 PM</Option>
            <Option value='19:00'>7:00 PM</Option>
            <Option value='20:00'>8:00 PM</Option>
            <Option value='21:00'>9:00 PM</Option>
            <Option value='22:00'>10:00 PM</Option>
            <Option value='23:00'>11:00 PM</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='description'
          label='Event Description'
          rules={[{ required: true, message: "Please enter Description!" }]}
        >
          <Input.TextArea
            className='flex h-20 rounded-sm shadow-none'
            placeholder='Event Description'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EventForm;
