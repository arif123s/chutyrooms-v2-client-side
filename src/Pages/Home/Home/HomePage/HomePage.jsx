import PopularHotels from "./PopularHotels/PopularHotels";
import SearchField from "./SearchField/SearchField";
import './HomePage.css'
import DealMembership from "./DealMembership/DealMembership";
import ExploreCountry from "./ExploreCountry/ExploreCountry";

const HomePage = () => {
    return (
      <div className="custom-container homepage-container">
        {/* <SearchField></SearchField> */}
        {/* <h2 className="text-5xl text-center text-green-700 font-bold text center mt-8">
          Hello Chutyrooms!!
        </h2> */}
        <div className="hotels-membership-container">
          <PopularHotels></PopularHotels>
          <DealMembership></DealMembership>
        </div>
        <ExploreCountry></ExploreCountry>
      </div>
    );
};

export default HomePage;