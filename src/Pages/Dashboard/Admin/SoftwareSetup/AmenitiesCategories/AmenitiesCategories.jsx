import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./AmenitiesCategories.css"

const AmenitiesCategories = () => {

    const [isClicked, setIsClicked] = useState("AmenitiesCategoryList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    
    return (
      
        <div className='AmenitiesCategory-list-content'>
             <ul className='AmenitiesCategory-option'>
             <Link to={'/dashboard/AmenitiesCategories'}>
                    <li  onClick={()=>handleButtonClick("AmenitiesCategoryList")} className={isClicked=="AmenitiesCategoryList" ? 'btn-clicked' : 'btn-unclicked'}>AmenitiesCategory List</li>
             </Link>
            <Link to={'/dashboard/AmenitiesCategories/AddAmenitityCategory'}>
                <li  onClick={()=>handleButtonClick("AmenitiesCategoryAdd")} className={isClicked=="AmenitiesCategoryAdd" ? 'btn-clicked' : 'btn-unclicked'}>AmenitiesCategory Add</li>
            </Link>
             </ul>
             <Outlet></Outlet>
        </div>
       
    );
};

export default AmenitiesCategories;