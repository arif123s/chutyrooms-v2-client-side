import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./RoomType.css"

const RoomType = () => {

    const [isClicked, setIsClicked] = useState("roomTypesList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='RoomType-list-content'>
        <ul className='RoomType-option'>
        <Link to={'/dashboard/rooms/roomTypes'}>
               <li  onClick={()=>handleButtonClick("roomTypesList")} className={isClicked=="roomTypesList" ? 'btn-clicked' : 'btn-unclicked'}>RoomTypes List</li>
        </Link>
       <Link to={'/dashboard/rooms/roomTypes/addRoomType'}>
           <li  onClick={()=>handleButtonClick("roomTypesAdd")} className={isClicked=="roomTypesAdd" ? 'btn-clicked' : 'btn-unclicked'}>RoomTypes Add</li>
       </Link>
        </ul>
        <Outlet></Outlet>
   </div>
    );
};

export default RoomType;
