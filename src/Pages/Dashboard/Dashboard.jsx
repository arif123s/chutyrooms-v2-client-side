import { Outlet } from "react-router-dom";
import SideBar from "./../Common/Includes/SideBar/SideBar";

import "./Dashboard.css";
import NavBar from "../Common/Includes/Admin/NavBar/NavBar";
import { useState } from "react";
import Profile from "./Profile/UserProfile/Profile";
import DashboardHome from "./DashboardHome/DashboardHome";
import OwnerPropertyAdd from './PropertyManagement/OwnerPropertyAdd'

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = userInfo?.role.name;

  const renderDefaultPage = () => {
    // Determine the default page based on user role
    switch (userRole) {
      case "Super Admin":
        return <DashboardHome />;
      case "owner":
        return <OwnerPropertyAdd />;
      case "user":
        return <Profile />;
      default:
        return null; // Render nothing if the role is not recognized
    }
  };

  return (
    <div className="bg-[rgb(242,245,250)] ">
      <div className="flex bg-[#F2F5FA] full-dashboard ">
        <SideBar open={open} setOpen={setOpen}></SideBar>
        <div
          className={`${
            open ? "dashboard-content-open" : "dashboard-content-close"
          }`}
        >
          <NavBar open={open} setOpen={setOpen}></NavBar>
          <div className="min-h-screen bg-[#F2F5FA]">
            <Outlet>{renderDefaultPage()}</Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
