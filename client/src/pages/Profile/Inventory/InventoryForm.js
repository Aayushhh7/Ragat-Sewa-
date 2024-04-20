import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Radio, message, Select, Input } from "antd";
import { UpdateInventory, AddInventory } from "../../../apicalls/inventory";
import { getAntdInputValidation } from "../../../utils/helper";

function InventoryForm({ open, setOpen, initialValues, reloadData }) {
  const [form] = Form.useForm();
  const [inventoryType, setInventoryType] = useState(initialValues ? initialValues.inventoryType : "in");

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const onFinish = async (values) => {
    try {
      const response = initialValues
        ? await UpdateInventory(initialValues._id, values) // Pass initialValues._id
        : await AddInventory({ ...values, inventoryType });
      
      if (response.success) {
        message.success(response.message);
        reloadData(); // Reload data after successful update
        setOpen(false); // Close InventoryForm after successful update
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Modal
      title={initialValues ? "EDIT INVENTORY" : "ADD INVENTORY"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
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
