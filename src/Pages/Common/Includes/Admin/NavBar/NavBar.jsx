import Menu from "../../../../../assets/icons/menu.svg"
import SearchIcon from "../../../../../assets/icons/search-normal.svg"
import BellIcon from "../../../../../assets/icons/Group-bell.svg"
import UserIcon from "../../../../../assets/icons/user-icon/User-icon-default.png"
import ChutyLogoSmallDevice from "../../../../../assets/icons/Chuty-Logo-small-device.svg"
import ChutyLogo from "../../../../../assets/icons/Chuty-logo.svg"
import MenuSmall from "../../../../../assets/icons/Menu-small.svg"
import "./Navbar.css"

const NavBar = ({ open, setOpen }) => {
  
 
  
   return (
<div>
      <div className="mobile-device-logo">
         <img src={ChutyLogo} className="small-chuty-logo"  ></img>
         <img src={MenuSmall} onClick={() => setOpen(!open)}></img>
      </div>
      <div className="dashboard-nav-container">
      {/* <div className="flex items-center justify-between"> */}
      
      <div className="content-division">
            <img src={Menu} className="sidebar-menu-icon" onClick={() => setOpen(!open)}></img>
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
               <img src={UserIcon} className="user-image"></img>
               <h2 className="user-name hidden lg:block md:block">Joyanta Datta</h2>
            </div>
         </div>

      {/* </div> */}
      </div>
      </div>
   );
};

export default NavBar;