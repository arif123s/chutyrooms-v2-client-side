import { useEffect } from "react";
import { useState } from "react";
import PopularHotels from "./PopularHotels/PopularHotels";
import SearchField from "./SearchField/SearchField";
import "./HomePage.css";
import DealMembership from "./DealMembership/DealMembership";
import ExploreCountry from "./ExploreCountry/ExploreCountry";
import chat from "../../../../assets/icons/chat-bot.svg";
import ChutyLogo from "../../../../assets/icons/chuty-logo.png";

const HomePage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Set the state based on the scroll position
      setIsHidden(scrollY === 0);
      setIsSticky(scrollY > 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        className={`scroll-show-sticky ${isHidden ? "hide" : ""}  ${
          isSticky ? "sticky" : ""
        }`}
      >
        <img src={ChutyLogo} className="stickyLogo"></img>
        <div className="w-full">
          <SearchField></SearchField>
        </div>
      </div>

      <div className="custom-container homepage-container">
        {/* <SearchField></SearchField> */}
        <div className="mt-[40px] custom-container">
          <SearchField></SearchField>
        </div>
        <div className="hotels-membership-container">
          <PopularHotels></PopularHotels>
          <DealMembership></DealMembership>
        </div>
        <ExploreCountry></ExploreCountry>
        {/* <div className="chat-box">
          <img
            className="w-[18px] md:w-[22px] lg:w-[24px]"
            src={chat}
            alt="Chat"
          />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
