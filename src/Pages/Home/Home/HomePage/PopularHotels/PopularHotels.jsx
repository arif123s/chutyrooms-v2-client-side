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
import favouriteIcon from "../../../../../assets/icons/favourite.svg";
import favouriteGreen from "../../../../../assets/icons/favourite-green.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopularHotels = ( {popularProperties ,startDate , endDate ,rooms , totalAdults , totalChildren , child_age}) => {
  const [favourite, setFavourite] = useState(false);
  const navigate = useNavigate();
  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };


  



 

  //  console.log(popularProperties ,startDate , endDate ,rooms , totalAdults , totalChildren , child_age )

  if (!Array.isArray(popularProperties)) {
    console.error("Expected an array, received:", popularProperties);
    return null; // Or handle the error gracefully
  }

 

  function getProperty(propertyId , location)
  {
    // alert(propertyId);

    const hotelSearchInfo = {
      location : location,
      search_type: "property",
      location_id: propertyId,
      check_in: convertDateFormat(new Date(startDate)),
      check_out: convertDateFormat(new Date(endDate)),
      rooms: rooms?.length,
      adult_guest: totalAdults,
      child_guest: totalChildren,
      child_age: child_age,
      guest_session_id: "",
   
      
    };
 

    // console.log(hotelSearchInfo);
    

  
    const queryString = new URLSearchParams(hotelSearchInfo).toString();
    navigate(`/hotel-details?${queryString}`);
  }



  return (
    <div className="popular-hotels-container">
      <h2 className="homepage-title">Popular Hotels</h2>
      <div className="hotels-container">
        {popularProperties.map((popularHotel) => (
          <div key={popularHotel.id} className="relative" onClick={()=> getProperty(popularHotel.id , popularHotel.location)}>
            <div className="w-full">
              <img className="hotel-img" src={popularHotel.image} alt="" />
            </div>
            <div className="flex justify-between items-center mt-[8px]">
              <h2 className="hotel-name">{popularHotel.name}</h2>
              <div className="flex itens-center gap-[4px]">
                <img className="w-[14px]" src={star} alt="" />
                <span className="hotel-info">4.7</span>
              </div>
            </div>
            <div className="flex items-center mt-[2px] gap-[6px]">
              <img src={location} alt="" />
              <span className="hotel-info">{popularHotel.location}</span>
            </div>
            <p className="mt-[6px] hotel-info">
              <span className="font-['Gilroy-bold']">BDT 2100</span> Per Night
            </p>
            <img
              onClick={() => setFavourite(!favourite)}
              className="w-[24px] absolute top-3 right-3"
              src={favourite ? favouriteGreen : favouriteIcon}
              alt="hotel img"
            />
          </div>
        ))}

        {/* <div className="relative">
          <div className="">
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
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
          <img
            onClick={() => setFavourite(!favourite)}
            className="w-[24px] absolute top-3 right-3"
            src={favourite ? favouriteGreen : favouriteIcon}
            alt="hotel img"
          />
        </div>  */}
      </div>

      <div className="text-center mt-[20px] md:mt-[24px] lg:hidden">
        <button className=" bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0 hover:bg-[#016A29] transition-all">
          Show More
        </button>
      </div>
    </div>
  );
};

export default PopularHotels;
