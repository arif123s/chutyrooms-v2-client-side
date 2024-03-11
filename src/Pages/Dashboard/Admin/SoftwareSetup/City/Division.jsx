import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Division.css";

const Division = () => {

    const [isClicked, setIsClicked] = useState("DivisionList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='country-list-content'>
             <ul className='country-option'>
               
                <Link to={'/dashboard/division'}>
                <li  onClick={(e)=>handleButtonClick("DivisionList")} className={isClicked=="DivisionList" ? 'btn-clicked' : 'btn-unclicked'}>Division List</li>
                </Link>
                <Link to={'/dashboard/division/divisionAdd'}>
                <li  onClick={(e)=>handleButtonClick("DivisionAdd")} className={isClicked=="DivisionAdd" ? 'btn-clicked' : 'btn-unclicked'}>Division Add</li>
                </Link>
            </ul>
            <Outlet></Outlet>
        </div>
    );
};

export default Division;