import { Modal, Form, Radio, Input, Select, message } from "antd";
import React, { useState } from "react";
import { getAntdInputValidation } from "../../../utils/helper";
import { SetLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddInventory } from "../../../apicalls/inventory";

const { Option } = Select;

function InventoryForm({ open, setOpen, selectedProduct, reloadData }) {
  const { currentUser } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [inventoryType, setInventoryType] = useState("in");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));

      const response = await AddInventory({
        ...values,
        inventoryType,
        organization: currentUser._id,
      });

      dispatch(SetLoading(false));
      if (response.success) {
        reloadData();
        message.success("Inventory Added Successfully");
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
      title='ADD INVENTORY'
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
        className='flex flex-col gap-3'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label='Inventory Type'>
          <Radio.Group
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <Radio value='in'>In</Radio>
            <Radio value='out'>Out</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Blood Group'
          name='bloodGroup'
          rules={getAntdInputValidation()}
        >
          <Select className='rounded-sm'>
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
          label={inventoryType === "in" ? "Donor Email" : "Hospital Email"}
          name='email'
          rules={getAntdInputValidation()}
        >
          <Input
            placeholder='Email'
            type='email'
            className='rounded-sm shadow-none'
          />
        </Form.Item>

        <Form.Item
          label='Quantity (ML)'
          name='quantityofBlood'
          rules={getAntdInputValidation()}
        >
          <Input
            placeholder='Quantity'
            type='number'
            className='rounded-sm shadow-none'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default InventoryForm;
