import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import room1 from "../../../assets/room-img/room1.png";
import room2 from "../../../assets/room-img/room2.png";
import location from "../../../assets/icons/map-pin.svg";
import starFill from "../../../assets/icons/star-fill.svg";
import starBlank from "../../../assets/icons/star-blank.svg";
import tickCircle from "../../../assets/icons/tick-circle.svg";
import favourite from "../../../assets/icons/favourite.svg";

const SingleHotel = () => {
  return (
    <div className="hotel">
      <div className="hotel-img-slider relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          speed={1000}
          modules={[Autoplay, Navigation]}
          className="mySwiper rounded-[8px] "
        >
          <SwiperSlide>
            <img className="room-img" src={room1} alt="Place" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="room-img" src={room2} alt="Place" />
          </SwiperSlide>
        </Swiper>

        <div className="absolute top-[16px] z-10 flex justify-between w-full px-[16px]">
          <div className="flex h-8 p-2.5 bg-zinc-500 rounded-[5px] border border-white justify-center items-center gap-1 lg:gap-2">
            <div className="ratings">
              <img src={starFill} alt="" />
            </div>
            <p className="text-white text-[14px] lg:text-[16px]">
              <span className="mr-[2px]">4</span>Star
            </p>
          </div>
          <img src={favourite} alt="favourite icon" />
        </div>
      </div>
      <div className="hotel-details-container">
        <p className="flex justify-center items-center text-[14px] lg:text-[16px] h-[28px] lg:h-[32px] p-[10px] border-[1px] border-[#808783] w-fit rounded-[4px]">
          Hotels
        </p>
        <div className="flex justify-between mt-[2px] gap-[0px]">
          <div>
            <div className="flex items-center">
              <h2 className="hotel-name mr-[8px]">Hotel Sea View</h2>
              <p className="flex items-center h-[24px] w-fit px-[10px] bg-[#159947] text-[10px] text-white rounded-[4px]">
                CR000002CX
              </p>
            </div>
            <div className="flex items-center mt-[0px] gap-[6px]">
              <img src={location} alt="" />
              <span className="hotel-info">Cox’s Bazar</span>
            </div>
            <div className="flex my-[4px]">
              <div className="ratings">
                <img className="mr-[2px]" src={starFill} alt="rating" />
                <img className="mr-[2px]" src={starFill} alt="rating" />
                <img className="mr-[2px]" src={starFill} alt="rating" />
                <img className="mr-[2px]" src={starFill} alt="rating" />
                <img className="" src={starBlank} alt="rating" />
              </div>
              <p className="text-[14px] lg:text-[16px]">4.8 (21 Reviews) </p>
            </div>
            <div className="flex gap-[8px] text-[14px] lg:text-[16px]">
              <div className="flex">
                <img
                  className="w-[20px] mr-[3px]"
                  src={tickCircle}
                  alt="tick circle icon"
                />
                <p>CCTV</p>
              </div>
              <div className="flex">
                <img
                  className="w-[20px] mr-[3px]"
                  src={tickCircle}
                  alt="tick circle icon"
                />
                <p>Restaurant</p>
              </div>
              <p className="text-[#159947]">20+ More</p>
            </div>
            <button className="bg-[#159947] h-[40px] lg:h-[44px] flex items-center cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0 mt-[10px]">
              Book Now
            </button>
          </div>
          <div>
            <p className="line-through font-light text-[#808783]">BDT 5000</p>
            <h2 className="hotel-name">BDT 2300</h2>
            <p className="text-[14px] lg:text-[16px]">1 Room, Per Night</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;