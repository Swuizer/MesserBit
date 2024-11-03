import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import DeleteProfile from "./pages/DeleteProfile";
import AdminRoute from "./components/core/Auth/AdminRoute";
import AddOwner from "./components/core/Dashboard/Owner/AddOwner";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AllOwner from "./components/core/Dashboard/Owner/AllOwner";
import AddRoom from "./components/core/Dashboard/Owner/Room/AddRoom";
import AllRooms from "./components/core/Dashboard/Owner/Room/AllRooms";
import RoomDetails from "./components/core/Dashboard/Owner/Room/RoomDetails";
import EnrolledRooms from "./components/core/Dashboard/EnrolledRooms";


function App() {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/allRooms/:location" element={<AllRooms />} />
        <Route path="/allRooms/:location/getRoomDetails/:roomId" element={<RoomDetails/>} />
        <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
        />
        <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
        />
        <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        {/* User Profile Delete, Admin Approavation */}
        <Route 
          path="deleteProfile/:id" 
          element={ 
            <AdminRoute>
              <DeleteProfile /> 
            </AdminRoute>
          }
        />
        {/* End Here */}
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.USER && (
              <>
                <Route path="dashboard/EnrolledRooms" element={<EnrolledRooms />} />
              </>
            )
          }


          {
            user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
              {/* <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} /> */}
              <Route path="dashboard/addOwner" element={<AddOwner />} />
              <Route path="dashboard/allOwners" element={<AllOwner />} />
              <Route path="/dashboard/allOwners/addRoom/:ownerId" element={<AddRoom />} />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error/>} />

      </Routes>
    </div>
  );
}

export default App;
