
import { useState } from "react";
import Menu from "../../../../assets/icons/menu.svg"
import Category from "../../../../assets/icons/category.svg"
import CategoryGreen from "../../../../assets/icons/category-green.svg"
// // import Key from "../../../../assets/icons/key.svg"
import Key from "../../../../assets/icons/key.svg"
import KeyGreen from "../../../../assets/icons/key-green.svg"
// import Arrow from "../../../../assets/icons/arrow-down.svg"
// import Rectangle from "../../../../assets/icons/Rectangle.svg"
// import RectangleGreen from "../../../../assets/icons/Rectangle-green.svg"
// import "../SideBar/SideBar.css"
import Email from "../../../../assets/icons/Email.svg"
import EmailGreen from "../../../../assets/icons/email-green.svg"
// import { key } from "localforage";
import  CusNavLink  from "./Includes/CusNavLink";

const SideBar = () => {

  const [open, setOpen] = useState(true);
  const [clickedMenu, setClickedMenu] = useState(false);

  // const [handleNavLink, setHandleNavLink] = useState(true);


  // const handleSlideUp = (link) => {

  //   sethandleclick(link);


  // };

  // // const ishandleclick = (link)=>handleclick === link;


  // const [active, setActive] = useState(null);
  // const ColorhandleClick = (color) => {

  //   setActive(color)
  // };
  // const iscolorClick = (color) => active === color;

  const lists = [
    { name: 'Dashboard', path: '/', icon : Category,clickedicon: CategoryGreen, submenu: [

    ]},
    { name: 'Rooms', path: '#', icon: Key,clickedicon:KeyGreen, submenu: [
      { name: 'All Rooms', path: '#'},
      { name: 'Edit Rooms', path: '#'}
    ] },
    { name: 'Email', path: '#',icon: Email,clickedicon:EmailGreen, submenu: [
      { name: 'All Emails', path: '#'},
      { name: 'Edit Email', path: '#'}
    ] },
  ];

  return (
    <div>

      {/* <div className={`${open ? "w-72 " : "w-20"} bg-white h-screen p-5  pt-8 relative duration-300`}>

        <img src={Menu} className={`absolute cursor-pointer -right-1 top-0 w-6  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></img>

      

        <div >

      

      </div> */}


      <div className={`${open ? "w-72 " : "w-20"} bg-white h-screen p-5  pt-8 relative duration-300`}>

        <img src={Menu} className={`absolute cursor-pointer -right-1 top-0 w-6  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></img>

        {/* <div onClick={() => ColorhandleClick("dashboard")} className={`${active === 'dashboard' ? 'onclick-color' : 'onclickcancel-color'} rounded p-[0.5rem]`} >
          <div className="flex gap-x-4 items-center cursor-pointer">

            <img src={active === 'dashboard' ? CategoryGreen : Category}
              className={`cursor-pointer duration-500  ${open && "rotate-[360deg]"
                }`}
            />

            <h1 onClick={() => ColorhandleClick('dashboard')}
              className={`text-color origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                }  ${active == 'dashboard' ? 'onclick-color' : 'onclickcancel-color'}`}
            >
              Dashboard
            </h1>
          </div>
        </div> */}
        
        {/* <div>
          <div onClick={() => ColorhandleClick("rooms")} className={`${active === 'rooms' ? 'onclick-color' : 'onclickcancel-color'} duration-200 rounded p-[0.5rem] cursor-pointer`}>

            <div className="flex pt-2 " onClick={() => handleSlideUp("rooms")} >
              <img src={active === 'rooms' ? KeyGreen : Key} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}></img>
              <span className={` origin-left ml-4 font-medium text-xl duration-200 ${!open && "scale-0"
                } `}>Rooms</span>
              <img src={Arrow} className={`cursor-pointer ml-20  duration-500 ${active === 'rooms' ? 'rotate-180' : ''} ${!open && "scale-0"
                }`}>

              </img>
            </div>

          </div>

          <ul className={`transition-transform transform duration-300 ${handleclick == 'rooms' ? '' : 'hidden'}`}>

            <li onClick={() => ColorhandleClick("allrooms")} className={`flex  rounded-md pt-2 pl-10  cursor-pointer hover:bg-light-white text-color text-sm items-center gap-x-4 ${active === 'allrooms' ? 'onclick-color' : 'onclickcancel-color'} duration-200`}>
              <img src={active === 'allrooms' ? RectangleGreen : Rectangle}></img>

              <span className={`${!open && "hidden"} origin-left  duration-200 `}> All Rooms</span>
            </li>

            <li onClick={() => ColorhandleClick("editrooms")} className={`flex  rounded-md pt-2 pl-10  cursor-pointer hover:bg-light-white text-color text-sm items-center gap-x-4 ${active === 'editrooms' ? 'onclick-color' : 'onclickcancel-color'} duration-200`}>
              <img src={active === 'editrooms' ? RectangleGreen : Rectangle}></img>

              <span className={`${!open && "hidden"} origin-left  duration-200 `}> Edit Rooms</span>
            </li>
          </ul>

        </div> */}
        {lists.map((list, i) => {
          return(
        <CusNavLink key={i} propsCus = {list} handleMenu = {open} >
          
        </CusNavLink>
          )
        })
        }
        {/* <div >

          <div onClick={() => ColorhandleClick("email")} className={`${active === 'email' ? 'onclick-color' : 'onclickcancel-color'} duration-200 rounded p-[0.5rem] cursor-pointer`}>
            <div className="flex " onClick={() => handleSlideUp("emails")} >
              <img src={active === 'email' ? EmailGreen : Email} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                }`}></img> <span onClick={() => ColorhandleClick("email")} className={`text-color origin-left ml-4 font-medium text-xl duration-200 ${!open && "scale-0"
                  } ${active === 'email' ? 'onclick-color' : 'onclickcancel-color'}`}>Email</span>
              <img src={Arrow} className={`cursor-pointer ml-20 duration-500 ${!open && "scale-0"
                }`}>

              </img>
            </div>
          </div>

          <ul className={`transition-transform transform duration-500 ${handleclick == 'emails' ? '' : 'h-0 hidden'}`}>

            <li onClick={() => ColorhandleClick("allemails")} className={`flex  rounded-md p-2 pl-10  cursor-pointer hover:bg-light-white text-color text-sm items-center gap-x-4 ${active === 'allemails' ? 'onclick-color' : 'onclickcancel-color'} `}>
              <img src={active === 'allemails' ? RectangleGreen : Rectangle} ></img>

              <span className={`${!open && "hidden"} origin-left  `}> All Email</span>
            </li>

            <li onClick={() => ColorhandleClick("editemails")} className={`flex rounded-md p-2 pl-10  cursor-pointer hover:bg-light-white text-color text-sm items-center gap-x-4 ${active === 'editemails' ? 'onclick-color' : 'onclickcancel-color'}`} >
              <img src={active === 'editemails' ? RectangleGreen : Rectangle}></img>

              <span className={`${!open && "hidden"} origin-left  `}> Edit Email</span>
            </li>
          </ul>

        </div> */}

      </div>

    </div>


  );
};

export default SideBar;