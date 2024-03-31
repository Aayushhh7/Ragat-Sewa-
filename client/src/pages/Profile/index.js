import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donors from "./Donors";
import Hospitals from "./Hospitals";
import Organizations from "./Organizations";
import Events from "../Events";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab='Events' key='1'>
              <Events/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Inventory' key='2'>
              <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Donors' key='3'>
              <Donors />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Hospital' key='4'>
              <Hospitals />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "donor" && (
          <>
            <Tabs.TabPane tab='Blood Donations' key='5'></Tabs.TabPane>
            <Tabs.TabPane tab='Organizations' key='6'>
              <Organizations />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "hospital" && (
          <>
            <Tabs.TabPane tab='Blood Consumptions' key='7'></Tabs.TabPane>
            <Tabs.TabPane tab='Organizations' key='8'>
              <Organizations userType='hospital' />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
