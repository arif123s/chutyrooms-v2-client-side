import { useEffect, useRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import RoomGuest from "./RoomGuest";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchField.css";
import Gps from "./../../../../../assets/icons/gps.svg";
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
  const [rooms, setRooms] = useState([
    {
      adults: 1,
      children: 1,
      child_age: {
        0: 1,
      },
    },
    // {
    //   adults: 2,
    //   children: 2,
    //   child_age: {
    //     0: 2,
    //     1: 1,
    //   },
    // },
    // {
    //   adults: 2,
    //   children: 2,
    //   child_age: {
    //     0: 3,
    //     1: 6,
    //   },
    // },
  ]);

  const [searchInputData, setSearchInputData] = useState({
    location: "",
    search_type: "district",
    location_id: 1,
    rooms: 2,
    adult_guest: 1,
    child_guest: 1,
    child_age: 1,
    guest_session_id: "",
  });
 
  console.log(rooms);
  console.log(searchInputData); 

  // Function to convert date format
  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInfo = {
      location: searchInputData.location,
      search_type: searchInputData.search_type,
      location_id: searchInputData.location_id,
      check_in: convertDateFormat(new Date(startDate)),
      check_out: convertDateFormat(new Date(endDate)),
      rooms: searchInputData.rooms,
      adult_guest: searchInputData.adult_guest,
      child_guest: searchInputData.child_guest,
      child_age: searchInputData.child_age,
      guest_session_id: "",
    };
    console.log(searchInfo);

    const queryString = new URLSearchParams(searchInfo).toString();
    navigate(`/search-result-hotel?${queryString}`);
  };

  return (
    <div className="mt-[12px] md:mt-[24px] lg:mt-[36px]">
      {/* <div className="custom-container "> */}
      <div className="main-container">
        <div className={`searchBox ${scrollY > 0 ? "remove-border" : ""}`}>
          <div className="search-input-container">
            <input
              name="location"
              onChange={(e) =>
                setSearchInputData({
                  ...searchInputData,
                  location: e.target.value,
                })
              }
              type="text"
              className="search-input"
              placeholder="Search by city,hotel,resort,area"
            ></input>
            <div className="nearme">
              <img className="gps-image" src={Gps} alt="Near-me"></img>
              Near Me
            </div>
          </div>

          <div className="checkin-box" onClick={handleDivClick}>
            <div className="datePickerSection">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
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
                rooms={rooms}
                setRooms={setRooms}
                isDivClicked={isDivClicked}
                setDivClicked={setDivClicked}
              ></RoomGuest>
            )}
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
