import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { sendBloodDonationRequest } from "../../apicalls/emailBoardcasting";
import Navbar from "./../../components/Navbar";
import banner from "../../images/image1.png";
import banner2 from "../../images/image2.jpg";
import { getAntdInputValidation } from "../../utils/helper";

const { Option } = Select;
function BloodDonationForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await sendBloodDonationRequest(values);
      message.success("Blood donation request sent successfully!");
    } catch (error) {
      console.error("Error sending blood donation request:", error);
      message.error(
        "Failed to send blood donation request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex mt-3 justify-center'>
        <img src={banner} alt='banner' className='flex w-[92%] h-56' />
      </div>
      <div className='flex mt-2 justify-center'>
        <img src={banner2} alt='banner' className='flex h-28' />
      </div>
      <div className='flex justify-center items-center my-2'>
        <Form
          layout='vertical'
          className='border-1 border-primary-color rounded-sm shadow grid p-4 gap-x-7 gap-y-4 w-1/3'
          onFinish={onFinish}
          initialValues={{ date: null, time: null }}
        >
          <h1 className=' uppercase text-2xl font-medium '>
            <span className='text-primary-color '>REQUEST BLOOD</span>
            <hr />
          </h1>
          <Form.Item
            name='bloodGroup'
            label='Blood Group'
            className='font-semibold'
            rules={getAntdInputValidation()}
          >
            <Select
              className='rounded-sm shadow-none'
              placeholder='Blood Group'
            >
              <Option value='A+'>A+</Option>
              <Option value='A-'>A-</Option>
              <Option value='B+'>B+</Option>
              <Option value='B-'>B-</Option>
              <Option value='AB+'>AB+</Option>
              <Option value='AB-'>AB-</Option>
              <Option value='O+'>O+</Option>
              <Option value='O-'>O-</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='date'
            label='Date'
            className='font-semibold'
            rules={getAntdInputValidation()}
          >
            <DatePicker format='YYYY-MM-DD ddd' showToday />
          </Form.Item>
          <Form.Item
            name='time'
            label='Time'
            className='font-semibold'
            rules={getAntdInputValidation()}
          >
            <Select className='rounded-sm shadow-none' placeholder='Time'>
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
            name='contactNumber'
            label='Contact Number'
            className='font-semibold'
            rules={getAntdInputValidation()}
          >
            <Input
              placeholder='Contact Number'
              className='rounded-sm shadow-none'
            />
          </Form.Item>
          <Form.Item
            name='location'
            label='Location'
            className='font-semibold'
            rules={getAntdInputValidation()}
          >
            <Input placeholder='Location' className='rounded-sm shadow-none' />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              className=' rounded bg-primary-color text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out '
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default BloodDonationForm;
