import { Outlet } from "react-router-dom";
// import NavBar from "../Pages/Common/Includes/User/NavBar/NavBar";
// import Footer from "../Pages/Common/Includes/Footer/Footer";
import "./Main.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Main = () => {
  return (
    <div>
      <ScrollToTop />
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
