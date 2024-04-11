import React from "react";
import {
  GetAllOrganizationofDonor,
  GetAllOrganizationofHospital,
} from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table, message, Modal } from "antd";
import { getDateformat } from "../../../utils/helper";
import InventoryTable from "../../../components/InventoryTable";

function Organizations({ userType }) {
  const [showHistoryModal, setshowHistoryModal] = React.useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (userType === "hospital") {
        response = await GetAllOrganizationofHospital();
      } else {
        response = await GetAllOrganizationofDonor();
      }
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

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateformat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          className='underline text-md cursor-pointer'
          onClick={() => {
            setSelectedOrganization(record);
            setshowHistoryModal(true);
          }}
        >
          History
        </span>
      ),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} className='mt-3' />

      {showHistoryModal && (
        <Modal
          title={`${
            userType === "donor" ? "Donation History" : "Consumptions History"
          } In ${selectedOrganization.organizationName}`}
          centered
          open={showHistoryModal}
          onCancel={() => setshowHistoryModal(false)}
          width={1000}
          onOk={() => {
            setshowHistoryModal(false);
          }}
          okButtonProps={{ style: { backgroundColor: "#6a0b37" } }}
        >
          <InventoryTable
            filters={{
              organization: selectedOrganization._id,
              [userType]: currentUser._id,
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Organizations;
