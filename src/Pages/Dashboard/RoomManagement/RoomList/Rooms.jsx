import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Rooms = () => {

    const [isClicked, setIsClicked] = useState("roomsList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    return (
        <div className='RoomType-list-content'>
        <ul className='RoomType-option'>
        <Link to={'/dashboard/rooms/roomTypes'}>
               <li  onClick={()=>handleButtonClick("roomsList")} className={isClicked=="roomsList" ? 'btn-clicked' : 'btn-unclicked'}>Room List</li>
        </Link>
       <Link to={'/dashboard/rooms/roomTypes/addRoomType'}>
           <li  onClick={()=>handleButtonClick("roomAdd")} className={isClicked=="roomAdd" ? 'btn-clicked' : 'btn-unclicked'}>Room Add</li>
       </Link>
        </ul>
        <Outlet></Outlet>
   </div>
    );
};

export default Rooms;