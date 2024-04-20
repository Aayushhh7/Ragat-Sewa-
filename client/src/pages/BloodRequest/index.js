import React from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { sendBloodDonationRequest } from "../../apicalls/emailBoardcasting";
import banner from "../../images/image1.png";
import banner2 from "../../images/image2.jpg";
import { getAntdInputValidation } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import Footer from "../../components/Footer";

const { Option } = Select;

function BloodDonationForm() {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      await sendBloodDonationRequest(values);
      message.success("Blood donation request sent successfully!");
    } catch (error) {
      console.error("Error sending blood donation request:", error);
      message.error(
        "Failed to send blood donation request. Please try again later."
      );
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
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
          <h1 className='uppercase text-2xl font-medium '>
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
            name='requestEmail'
            label='Email'
            className='font-semibold'
            rules={getAntdInputValidation()}
          >
            <Input placeholder='Email' className='rounded-sm shadow-none' />
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
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer/>
    </div>
  );
}

export default BloodDonationForm;
