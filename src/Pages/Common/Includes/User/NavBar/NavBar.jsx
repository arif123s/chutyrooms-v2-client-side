import chutyLogo from "../../../../../assets/icons/Chuty-Logo.svg";
import propertyIcon from "../../../../../assets/icons/Property.svg";
import propertyLightIcon from "../../../../../assets/icons/property-light.svg";
import propertyDarkIcon from "../../../../../assets/icons/property-dark.svg";
import memberIcon from "../../../../../assets/icons/membership.svg";
import memberLightIcon from "../../../../../assets/icons/member-light.svg";
import globalLogo from "../../../../../assets/icons/Global.svg";
import menuIcon from "../../../../../assets/icons/menu-large.svg";
import arrowDownIcon from "../../../../../assets/icons/arrow-down.svg";
import profileIcon from "../../../../../assets/icons/profile.svg";
import logoutIcon from "../../../../../assets/icons/logout.svg";
import userIcon from "../../../../../assets/icons/user.svg";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/features/auth/authSlice";

const NavBar = () => {
  const [menu, setMenu] = useState(true);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  if (user) {
    console.log("user");
  }
  
  if (!user) {
    console.log("not user");
  }

  useEffect(() => {
    // Set the duration in milliseconds (e.g., 3000 for 3 seconds)
    const duration = 0;

    // After the specified duration, hide the menu
    const timeoutId = setTimeout(() => {
      setMenu(false);
    }, duration);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  const handleNavigate = (event, route) => {
    event.preventDefault();
    setMenu(false)
    navigate(`/${route}`);
  };

  const handleLogout = (e) =>{
    e.preventDefault()
    console.log("logout")
    localStorage.setItem(
      "userInfo",
      JSON.stringify(
        null
      )
    );

    dispatch(logout())

    window.location.reload();
  }

  return (
    <div className="custom-container navbar-container">
      <div className="flex w-full h-[64px] justify-between items-center">
        <a
          href="/"
          onClick={(e) => handleNavigate(e, "")}
          className="nav-chuty-logo"
        >
          <img src={chutyLogo} alt="Chuty Logo"></img>
        </a>

        <ul className="flex items-center menu-horizontal  gap-[18px] text-[14px]">
          <div className="flex items-center gap-[18px]">
            <li className="menu-mobile">
              <a
                href="/owner-register"
                onClick={(e) => handleNavigate(e, "owner-register")}
                // onClick={() => handleNavigate("owner-register")}
                onMouseEnter={(e) =>
                  e.target.querySelector(".nav-icon").classList.add("hovered")
                }
                onMouseLeave={(e) =>
                  e.target
                    .querySelector(".nav-icon")
                    .classList.remove("hovered")
                }
                className="menu-mobile cursor-pointer bg-[#E8F5ED] text-[#159947] nav-item-container flex px-[16px] items-center py-[10px] rounded-[8px]"
              >
                <img
                  className="nav-icon"
                  src={propertyIcon}
                  alt="Property icon"
                ></img>
                <img
                  className="nav-icon light"
                  src={propertyLightIcon}
                  alt="Property icon"
                ></img>
                Chuty Property
              </a>
            </li>
            <li>
              <a
                onClick={(e) => handleNavigate(e, "membership")}
                onMouseEnter={(e) =>
                  e.target.querySelector(".nav-icon").classList.add("hovered")
                }
                onMouseLeave={(e) =>
                  e.target
                    .querySelector(".nav-icon")
                    .classList.remove("hovered")
                }
                className="nav-item-container cursor-pointer bg-[#E8F5ED] text-[#159947] flex items-center p-[8px] md:px-[16px] lg:px-[16px] md:py-[10px] lg:py-[10px] rounded-[8px]"
              >
                <img
                  className="nav-icon"
                  src={memberIcon}
                  alt="Membership icon"
                ></img>
                <img
                  className="nav-icon light"
                  src={memberLightIcon}
                  alt="Membership icon"
                ></img>
                Deal Membership
              </a>
            </li>
            <li className="menu-mobile">
              <div className="flex">
                <img src={globalLogo} alt="Global logo"></img>
                <div className="relative pr-[8px] ">
                  <select
                    className="w-12 ml-1 p-[4px] bg-[#F8FEFF] "
                    name=""
                    id=""
                  >
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
                    alt="Aroow icon"
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
              </div>
            </li>
          </div>
          {user ? (
            <li className="menu-mobile user-icon-container relative">
              <img
                onClick={() => setProfile(!profile)}
                className="w-[36px]"
                src={userIcon}
                alt="Profile"
              />
              {profile && (
                <div className="w-[116px] absolute right-0 h-20 p-3 bg-white rounded border border-neutral-200 flex-col justify-center items-start gap-4 inline-flex z-20">
                  <div
                    onClick={(e) => handleNavigate(e, "dashboard")}
                    className="flex items-center gap-[8px]"
                  >
                    <img src={profileIcon} alt="Profile-icon" />
                    <a href="">Profile</a>
                  </div>
                  <div
                    onClick={(e) => handleLogout(e)}
                    className="flex items-center gap-[8px]"
                  >
                    <img src={logoutIcon} alt="Profile-icon" />
                    <a href="">Logout</a>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li className="menu-mobile">
              <a
                href="/login"
                onClick={(e) => handleNavigate(e, "login")}
                className="bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0 hover:bg-[#016A29] transition-all"
              >
                Login
              </a>
            </li>
          )}

          <img
            className="menu-icon"
            onClick={() => setMenu(!menu)}
            src={menuIcon}
            alt="Menu icon"
          />
        </ul>
      </div>

      {/****************************
                Moble menu
       ***************************/}

      <div
        className={` duration-500  ${
          menu ? " menu-container py-3 px-2 mt-2 block h-fit" : "h-0"
        }`}
      >
        <div>
          <div
            className={` transition-trnasform transform duration-200 ${
              menu ? " block" : "hidden"
            }`}
          >
            {user ? (
              <div
                onClick={(e) => handleNavigate(e, "dashboard")}
                className="flex items-center gap-[8px]"
              >
                <img src={profileIcon} alt="Profile-icon" />
                <a
                  className="text-[14px] md:text-[16px] lg:text-[16px]"
                  href=""
                >
                  Profile
                </a>
              </div>
            ) : (
              <a
                href="/login"
                onClick={(e) => handleNavigate(e, "login")}
                // onClick={() => handleNavigate("login")}
                className="text-[14px] md:text-[16px] lg:text-[16px] bg-[#159947] cursor-pointer w-full text-white px-[14px] py-[7px]  rounded-[8px] border-0"
              >
                Login
              </a>
            )}

            <hr className="my-3" />
          </div>

          <div
            className={`transition-trnasform transform duration-[1200] ${
              menu ? " block" : "hidden"
            }`}
          >
            <a className="flex">
              <img src={globalLogo} className="Global logo"></img>
              {/* <select className="bg-[#F8FEFF]" name="" id="">
                <option value="">BDT</option>
              </select> */}
              <div className="relative pr-[8px] ">
                <select
                  className="w-[55px] ml-1 mr-2 p-[5px] text-[14px] md:text-[16px] lg:text-[16px]"
                  name=""
                  id=""
                >
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
                  alt="Arrow icon"
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
            <a
              href="/owner-register"
              onClick={(e) => handleNavigate(e, "owner-register")}
              className="cursor-pointer w-44 flex items-center text-[14px] md:text-[16px] lg:text-[16px]  "
            >
              <img
                className="w-[18px] h-[18px] mr-[4px]"
                src={propertyDarkIcon}
                alt="Property icon"
              ></img>
              Chuty Property
            </a>
            {user && (
              <div>
                <hr className="my-3" />
                <div className="flex items-center gap-[8px]">
                  <img src={logoutIcon} alt="Profile-icon" />
                  <a
                    className="text-[14px] md:text-[16px] lg:text-[16px]"
                    href=""
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
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
