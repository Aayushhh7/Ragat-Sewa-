import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donors from "./Donors";
import Hospitals from "./Hospitals";
import Organizations from "./Organizations";
import Events from "./OrgEvents";
import Volunteers from "./EventVolunteers";
import InventoryTable from "../../components/InventoryTable";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab='Inventory' key='1'>
              <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Events' key='2'>
              <Events />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Events Volunteers' key='3'>
              <Volunteers />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Donors' key='4'>
              <Donors />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Hospital' key='5'>
              <Hospitals />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "donor" && (
          <>
            <Tabs.TabPane tab='Blood Donations' key='6'>
              <InventoryTable
                filters={{
                  inventoryType: "in",
                  donor: currentUser._id,
                }}
                userType='donor'
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Organizations' key='7'>
              <Organizations userType='donor' />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "hospital" && (
          <>
            <Tabs.TabPane tab='Blood Consumptions' key='8'>
              <InventoryTable
                filters={{
                  inventoryType: "out",
                  hospital: currentUser._id,
                }}
                userType='hospital'
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Organizations' key='9'>
              <Organizations userType='hospital' />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
