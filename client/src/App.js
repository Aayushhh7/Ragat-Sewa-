import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPage from "./components/ProtectedPage"
import AboutUs from "./pages/AboutUs";
import BloodRequest from "./pages/BloodRequest";

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedPage><Home /></ProtectedPage>}/>
      <Route path='/aboutus' element={<AboutUs/>} />
      <Route path='/requestBlood' element={<BloodRequest />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

    </Routes>
  );
}

export default App;
