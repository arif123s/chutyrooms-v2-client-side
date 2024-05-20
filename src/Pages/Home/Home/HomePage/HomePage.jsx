import { useEffect } from "react";
import { useState } from "react";
import { useHomePageDataQuery } from "../../../../redux/features/HomePage/index.api";
import PopularHotels from "./PopularHotels/PopularHotels";
import SearchField from "./SearchField/SearchField";
import "./HomePage.css";
import DealMembership from "./DealMembership/DealMembership";
import ExploreCountry from "./ExploreCountry/ExploreCountry";
import chat from "../../../../assets/icons/chat-bot.svg";
import ChutyLogo from "../../../../assets/icons/chuty-logo.png";
import Loading from "../../../Common/Includes/Loading/Loading";

const HomePage = () => {
  
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isOtherDivVisible, setIsOtherDivVisible] = useState(true);

  const { data, isLoading, refetch } = useHomePageDataQuery();
 
  const popularProperties = data?.data?.properties;
  const membershipCards  = data?.data?.memberships;

  console.log("popularProperties", popularProperties);
  console.log("membershipCards", membershipCards);



  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Set the state based on the scroll position
      setIsHidden(scrollY === 0);
      setIsSticky(scrollY > 0);
      setIsOtherDivVisible(!isSticky);
      setIsOtherDivVisible(scrollY === 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  //  if (isLoading) {
  //    return <Loading></Loading>;
  //  }

  return (
    <div>
      <div
        className={`scroll-show-sticky ${isHidden ? "hide" : ""}  ${
          isSticky ? "sticky" : "hidden"
        }`}
      >
        <img src={ChutyLogo} className="stickyLogo"></img>
        <div className="w-full ">
          <SearchField></SearchField>
        </div>
      </div>

      <div className="custom-container homepage-container">
        {/* <SearchField></SearchField> */}
        {isOtherDivVisible && (
          <div className="mt-[40px] custom-container">
            <SearchField></SearchField>
          </div>
        )}
        <div className="hotels-membership-container">
          <PopularHotels popularProperties={popularProperties}></PopularHotels>
          <DealMembership sentValue={membershipCards}></DealMembership>
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
