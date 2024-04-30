import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./PropertyType.css";

const PropertyType = () => {

    const [isClicked, setIsClicked] = useState("propertyTypeList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='PropertyType-list-content'>
            <ul className='PropertyType-option'>
        <Link to={'/dashboard/properties/propertyTypes'}>
               <li  onClick={()=>handleButtonClick("propertyTypeList")} className={isClicked=="propertyTypeList" ? 'btn-clicked' : 'btn-unclicked'}>PropertyTypes List</li>
        </Link>
       <Link to={'/dashboard/properties/propertyTypes/addPropertyType'}>
           <li  onClick={()=>handleButtonClick("propertyTypeAdd")} className={isClicked=="propertyTypeAdd" ? 'btn-clicked' : 'btn-unclicked'}>PropertyType Add</li>
       </Link>
        </ul>
        <Outlet></Outlet>
        </div>
    );
};

export default PropertyType;