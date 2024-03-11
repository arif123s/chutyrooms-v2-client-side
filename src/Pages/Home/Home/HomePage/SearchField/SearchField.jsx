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
  // const nextday = new Date();
  // // const [startDate, setStartDate] = useState(new Date());
  // const [nextDate, setNextDate] = useState();

  // useEffect(() => {
  //     // Calculate next date by adding one day to the current date
  //     const nextDay = new Date(startDate);
  //     nextDay.setDate(startDate.getDate() + 1);
  //     // setNextDate(nextDay);
  //   }, [startDate]);

  // Calculate the next date
  // const nextDate = new Date();
  // const [nextDay, setNextDay] = useState(nextDate.setDate(startDate.getDate() + 1));
  //   nextDate.setDate(currentDate.getDate() + 1);
  // Calculate the next date
  //   const nextDate = new Date();
  //   nextDate.setDate(currentDate.getDate() + 1);

  // const [dateRanges, setDateRanges] = useState([]);
  // Get the next day
  // nextday.setDate(nextday.getDate() + 1);

  // Get the next month
  // nextday.setMonth(nextday.getMonth());

  // Get the next year
  // nextday.setFullYear(nextday.getFullYear());

  // const [endDate, setEndDate] = useState(nextday);

  // console.log(today, nextday);
  // console.log(endDate);

  // const handleDateChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end ?? new Date());
  //   // console.log(dates);
  // };

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
      // divToBeClickedRef.current.setOpen(false);
      seDatePickerOpen(false);
    }
  };

  //     const [isRoomGuestVisible, setIsVisible] = useState(false);

  // const RoomGuestVisibility = () => {
  //   setIsVisible(true);
  //   setIsVisible(!isRoomGuestVisible);
  // };

  const [isDivClicked, setDivClicked] = useState(false);

  // const clickedDiv = () => {
  //   if(isDivClicked == false)
  //   {
  //     setDivClicked(true);
  //   }
  //   else if(isDivClicked == true){
  //   setDivClicked(false);
  //   }
  // };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search-result-hotel");
  };

  return (
    <div className="custom-container ">
      <div className="main-container">
        {/* <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
      />
      <br />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        monthsShown={2}
      /> */}

        <div className="searchBox ">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by city,hotel,resort,area"
            ></input>
            <div className="nearme">
              <img className="gps-image" src={Gps}></img>
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
                // open={open}
                onChange={(update) => {
                  setDateRange(update);

                  datePickerHandle(update);
                }}
                // withPortal
                // onCalendarClose={datePickerHandle}
                isClearable
                monthsShown={2}
              />
            </div>
            <div className="checkin-checkout-type">CHECK IN</div>

            <div>
              <div className="checkin-checkout-date"> {startDateformatted}</div>
              {/* <DatePicker
          selected={dateRanges[0]}
          onChange={handleDateRangeChange}
          startDate={dateRanges[0]}
          endDate={dateRanges[1]}
          selectsRange
        //   inline
          calendarClassName="date-range-picker-calendar"
          monthsShown={2}
        /> */}

              {/* <DatePicker
        // selected={dateRanges}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={dateRanges[0]}
        endDate={dateRanges[1]}
        // minDate={new Date()}
        // placeholderText="Select check-in date"
        selectsRange
       
        calendarClassName="date-range-picker-calendar"
        monthsShown={2}
      /> */}

              {/* <DatePicker
        selectsRange
        startDate={startDate}
       endDate={endDate}
        onChange={handleDateChange}
        ref={divToBeClickedRef}
    
        // dropdownMode="select"
        // dateFormat="MM/dd/yyyy"
        dateFormat="MM/dd/yyyy"
        isClearable
        monthsShown={2}
      /> */}
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

            {/* <div className={`${isDivClicked ? 'open' : 'closed'}`} >
                <RoomGuest/>  
                </div>
                 */}
          </div>

          <div className="search-button-division">
            <button
              onClick={(e) => handleSearch(e)}
              type="button"
              className="Search-button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
