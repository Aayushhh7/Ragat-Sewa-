import React, { useState, useEffect } from "react";
import { Modal, Form, Button, message, Select, Input, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { PostEvent, UpdateEvent } from "../../../apicalls/events";
import { getAntdInputValidation } from "../../../utils/helper";
import dayjs from "dayjs";
import moment from "moment";

function EventForm({ open, setOpen, initialValues, reloadData }) {
  const [form] = Form.useForm();
  const [eventTime, setEventTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setEventTime(initialValues.eventTime);
      setSelectedDate(
        dayjs(initialValues.eventDate, "YYYY-MM-DD ddd").format(
          "YYYY-MM-DD"
        )
      );
      setSelectedDay(
        dayjs(initialValues.eventDate, "YYYY-MM-DD ddd").format("dddd")
      );
    }
  }, [initialValues]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setSelectedDay(dayjs(dateString).format("dddd"));
  };

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));

      const formattedValues = {
        ...values,
        eventDate: selectedDate + " " + selectedDay, // Concatenate date and day
        eventTime,
      };

      const response = initialValues
        ? await UpdateEvent(initialValues._id, formattedValues)
        : await PostEvent(formattedValues);

      dispatch(SetLoading(false));

      if (response.success) {
        message.success(response.message);
        reloadData();
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
      title={initialValues ? "EDIT EVENT" : "ADD EVENT"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key='cancel' onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          htmlType='submit'
          className='rounded bg-primary-color text-white  active:scale-[.98] active:duration-75 transition-all ease-in-out '
          onClick={() => form.submit()}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        layout='vertical'
        className='flex flex-col gap-3'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='eventName'
          label='Event Name'
          rules={getAntdInputValidation()}
        >
          <Input placeholder='Event Name' />
        </Form.Item>

        <Form.Item
          name='eventVenue'
          label='Event Venue'
          rules={getAntdInputValidation()}
        >
          <Input placeholder='Event Venue' />
        </Form.Item>

        <Form.Item
          name='contact'
          label='Contact Number'
          rules={getAntdInputValidation()}
        >
          <Input placeholder='Contact Number' />
        </Form.Item>

        <Form.Item label='Event Date' rules={getAntdInputValidation()}>
          <DatePicker value={selectedDate ? moment(selectedDate, 'YYYY-MM-DD') : null} onChange={handleDateChange} />
          <div>Day: {selectedDay}</div>
        </Form.Item>

        <Form.Item
          name='eventTime'
          label='Event Time'
          rules={getAntdInputValidation()}
        >
          <Select onChange={(value) => setEventTime(value)}>
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
          rules={getAntdInputValidation()}
        >
          <Input.TextArea placeholder='Event Description' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EventForm;
