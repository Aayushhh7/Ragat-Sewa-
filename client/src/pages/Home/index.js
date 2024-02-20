import React from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
const Home = () => {
  const {currentUser} = useSelector((state) => state.users)
  return (
    <div>
      {/* <Navbar /> */}
      <h1>Home Page</h1>
      {currentUser.email}
    </div>
  );
};

export default Home;
