import {  Outlet } from "react-router-dom";
import Footer from "../../Common/Includes/Footer/Footer";
import NavBar from "../../Common/Includes/User/NavBar/NavBar";
import "./Home.css" 

const Home = () => {
    return (
      <div className="min-h-screen home-container relative">
        {/* <div className="sticky top-0 z-50 bg-[#F8FEFF]"> */}
          <NavBar></NavBar>
        {/* </div> */}
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
};

export default Home;