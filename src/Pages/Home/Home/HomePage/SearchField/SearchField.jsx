import React, { useEffect, useRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import RoomGuest from "./RoomGuest";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchField.css";
import Gps from "./../../../../../assets/icons/gps.svg";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const SearchField = () => {
  const [open, seDatePickerOpen] = useState(false);
  const today = new Date();

  let nextCusDay = new Date();
  nextCusDay.setDate(nextCusDay.getDate() + 1);

  // Get the next month
  nextCusDay.setMonth(nextCusDay.getMonth());

  // Get the next year
  nextCusDay.setFullYear(nextCusDay.getFullYear());

  nextCusDay = new Date(nextCusDay);

  const [dateRange, setDateRange] = useState([today, nextCusDay]);
  const [startDate, endDate] = dateRange;
  const [calendarVisible, setCalendarVisible] = useState(true);
  const divToBeClickedRef = useRef(null);

  const handleDivClick = () => {
    // setCalendarVisible(true);
    // setCalendarVisible(true);
    // setCalendarVisible(!calendarVisible);
    if (divToBeClickedRef.current) {
      divToBeClickedRef.current.setOpen(true);
    }
    // seDatePickerOpen(true);
  };

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

  const datePickerHandle = (dates) => {
    if (dates[1]) {
      console.log(dates[1]);
      seDatePickerOpen(false);
    }
  };

 

  const [isDivClicked, setDivClicked] = useState(false);


  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search-result-hotel");
  }




  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return (


    
    <div className=" ">
    {/* <div className="custom-container "> */}
      <div className="main-container">
       <div  className={`searchBox ${scrollY > 0 ? 'remove-border' : ''}`}>
          <div className='search-input-container'>
                  <input type='text' className='search-input' placeholder='Search by city,hotel,resort,area'></input>
                  <div className='nearme'>
                      <img className='gps-image' src={Gps}></img>
                      Near Me
                  </div>
          </div>
        
        <div className="checkin-box" onClick={handleDivClick}>
            <div className="datePickerSection">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                ref={divToBeClickedRef}
                onChange={(update) => {
                  setDateRange(update);
                  datePickerHandle(update);
                }}
             
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
              <div className="Room-Guest-quantity">1 Room, 2 Guest </div>
            </div>

            {isDivClicked && (
              <RoomGuest
                isDivClicked={isDivClicked}
                setDivClicked={setDivClicked}
              ></RoomGuest>
            )}
          </div>

            <div className='search-button-division'>
                <button onClick={(e)=>handleSearch(e)} type='button' className='Search-button'>Search</button>
            </div>
          </div>
      </div>

      </div>
    
  
  );
};

export default SearchField;
