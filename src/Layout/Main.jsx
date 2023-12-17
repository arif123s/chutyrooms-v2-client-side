import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Common/Includes/NavBar/NavBar";
import Footer from "../Pages/Common/Includes/Footer/Footer";
import "./Main.css"
import SideBar from "../Pages/Common/Includes/SideBar/SideBar";

const Main = () => {
    return (
      <div>
        <div className="flex">
            <SideBar></SideBar>
          <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
};

export default Main;