import chutyLogo from "../../../../../assets/icons/Chuty-Logo.svg"
import propertyIcon from "../../../../../assets/icons/Property.svg"
import memberIcon from "../../../../../assets/icons/Member.svg"
import globalLogo from "../../../../../assets/icons/Global.svg"
import menuIcon from "../../../../../assets/icons/menu.svg";
import "./NavBar.css"
import { useState } from "react";

const NavBar = () => {

  const [menu,setMenu]=useState(false);

  console.log(menu)

  // const [activeLink, setActiveLink] = useState(null);

  //   const handleClick = (link) => {
  //     setActiveLink(link);
  //   };

  //   const isLinkActive = (link) => activeLink === link;

    return (
      <div className=" custom-container mx-auto pt-[12px] lg:pt-[32px]">
        <div className="flex w-full justify-between">
          <a className="nav-chuty-logo">
            <img src={chutyLogo}></img>
          </a>

          <ul className="flex items-center menu-horizontal px-1 gap-[18px] text-[14px]">
            <li>
              {/* <NavLink
                to="/"
               className="nav-item bg-[#E8F5ED] text-[#159947] nav-item flex px-[16px] py-[10px] rounded-[8px]"
                activeClassName="active"
                onClick={() => handleClick("/")}
                style={{ color: isLinkActive("/") ? "red" : "" }}
              >
                <img className="nav-icon" src={propertyLogo}></img>
                Chuty Property
              </NavLink> */}
              <a className="menu-mobile bg-[#E8F5ED]  text-[#159947] nav-item flex px-[16px] items-center py-[10px] rounded-[8px]">
                <img className="nav-icon" src={propertyIcon}></img>
                Chuty Property
              </a>
            </li>
            <li>
              <a className="nav-item bg-[#E8F5ED] text-[#159947] flex items-center px-[16px] py-[10px] rounded-[8px]">
                <img className="nav-icon" src={memberIcon}></img>
                Deal Membership
              </a>
            </li>
            <li className="menu-mobile">
              <a className="flex">
                <img src={globalLogo}></img>
                <select className="bg-[#F8FEFF]" name="" id="">
                  <option value="">BDT</option>
                </select>
              </a>
            </li>
            <li className="menu-mobile">
              <a className="bg-[#159947] text-white px-[16px] py-[10px] rounded-[8px] border-0">
                Login
              </a>
            </li>
            <img
              className="menu-icon"
              onClick={() => setMenu(!menu)}
              src={menuIcon}
              alt=""
            />
          </ul>
        </div>

        {menu && (
          <div className="py-3 px-2  rounded-md">
            <a className="bg-[#159947] w-full text-white px-[14px] py-[7px]  rounded-[8px] border-0">
              Login
            </a>

            <hr className="my-3" />

            <a className="flex">
              <img src={globalLogo}></img>
              <select className="bg-[#F8FEFF]" name="" id="">
                <option value="">BDT</option>
              </select>
            </a>

            <hr className="my-3" />

            <a className=" bg-[#E8F5ED] w-44  text-[#159947] nav-item flex px-[16px] items-center py-[10px] rounded-[8px]">
              <img className="nav-icon" src={propertyIcon}></img>
              Chuty Property
            </a>
          </div>
        )}

        {/* <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="bg-[#E8F5ED] text-[#159947] mr-4">
                <img src={propertyLogo}></img>
                Chuty Property
              </a>
            </li>
            <li>
              <a className="bg-[#E8F5ED] text-[#159947]">
                <img src={memberLogo}></img>
                Deal Membership
              </a>
            </li>
            <li>
              <a className="">
                <img src={globalLogo}></img>
                <select name="" id="">
                  <option value="">BDT</option>
                </select>
              </a>
            </li>
            <li>
              <a className="bg-[#159947] text-white">Login</a>
            </li>
          </ul>
        </div> */}
      </div>
    );
};

export default NavBar;