import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Common/Includes/NavBar/NavBar";
import Footer from "../Pages/Common/Includes/Footer/Footer";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;