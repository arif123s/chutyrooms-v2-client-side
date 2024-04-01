import { Outlet } from "react-router-dom";
import Footer from "../../Common/Includes/Footer/Footer";
import NavBar from "../../Common/Includes/User/NavBar/NavBar";
import "./Home.css";

const Home = () => {
  return (
    <div className=" home-container relative">
      <div>
        <NavBar></NavBar>
      </div>

      <div>
        <Outlet></Outlet>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
