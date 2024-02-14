import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Country.css'

const Country = () => {

    const [isClicked, setIsClicked] = useState("CountryList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='country-list-content'>
            <ul className='country-option'>
               
                <Link to={'/dashboard/country'}>
                <li  onClick={(e)=>handleButtonClick("CountryList")} className={isClicked=="CountryList" ? 'btn-clicked' : 'btn-unclicked'}>Country List</li>
                </Link>
                <Link to={'/dashboard/country/countryAdd'}>
                <li  onClick={(e)=>handleButtonClick("CountryAdd")} className={isClicked=="CountryAdd" ? 'btn-clicked' : 'btn-unclicked'}>Country Add</li>
                </Link>
            </ul>
            <Outlet></Outlet>
        </div>
    );
};

export default Country;