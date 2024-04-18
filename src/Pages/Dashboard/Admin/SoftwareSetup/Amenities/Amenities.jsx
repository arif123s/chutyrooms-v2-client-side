import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../AmenitiesCategories/AmenitiesCategories.css"

const Amenities = () => {

    const [isClicked, setIsClicked] = useState("AmenitiesList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='AmenitiesCategory-list-content'>
             <ul className='AmenitiesCategory-option'>
             <Link to={'/dashboard/AmenitiesCategories'}>
                    <li  onClick={()=>handleButtonClick("AmenitiesList")} className={isClicked=="AmenitiesList" ? 'btn-clicked' : 'btn-unclicked'}>Amenities List</li>
             </Link>
            <Link to={'/dashboard/AmenitiesCategories/AddAmenitityCategory'}>
                <li  onClick={()=>handleButtonClick("AmenitiesAdd")} className={isClicked=="AmenitiesAdd" ? 'btn-clicked' : 'btn-unclicked'}>Amenities Add</li>
            </Link>
             </ul>
             <Outlet></Outlet>
        </div>
    );
};

export default Amenities;