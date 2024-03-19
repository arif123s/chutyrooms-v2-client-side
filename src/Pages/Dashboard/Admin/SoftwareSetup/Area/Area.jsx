import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Area.css";

const Area = () => {
    const [isClicked, setIsClicked] = useState("AreaList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='country-list-content'>
             <ul className='country-option'>
               
                <Link to={'/dashboard/Area'}>
                <li  onClick={(e)=>handleButtonClick("AreaList")} className={isClicked=="AreaList" ? 'btn-clicked' : 'btn-unclicked'}>Area List</li>
                </Link>
                <Link to={'/dashboard/Area/AreaAdd'}>
                <li  onClick={(e)=>handleButtonClick("AreaAdd")} className={isClicked=="AreaAdd" ? 'btn-clicked' : 'btn-unclicked'}>Area Add</li>
                </Link>
            </ul>
            <Outlet></Outlet>
        </div>
    );
};

export default Area;