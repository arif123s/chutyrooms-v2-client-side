import { Outlet } from "react-router-dom";
// import NavBar from "../Pages/Common/Includes/User/NavBar/NavBar";
// import Footer from "../Pages/Common/Includes/Footer/Footer";
import "./Main.css"

const Main = () => {
    return (
      <div>     
            {/* <NavBar></NavBar> */}
            <Outlet></Outlet>
           {/* <Footer></Footer> */}
      </div>
    );
};

export default Main;