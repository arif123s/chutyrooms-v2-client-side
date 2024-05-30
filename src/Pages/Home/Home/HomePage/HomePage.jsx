import  { useEffect, useState } from "react";
import { useHomePageDataQuery } from "../../../../redux/features/HomePage/index.api";
import PopularHotels from "./PopularHotels/PopularHotels";
import SearchField from "./SearchField/SearchField";
import "./HomePage.css";
import DealMembership from "./DealMembership/DealMembership";
import ExploreCountry from "./ExploreCountry/ExploreCountry";
import ChutyLogo from "../../../../assets/icons/chuty-logo.png";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isOtherDivVisible, setIsOtherDivVisible] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [searchDate, setSearchDate] = useState([new Date(), new Date()]);
  // const initialRooms = [{
  //   adults: 1,  // Default value for adults
  //   children: 1,  // Default value for children
  //   child_age: {},  // Assuming no children initially
  // }];
  // const [rooms, setRooms] = useState(initialRooms);
  const [rooms, setRooms] = useState([
    {
      adults: 1,
      children: 1,
      child_age: {
        0: 1,
      },
    },
   
  ]);
  const [totalAdults, setTotalAdults] = useState(1);  // Initially 1 adult
  const [totalChildren, setTotalChildren] = useState(1);  // Initially 1 child
  const today = new Date();
  let nextCusDay = new Date();
  nextCusDay.setDate(nextCusDay.getDate() + 1);
  const [dateRange, setDateRange] = useState([today, nextCusDay]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const { data } = useHomePageDataQuery();
  const popularProperties = data?.data?.properties;
  const membershipCards = data?.data?.memberships;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHidden(scrollY === 0);
      setIsSticky(scrollY > 0);
      setIsOtherDivVisible(scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <div>
      <div
        className={`scroll-show-sticky ${isHidden ? "hide" : ""} ${
          isSticky ? "sticky" : ""
        }`}
      >
        <img src={ChutyLogo} className="stickyLogo" alt="Chuty Logo" />
        <div className="w-full">
          <SearchField
            value={searchValue}
            onChange={handleSearchChange}
            date={searchDate}
            onDateChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            setDateRange={setDateRange}
            rooms={rooms}
            setRooms={setRooms}
            totalAdults={totalAdults}
            setTotalAdults={setTotalAdults}
            totalChildren={totalChildren}
            setTotalChildren={setTotalChildren}
          />
        </div>
      </div>
      <div className="custom-container homepage-container">
        {isOtherDivVisible && (
          <div className="mt-[40px] custom-container">
            <SearchField
              value={searchValue}
              onChange={handleSearchChange}
              date={searchDate}
              onDateChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              rooms={rooms}
              setRooms={setRooms}
              totalAdults={totalAdults}
              setTotalAdults={setTotalAdults}
              totalChildren={totalChildren}
              setTotalChildren={setTotalChildren}
            />
          </div>
        )}
        <div className="hotels-membership-container">
          <PopularHotels popularProperties={popularProperties} />
          <DealMembership membershipCards={membershipCards} />
        </div>
        <ExploreCountry />
      </div>
    </div>
  );
};

export default HomePage;