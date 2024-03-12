import PopularHotels from "./PopularHotels/PopularHotels";
// import SearchField from "./SearchField/SearchField";
import "./HomePage.css";
import DealMembership from "./DealMembership/DealMembership";
import ExploreCountry from "./ExploreCountry/ExploreCountry";
import chat from "../../../../assets/icons/chat-bot.svg";

const HomePage = () => {

  return (
    <div className="custom-container homepage-container">
      {/* <SearchField></SearchField> */}
      <div className="hotels-membership-container">
        <PopularHotels></PopularHotels>
        <DealMembership></DealMembership>
      </div>
      <ExploreCountry></ExploreCountry>
      <div className="chat-box">
        <img className="w-[18px] md:w-[22px] lg:w-[24px]" src={chat} alt="Chat" />
      </div> 
    </div>
  );
};

export default HomePage;
