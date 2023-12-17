import {  Outlet } from "react-router-dom";
import Footer from "../../Common/Includes/Footer/Footer";
import NavBar from "../../Common/Includes/User/NavBar/NavBar";

const Home = () => {
    return (
      <div className=" min-h-screen">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
};

export default Home;