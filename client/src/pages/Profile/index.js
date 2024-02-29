import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donors from "./Donors";
import Hospitals from "./Hospitals";
import Organizations from "./Organizations";

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
            <Tabs.TabPane tab='Donors' key='2'>
              <Donors />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Hospitals' key='3'>
              <Hospitals />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "donor" && (
          <>
            <Tabs.TabPane tab='Blood Donations' key='4'></Tabs.TabPane>
            <Tabs.TabPane tab='Organizations' key='5'>
              <Organizations />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.userType === "hospital" && (
          <>
            <Tabs.TabPane tab='Blood Consumptions' key='6'></Tabs.TabPane>
            <Tabs.TabPane tab='Organizations' key='7'>
              <Organizations userType='hospital' />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
