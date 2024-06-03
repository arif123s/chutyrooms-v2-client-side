/* eslint-disable react/prop-types */
import Menu from "../../../../../assets/icons/menu-large.svg"
import SearchIcon from "../../../../../assets/icons/search-normal.svg"
import BellIcon from "../../../../../assets/icons/Group-bell.svg"
import UserIcon from "../../../../../assets/icons/user.svg"

// import ChutyLogo from "../../../../../assets/icons/Chuty-logo.svg"
import ChutyLogo from "../../../../../assets/icons/chuty-logo.png"
import MenuSmall from "../../../../../assets/icons/Menu-small.svg"
import "./Navbar.css"
import { useNavigate } from "react-router-dom"

const NavBar = ({ open, setOpen }) => {

   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem("userInfo"));
   console.log(user)
  
   const handleNavigate = (route) => {
     navigate(`/${route}`);
   };
  
   return (
     <div>
       <div className="mobile-device-logo">
         <img
           onClick={() => handleNavigate("")}
           src={ChutyLogo}
           className="small-chuty-logo"
         ></img>
         <img src={MenuSmall} onClick={() => setOpen(!open)}></img>
       </div>
       <div className="dashboard-nav-container">
         {/* <div className="flex items-center justify-between"> */}

         <div className="content-division">
           <img
             src={Menu}
             className="sidebar-menu-icon"
             onClick={() => setOpen(!open)}
           ></img>
           <h2 className="content-name">Dashboard</h2>
         </div>
         <div className="navbar-content">
           <div className="navbar-icon-division">
             <img className="navbar-icon" src={SearchIcon}></img>
           </div>
           <div className="navbar-icon-division">
             <img className="navbar-icon" src={BellIcon}></img>
           </div>
           <div className="navbar-user-info">
             {user.image ? (
               <img src={user.img} className="user-image"></img>
             ) : (
               <img src={UserIcon} className="user-image"></img>
             )}

             <h2 className="user-name hidden lg:block md:block">
               {user?.name}
             </h2>
           </div>
         </div>

         {/* </div> */}
       </div>
     </div>
   );
};

export default NavBar;