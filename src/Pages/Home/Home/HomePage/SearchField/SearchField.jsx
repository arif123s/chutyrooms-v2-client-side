/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchField.css";
import Gps from "./../../../../../assets/icons/gps.svg";
import { useNavigate } from "react-router-dom";
import  RoomGuest from "./RoomGuest";


const SearchField = ({ value, onChange, onDateChange,startDate,endDate,setDateRange , rooms , setRooms , totalAdults, setTotalAdults , totalChildren , setTotalChildren }) => {
  const [open, setDatePickerOpen] = useState(false);

  // console.log(rooms);
  // const today = new Date();

  // let nextCusDay = new Date();
  // nextCusDay.setDate(nextCusDay.getDate() + 1);

  // const [dateRange, setDateRange] = useState([today, nextCusDay]);
  // const [startDate, endDate] = dateRange;

  const divToBeClickedRef = useRef(null);
  // const [rooms, setRooms] = useState([
  //   {
  //     adults: 1,
  //     children: 1,
  //     child_age: {
  //       0: 1,
  //     },
  //   },

  //   // {
  //   //   adults: 2,
  //   //   children: 2,
  //   //   child_age: {
  //   //     0: 2,
  //   //     1: 1,
  //   //   },
  //   // },
  //   // {
  //   //   adults: 2,
  //   //   children: 2,
  //   //   child_age: {
  //   //     0: 3,
  //   //     1: 6,
  //   //   },
  //   // },
  // ]);

  // const [searchInputData, setSearchInputData] = useState({
  //   location: "",
  //   search_type: "district",
  //   location_id: 1,
  //   rooms: 2,
  //   adult_guest: 1,
  //   child_guest: 1,
  //   child_age: 1,
  //   guest_session_id: "",
  // });

  // Function to convert date format
  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDivClick = () => {
    if (divToBeClickedRef.current) {
      divToBeClickedRef.current.setOpen(true);
    }
  };

  // const [rooms, setRooms] = useState(initialRooms);
  // const [totalAdults, setTotalAdults] = useState(1);  // Initially 1 adult
  // const [totalChildren, setTotalChildren] = useState(1);  // Initially 1 child

  const updateRooms = (newRooms) => {
    setRooms(newRooms);
    updateGuestCounts(newRooms);
  };

  const updateGuestCounts = (rooms) => {
    const totalAdults = rooms.reduce((total, room) => total + room.adults, 0);
    const totalChildren = rooms.reduce((total, room) => total + room.children, 0);

    setTotalAdults(totalAdults);
    setTotalChildren(totalChildren);
  };

  // const startDate = date[0];
  // const endDate = date[1];

  const startDateformatted = startDate.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const endDateformatted = endDate
    ? endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : startDateformatted;

  const datePickerHandle = (update) => {
    setDateRange(update);
    if (update[1]) {
      onDateChange(update[0]); // Update the parent component with the new date
      setDatePickerOpen(false);
    }
  };
  const [isDivClicked, setDivClicked] = useState(false);
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // const formData = {
    //   value,
    //   startDate,
    //   endDate,
    //   rooms,
    // };
    // console.log(rooms)

    const findMaxChildAge = (rooms) => {
      // Extract all child_age values and flatten them into a single array
      const allAges = rooms.flatMap(room => Object.values(room.child_age));
    
      // Find the maximum age
      const maxAge = Math.max(...allAges);
    
      return maxAge;
    };
    
    const maxChildAge = findMaxChildAge(rooms);
    // console.log("Maximum child age:", maxChildAge);

   

    const searchInfo = {
      location: value,
      search_type: "district",
      location_id: 1,
      check_in: convertDateFormat(new Date(startDate)),
      check_out: convertDateFormat(new Date(endDate)),
      rooms: rooms?.length,
      adult_guest: totalAdults,
      child_guest: totalChildren,
      child_age: maxChildAge,
      guest_session_id: "",
    };
    // console.log(searchInfo);
    
    const queryString = new URLSearchParams(searchInfo).toString();
    navigate(`/search-result-hotel?${queryString}`);
    
  };

  return (
    <div className="main-container mt-[18px] lg:mt-[40px]">

      <form onSubmit={handleSubmit}>
      <div className={`searchBox ${scrollY > 0 ? 'remove-border' : ''}`}>
        <div className='search-input-container'>
          <input 
            type='text' 
            className='search-input'  
            value={value}
            onChange={onChange} 
            placeholder='Search by city, hotel, resort, area'
          />
          <div className='nearme'>
            <img className='gps-image' src={Gps} alt="Near-me" />
            Near Me
          </div>
        </div>

        <div className="checkin-box" onClick={handleDivClick}>
          <div className="datePickerSection">
            <DatePicker
              selected={startDate}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              ref={divToBeClickedRef}
              onChange={datePickerHandle}
              isClearable
              monthsShown={2}
            />
          </div>
          <div className="checkin-checkout-type">CHECK IN</div>
          <div>
            <div className="checkin-checkout-date"> {startDateformatted}</div>
          </div>
        </div>

        <div className="checkout-box" onClick={handleDivClick}>
          <div className="checkin-checkout-type">CHECK OUT</div>
          <div className="checkin-checkout-date"> {endDateformatted}</div>
        </div>

        <div className="Room-Guest-division">
          <div onClick={() => setDivClicked(!isDivClicked)}>
            <div className="Room-Guest-title">ROOM & GUEST</div>
            <div className="Room-Guest-quantity">{rooms.length} Room, {totalAdults + totalChildren} Guest</div>
          </div>

          {isDivClicked && (
            // <RoomGuest
            //   isDivClicked={isDivClicked}
            //   setDivClicked={setDivClicked}
            //   roomsqty={rooms} 
            //   updateRoomsqty={updateRooms}
            // />

            <RoomGuest  isDivClicked={isDivClicked}
            setDivClicked={setDivClicked}
            // roomsqty={rooms} 
            updateRoomsqty={updateRooms}
            rooms = {rooms}
            setRooms = {setRooms}
            />
          )}
        </div>

        <div className='search-button-division'>
          <button  type='submit' className='Search-button'>Search</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default SearchField;