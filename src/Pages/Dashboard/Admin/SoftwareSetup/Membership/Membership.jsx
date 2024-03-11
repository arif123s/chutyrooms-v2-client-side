import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Membership.css'

const Membership = () => {
  
        const [isClicked, setIsClicked] = useState("MembershipList");

        const handleButtonClick = (btntype) => {
          setIsClicked(btntype);
        };
        return (
            <div className='membership-list-content'>
                 <ul className='membership-option'>
                   
                    <Link to={'/dashboard/Membership'}>
                    <li  onClick={(e)=>handleButtonClick("MembershipList")} className={isClicked=="MembershipList" ? 'btn-clicked' : 'btn-unclicked'}>Membership List</li>
                    </Link>
                    <Link to={'/dashboard/Membership/MembershipAdd'}>
                    <li  onClick={(e)=>handleButtonClick("MembershipAdd")} className={isClicked=="MembershipAdd" ? 'btn-clicked' : 'btn-unclicked'}>Membership Add</li>
                    </Link>
                </ul>
                <Outlet></Outlet>
            </div>
        );
   
};

export default Membership;