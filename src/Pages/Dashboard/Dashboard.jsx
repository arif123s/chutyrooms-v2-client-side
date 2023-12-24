import { Outlet } from "react-router-dom";
import SideBar from "./../Common/Includes/SideBar/SideBar";

import "./Dashboard.css";


const Dashboard = () => {
    return (
      <div>
        <div className="flex dark">
          <SideBar></SideBar>
          <div>
            
          <Outlet></Outlet>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;