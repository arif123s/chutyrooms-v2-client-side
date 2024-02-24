import { Outlet } from "react-router-dom";
import SideBar from "./../Common/Includes/SideBar/SideBar";

import "./Dashboard.css";
import NavBar from "../Common/Includes/Admin/NavBar/NavBar";
import { useState } from "react";


const Dashboard = () => {

  const [open, setOpen] = useState(true);

    return (
      <div className="bg-[rgb(242,245,250)] ">
        <div className="flex bg-[#F2F5FA] full-dashboard ">
          <SideBar open={open} setOpen={setOpen}></SideBar>
          <div className={`${open ? "dashboard-content-open" : "dashboard-content-close"}`}>
            <NavBar open={open} setOpen={setOpen}></NavBar>
         <div className="h-full bg-[#F2F5FA]">
         <Outlet></Outlet>
         </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;