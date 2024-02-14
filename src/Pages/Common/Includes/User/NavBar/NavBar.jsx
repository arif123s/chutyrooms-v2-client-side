import chutyLogo from "../../../../../assets/icons/Chuty-Logo.svg";
import propertyIcon from "../../../../../assets/icons/Property.svg";
import propertyLightIcon from "../../../../../assets/icons/property-light.svg";
import memberIcon from "../../../../../assets/icons/Member.svg";
import memberLightIcon from "../../../../../assets/icons/member-light.svg";
import globalLogo from "../../../../../assets/icons/Global.svg";
import menuIcon from "../../../../../assets/icons/menu-large.svg";
import arrowDownIcon from "../../../../../assets/icons/arrow-down.svg";
// import arrowDownIcon from "../../../../../assets/icons/arrow-down.svg";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [menu, setMenu] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set the duration in milliseconds (e.g., 3000 for 3 seconds)
    const duration = 5000;

    // After the specified duration, hide the menu
    const timeoutId = setTimeout(() => {
      setMenu(false);
    }, duration);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  const handleNavigate = (route) => {
    navigate(`/${route}`);
  };

  // const [activeLink, setActiveLink] = useState(null);

  //   const handleClick = (link) => {
  //     setActiveLink(link);
  //   };

  //   const isLinkActive = (link) => activeLink === link;

  return (
    <div className="custom-container mx-auto pt-[12px] lg:pt-[32px]">
      <div className="flex w-full justify-between">
        <a onClick={() => handleNavigate("")} className="nav-chuty-logo">
          <img src={chutyLogo}></img>
        </a>

        <ul className="flex items-center menu-horizontal px-1 gap-[18px] text-[14px]">
          <li>
            {/* <NavLink
                to="/"
               className="nav-item-container bg-[#E8F5ED] text-[#159947] nav-item-container flex px-[16px] py-[10px] rounded-[8px]"
                activeClassName="active"
                onClick={() => handleClick("/")}
                style={{ color: isLinkActive("/") ? "red" : "" }}
              >
                <img className="nav-icon" src={propertyLogo}></img>
                Chuty Property
              </NavLink> */}
            <a
              onClick={() => handleNavigate("owner-register")}
              onMouseEnter={(e) =>
                e.target.querySelector(".nav-icon").classList.add("hovered")
              }
              onMouseLeave={(e) =>
                e.target.querySelector(".nav-icon").classList.remove("hovered")
              }
              className="menu-mobile cursor-pointer bg-[#E8F5ED] text-[#159947] nav-item-container flex px-[16px] items-center py-[10px] rounded-[8px]"
            >
              <img className="nav-icon" src={propertyIcon}></img>
              <img className="nav-icon light" src={propertyLightIcon}></img>
              Chuty Property
            </a>
          </li>
          <li>
            <a
              onMouseEnter={(e) =>
                e.target.querySelector(".nav-icon").classList.add("hovered")
              }
              onMouseLeave={(e) =>
                e.target.querySelector(".nav-icon").classList.remove("hovered")
              }
              className="nav-item-container cursor-pointer bg-[#E8F5ED] text-[#159947] flex items-center p-[6px] md:px-[16px] lg:px-[16px] md:py-[10px] lg:py-[10px] rounded-[8px]"
            >
              <img className="nav-icon" src={memberIcon}></img>
              <img className="nav-icon light" src={memberLightIcon}></img>
              Deal Membership
            </a>
          </li>
          <li className="menu-mobile">
            <a className="flex">
              <img src={globalLogo}></img>
              <div className="relative pr-[8px] bg-[#F8FEFF]">
                <select className="w-12 ml-1 p-[4px]" name="" id="">
                  <option className="" value="BDT">
                    BDT
                  </option>
                  <option className="" value="USD">
                    USD
                  </option>
                </select>
                <img
                  // className="absolute top-[6px] right-[0px]"
                  className="arrow-icon"
                  src={arrowDownIcon}
                  alt=""
                />
              </div>

              {/* <div className="bg-[#F8FEFF] flex items-center ml-2" name="" id="">
                  <p className="bg-white " value="BDT">
                    BDT
                  </p>
                  <img src={arrowDownIcon} alt="" />
                  <div>
                    <p>BDT</p>
                  </div>
                </div> */}
            </a>
          </li>
          <li className="menu-mobile">
            <a
              onClick={() => handleNavigate("login")}
              className="bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
            >
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

      {/* {menu &&  */}
      <div
        className={` duration-500  ${
          menu ? " menu-container py-3 px-2 mt-2 block" : "h-0"
        }`}
      >
        <div>
          <div
            className={`transition-trnasform transform duration-200 ${
              menu ? " block" : "hidden"
            }`}
          >
            <a
              onClick={() => handleNavigate("login")}
              className="bg-[#159947] cursor-pointer text-[14px] md:text-[16px] lg:text-[16px] w-full text-white px-[14px] py-[7px]  rounded-[8px] border-0"
            >
              Login
            </a>

            <hr className="my-3" />
          </div>

          <div
            className={`transition-trnasform transform duration-[1200] ${
              menu ? " block" : "hidden"
            }`}
          >
            <a className="flex">
              <img src={globalLogo}></img>
              {/* <select className="bg-[#F8FEFF]" name="" id="">
                <option value="">BDT</option>
              </select> */}
              <div className="relative pr-[8px]">
                <select className="w-12 ml-1 mr-2 p-[5px]" name="" id="">
                  <option className="bg-white " value="BDT">
                    BDT
                  </option>
                  <option className="bg-white " value="USD">
                    USD
                  </option>
                </select>
                <img
                  // className="w-[20px] absolute top-[17%] right-[0px]"
                  className="arrow-icon"
                  src={arrowDownIcon}
                  alt=""
                />
              </div>
            </a>

            <hr className="my-3" />
          </div>

          <div
            className={`transition-trnasform transform duration-[1500] ${
              menu ? " block" : "hidden"
            }`}
          >
            <a className="bg-[#E8F5ED] cursor-pointer w-44 text-[#159947] nav-item-container flex items-center text-[14px] md:text-[16px] lg:text-[16px] p-[6px] md:px-[16px] lg:px-[16px] md:py-[10px] lg:py-[10px] rounded-[8px]">
              <img className="nav-icon" src={propertyIcon}></img>
              Chuty Property
            </a>
          </div>
        </div>
      </div>

      {/*  } */}

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
