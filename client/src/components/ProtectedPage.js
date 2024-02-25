import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserName } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";

function ProtectedPage({ children }) {
  // Selecting the user state from usersslice
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    currentUser && (
      <div>
        {/* header */}
        <div className='flex justify-between items-center bg-primary-color text-white px-5 py-1'>
          <div>
            <h1 className='text-2xl font-medium'>Ragat Sewa</h1>
            <span className='text-xs '>
              {currentUser.userType.toUpperCase()}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <i className='ri-shield-user-fill'></i>
            <div className='flex flex-col'>
              <span
                className='mr-5 text-md cursor-pointer'
                onClick={() => navigate("/profile")}
              >
                {getLoggedInUserName(currentUser).toUpperCase()}
              </span>
            </div>
            <i
              className='ri-logout-box-r-line ml-5 cursor-pointer'
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        {/* body */}
        <div className='px-5 py-2'>{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
