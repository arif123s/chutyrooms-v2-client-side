import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./District.css"

const DistrictInfo = () => {
    const [isClicked, setIsClicked] = useState("DistrictList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div>
            <div className='country-list-content'>
             <ul className='country-option'>
               
                <Link to={'/dashboard/district'}>
                <li  onClick={(e)=>handleButtonClick("DistrictList")} className={isClicked=="DistrictList" ? 'btn-clicked' : 'btn-unclicked'}>District List</li>
                </Link>
                <Link to={'/dashboard/district/districtAdd'}>
                <li  onClick={(e)=>handleButtonClick("DistrictAdd")} className={isClicked=="DistrictAdd" ? 'btn-clicked' : 'btn-unclicked'}>District Add</li>
                </Link>
            </ul>
            <Outlet></Outlet>
        </div>
        </div>
    );
};

export default DistrictInfo;