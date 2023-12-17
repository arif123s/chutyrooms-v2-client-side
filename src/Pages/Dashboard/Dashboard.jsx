import { Outlet } from "react-router-dom";
import SideBar from "../Common/Includes/SideBar/SideBar";

const Dashboard = () => {
    return (
      <div>
        <div className="flex">
          <SideBar></SideBar>
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;