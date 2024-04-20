import React, { useState, useEffect } from "react";
import { Modal, Form, Button, message, Select, Input } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { PostEvent, UpdateEvent } from "../../../apicalls/events";
import { getAntdInputValidation } from "../../../utils/helper";
import dayjs from "dayjs";

function EventForm({ open, setOpen, initialValues, reloadData }) {
  const [form] = Form.useForm();
  const [eventTime, setEventTime] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setEventTime(initialValues.eventTime);
    }
  }, [initialValues]);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));

      let formattedDate = null;
      if (values.eventDate) {
        // Parse the date using dayjs and check if it's a valid date
        const parsedDate = dayjs(values.eventDate, "YYYY-MM-DD ddd", true);
        if (parsedDate.isValid()) {
          // If the date is valid, format it as desired
          formattedDate = parsedDate.format("YYYY-MM-DD ddd");
        } else {
          // If the date is invalid, throw an error
          throw new Error("Invalid event date");
        }
      }

      const formattedValues = {
        ...values,
        eventDate: formattedDate,
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
      visible={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key='cancel' onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={() => form.submit()}>
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

        <Form.Item
          name='eventDate'
          label='Event Date'
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve(); // Allow empty value
                }
                // Validate the date format using dayjs
                const parsedDate = dayjs(value, "YYYY-MM-DD ddd", true);
                if (parsedDate.isValid()) {
                  return Promise.resolve(); // Valid date
                }
                return Promise.reject("Invalid date format (YYYY-MM-DD ddd)");
              },
            },
          ]}
        >
          <Input placeholder='YYYY-MM-DD ddd' />
        </Form.Item>

        <Form.Item
          name='eventTime'
          label='Event Time'
          rules={getAntdInputValidation()}
        >
          <Select onChange={(value) => setEventTime(value)}>
            {/* Options for event time */}
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
