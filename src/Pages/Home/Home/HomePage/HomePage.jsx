import PopularHotels from "./PopularHotels/PopularHotels";
import SearchField from "./SearchField/SearchField";
import "./HomePage.css";
import DealMembership from "./DealMembership/DealMembership";
import ExploreCountry from "./ExploreCountry/ExploreCountry";
import chat from "../../../../assets/icons/chat-bot.svg";

const HomePage = () => {
  return (
    <div className="custom-container homepage-container relative">
      {/* <SearchField></SearchField> */}
      <div className="hotels-membership-container">
        <PopularHotels></PopularHotels>
        <DealMembership></DealMembership>
      </div>
      <ExploreCountry></ExploreCountry>
      <div className="w-[60px] h-[60px] bg-[#159947] rounded-full flex justify-center items-center absolute bottom-[280px] right-0 z-10">
        <img className="" src={chat} alt="Chat" />
      </div>
    </div>
  );
};

export default HomePage;
