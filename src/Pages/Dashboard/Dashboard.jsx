import { Outlet } from "react-router-dom";
import SideBar from "./../Common/Includes/SideBar/SideBar";

import "./Dashboard.css";


const Dashboard = () => {
    return (
      <div>
        <div className="flex dark">
          <SideBar></SideBar>
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;