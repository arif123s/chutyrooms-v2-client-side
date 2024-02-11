import "./PopularHotels.css";
import hotel1 from "../../../../../assets/hotel-img/hotel1.png";
import hotel2 from "../../../../../assets/hotel-img/hotel2.png";
import hotel3 from "../../../../../assets/hotel-img/hotel3.png";
import hotel4 from "../../../../../assets/hotel-img/hotel4.png";
import hotel5 from "../../../../../assets/hotel-img/hotel5.png";
import hotel6 from "../../../../../assets/hotel-img/hotel6.png";
import hotel7 from "../../../../../assets/hotel-img/hotel7.png";
import hotel8 from "../../../../../assets/hotel-img/hotel8.png";
import hotel9 from "../../../../../assets/hotel-img/hotel9.png";
import star from "../../../../../assets/icons/star-black.svg";
import location from "../../../../../assets/icons/map-pin.svg";
import favourite from "../../../../../assets/icons/favourite.svg";
// import favouriteGreen from "../../../../../assets/icons/favourite-green.svg";

const PopularHotels = () => {
  return (
    <div className="popular-hotels-container">
      <h2 className="homepage-title">Popular Hotels</h2>
      <div className="hotels-container">
        <div className="relative">
          <div className="w-full">
            <img className="hotel-img" src={hotel1} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="hotel-info">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel2} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="hotel-info">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel3} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="hotel-info">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel4} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="hotel-info">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel5} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="text-[14px]">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel6} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="text-[14px]">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel7} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="text-[14px]">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel8} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="text-[14px]">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>

        <div className="relative">
          <div className="">
            <img className="hotel-img" src={hotel9} alt="" />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <h2 className="hotel-name">Hotel Sea View</h2>
            <div className="flex itens-center gap-[4px]">
              <img className="w-[14px]" src={star} alt="" />
              <span className="hotel-info">4.7</span>
            </div>
          </div>
          <div className="flex items-center mt-[2px] gap-[6px]">
            <img src={location} alt="" />
            <span className="hotel-info">Cox’s Bazar</span>
          </div>
          <p className="mt-[6px] hotel-info">
            <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
          </p>
          <img className="absolute top-3 right-3" src={favourite} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PopularHotels;