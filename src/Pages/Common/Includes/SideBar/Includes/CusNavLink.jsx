
import { useState } from "react";
import { key } from "localforage";
import Key from "../../../../../assets/icons/key.svg"

import Category from "../../../../../assets/icons/category.svg"
import CategoryGreen from "../../../../../assets/icons/category-green.svg"
// import Key from "../../../../assets/icons/key.svg"
import KeyGreen from "../../../../../assets/icons/key-green.svg"
import Arrow from "../../../../../assets/icons/arrow-down.svg"
import Rectangle from "../../../../../assets/icons/Rectangle.svg"
import RectangleGreen from "../../../../../assets/icons/Rectangle-green.svg"
import "../../SideBar/SideBar.css"
import Email from "../../../../../assets/icons/Email.svg"
import EmailGreen from "../../../../../assets/icons/email-green.svg"
const CusNavLink = (props) => {

    // const [open, setOpen] = useState(true);

    const [handleclick, sethandleclick] = useState(false);

    const {name,icon,clickedicon, submenu} = props.propsCus;
    const {handleMenu, clickedMenu} = props;

    const handleSlideUp = (link) => {

        setActive(color);
        sethandleclick(link);

    };

    const ishandleclick = (link)=>handleclick === link;

    const [active, setActive] = useState(false);

    // alert(clickedMenu)

    const ColorhandleClick = (color) => {

        // alert(color)
        setActive(color)
    };

    const iscolorClick = (color) => active === color;

    return (
        <>
            <div >
                <div onClick={() => ColorhandleClick(name)} className={`${active == 1 ? 'onclick-color' : 'onclickcancel-color'} duration-200 rounded p-[0.5rem] cursor-pointer`}>

                    <div className="flex pt-2 "  >
                        <img src={active === name ? clickedicon:icon} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}></img>
                        <span className={` origin-left ml-4 font-medium text-xl duration-200 ${!handleMenu && "scale-0"
                            } `}>{name}</span>
                        {submenu.length > 0 &&  <img src={Arrow} className={`cursor-pointer ml-20  duration-500 ${handleclick === name ? 'rotate-180' : ''} ${!handleMenu && "scale-0"
                            }`}></img>
                      
                        }
                       
                    </div>

                </div>

                <ul className={`transition-transform transform duration-300 ${handleclick == name ? '' : 'hidden'}`}>
                    
                    {submenu.map((item, i) =>
                    
                    <li key={i} onClick={() => handleSlideUp(item.name)} className={`flex  rounded-md pt-2 pl-10  cursor-pointer hover:bg-light-white text-color text-sm items-center gap-x-4 ${handleclick === item.name ? 'onclick-color' : 'onclickcancel-color'} duration-200`}>
                        <img src={handleclick === item.name ? RectangleGreen : Rectangle}></img>

                        <span className={`${!handleMenu && "hidden"} origin-left  duration-200 `}> {item.name}</span>
                    </li>

                    )}
                    

                    {/* <li onClick={() => ColorhandleClick("editrooms")} className={`flex  rounded-md pt-2 pl-10  cursor-pointer hover:bg-light-white text-color text-sm items-center gap-x-4 ${active === 'editrooms' ? 'onclick-color' : 'onclickcancel-color'} duration-200`}>
                        <img src={active === 'editrooms' ? RectangleGreen : Rectangle}></img>

                        <span className={`${!open && "hidden"} origin-left  duration-200 `}> Edit Rooms</span>
                    </li> */}
                </ul>

            </div>
        </>
    )

}

export default CusNavLink;