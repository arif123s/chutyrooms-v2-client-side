import { useState, useRef, useEffect } from "react";
// import Menu from "../../../../assets/icons/menu.svg"
// import ChutyLogo from "../../../../assets/icons/Chuty-logo.svg"
import ChutyLogo from "../../../../assets/icons/chuty-logo.png";
import ChutySmallLogo from "../../../../assets/icons/Chuty-logo-small.svg";
import Category from "../../../../assets/icons/category.svg";
import CategoryGreen from "../../../../assets/icons/category-green.svg";
// // import Key from "../../../../assets/icons/key.svg"
import Key from "../../../../assets/icons/key.svg";
import KeyGreen from "../../../../assets/icons/key-green.svg";
import Arrow from "../../../../assets/icons/arrow-down.svg";
import ArrowGreen from "../../../../assets/icons/arrow-down-green.svg";
import Rectangle from "../../../../assets/icons/Rectangle.svg";
import RectangleGreen from "../../../../assets/icons/Rectangle-green.svg";
import "../SideBar/SideBar.css";
import Email from "../../../../assets/icons/Email.svg";
import EmailGreen from "../../../../assets/icons/email-green.svg";
// import { key } from "localforage";
import CusNavLink from "./Includes/CusNavLink";
import { Link, useNavigate } from "react-router-dom";

const menuClicked = "";

const SideBar = ({ open, setOpen }) => {
  const [active, setActive] = useState(false);

  const [handleclick, sethandleclick] = useState(menuClicked);
  const prevMenuClicked = useRef(menuClicked);
  const [toggleOpen, setToggleOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo?.role);
  const userRole = userInfo?.role.name;

  useEffect(() => {
    prevMenuClicked.current = handleclick;
    // console.log(prevMenuClicked.current);
  }, [handleclick]);

  const handleSlideUp = (link) => {
    if (prevMenuClicked.current != link) {
      setToggleOpen(true);
    } else if (toggleOpen) {
      setToggleOpen(false);
    } else if (!toggleOpen) {
      setToggleOpen(true);
    }
    setActive(link);
    sethandleclick(link);
  };

  // alert(clickedMenu)

  const ColorhandleClick = (color) => {
    setActive(color);
  };

  // const lists = [
  //   {
  //     name: "Dashboard",
  //     path: "/dashboard",
  //     icon: Category,
  //     clickedicon: CategoryGreen,
  //     submenu: [],
  //   },
  //   {
  //     name: "Profile",
  //     path: "/dashboard/profile",
  //     icon: Key,
  //     clickedicon: KeyGreen,
  //     submenu: [],
  //   },
  //   {
  //     name: "Property Management",
  //     path: "#",
  //     icon: Key,
  //     clickedicon: KeyGreen,
  //     submenu: [
  //       { name: "Property List", path: "#" },
  //       { name: "Add Property", path: "/dashboard/property-add" },
  //       { name: "Edit Property", path: "#" },
  //     ],
  //   },
  //   {
  //     name: "Room Management",
  //     path: "#",
  //     icon: Key,
  //     clickedicon: KeyGreen,
  //     submenu: [
  //       { name: "All Rooms", path: "#" },
  //       { name: "Add Room", path: "/dashboard/room-add" },
  //       { name: "Edit Rooms", path: "#" },
  //     ],
  //   },
  //   {
  //     name: "Email",
  //     path: "#",
  //     icon: Email,
  //     clickedicon: EmailGreen,
  //     submenu: [
  //       { name: "All Emails", path: "#" },
  //       { name: "Edit Email", path: "#" },
  //     ],
  //   },

  //   {
  //     name: "Chuty Setup",
  //     path: "#",
  //     icon: Email,
  //     clickedicon: EmailGreen,
  //     submenu: [
  //       { name: "Country", path: "/dashboard/country" },
  //       { name: "Division", path: "/dashboard/division" },
  //       { name: "District", path: "/dashboard/district" },
  //       { name: "Area", path: "/dashboard/Area" },
  //       { name: "Membership", path: "/dashboard/Membership" },
  //       { name: "PaymentSystems", path: "/dashboard/PaymentSystems" },
  //     ],
  //   },
  // ];

  // Define menu items based on user role

  const getMenuItems = () => {
    switch (userRole) {
      case "Super Admin":
        return [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [],
          },
          {
            name: "Property Management",
            path: "#",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [
              { name: "Property List", path: "#" },
              { name: "Add Property", path: "/dashboard/property-add" },
              { name: "Edit Property", path: "#" },
            ],
          },
          {
            name: "Room Management",
            path: "#",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [
              { name: "All Rooms", path: "#" },
              { name: "Add Room", path: "/dashboard/room-add" },
              { name: "Edit Rooms", path: "#" },
            ],
          },
        ];
      case "owner":
        return [
          {
            name: "Profile",
            path: "/dashboard/profile",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [],
          },
          {
            name: "Property Management",
            path: "#",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [
              { name: "Property List", path: "#" },
              { name: "Add Property", path: "/dashboard/property-add" },
              { name: "Edit Property", path: "#" },
            ],
          },
          {
            name: "Room Management",
            path: "#",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [
              { name: "All Rooms", path: "#" },
              { name: "Add Room", path: "/dashboard/room-add" },
              { name: "Edit Rooms", path: "#" },
            ],
          },
        ];
      case "user":
        return [
          {
            name: "Profile",
            path: "/dashboard/profile",
            icon: Key,
            clickedicon: KeyGreen,
            submenu: [],
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={` ${
        open ? "sidebar-width" : "sidebar-close-width"
      }  sidebar-small`}
    >
      <div className="chuty-logo-division">
        <img
          onClick={() => navigate("/")}
          src={open == true ? ChutyLogo : ChutySmallLogo}
          className={`${open ? "h-[48px] " : "h-[40px]"}  px-5  chutylogo`}
        ></img>
        <img
          onClick={() => navigate("/")}
          src={open == true ? ChutySmallLogo : ChutyLogo}
          className={`${
            open ? "h-[48px] " : "h-[40px]"
          } px-5 chutysmall-logo hidden `}
        ></img>
      </div>

      <div className={`sidebar-content`}>
        {/* <img src={Menu} className={`absolute cursor-pointer -right-1 top-0 w-6  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></img> */}

        {menuItems.map((list, i) => (
          <div key={i} className={`sidebar-content-section`}>
            <div
              onClick={() => handleSlideUp(list.name)}
              className={` ${
                active == list.name ? "onclick-color" : "onclickcancel-color"
              } duration-200 rounded-[0.5rem]  submenu-list-division h-10 cursor-pointer  ${
                !open ? "sm:p-[0rem]" : "sm:p-[0.65rem]"
              }`}
            >
              <Link to={list.path} className="sidebar-menu-division ">
                <img
                  src={active === list.name ? list.clickedicon : list.icon}
                  className={`cursor-pointer duration-500  ${
                    open ? " rotate-[360deg]" : "sidebar-menu-image-cus"
                  }`}
                ></img>
                <span
                  className={`sidebar-menu-title ${
                    !open && "sidebar-show-hide"
                  } `}
                >
                  {/* {prevMenuClicked.current}{handleclick} */}
                  {list.name}
                </span>
                {list.submenu.length > 0 && (
                  <img
                    src={active == list.name ? ArrowGreen : Arrow}
                    className={`sidebar-icons ${
                      active === list.name && toggleOpen ? "rotate-180" : ""
                    } ${!open && "scale-0"}`}
                  ></img>
                )}
              </Link>
            </div>
            {handleclick == list.name && toggleOpen && (
              <ul
                className={`transition-transform transform duration-300 bg-white   ${
                  !open &&
                  " lg:absolute lg:left-[70px] md:absolute submenu-unorder-list navbar-list-menu sm:w-[200px] sm:top-0 sm:shadow-[0rem_0rem_2.5rem_0rem_rgba(82,63,105,0.1)] sm:rounded-lg z-10"
                }`}
              >
                {list.submenu.map((item, i) => (
                  <Link to={item.path} key={i}>
                    <li
                      onClick={() => ColorhandleClick(item.name)}
                      className={`flex h-10  sm:pt-3 pb-3 sm:pl-10 pl-4 cursor-pointer hover:bg-light-white rounded-lg text-color text-sm items-center gap-x-4 ${
                        active === item.name
                          ? "onclick-color"
                          : "onclickcancel-color"
                      } } duration-200`}
                    >
                      <img
                        src={active === item.name ? RectangleGreen : Rectangle}
                      ></img>

                      <span
                        className={`${!open} cus-origin-transform  duration-200 `}
                      >
                        {" "}
                        {item.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
