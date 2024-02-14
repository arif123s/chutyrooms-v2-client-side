import "./DealMembership.css";
import platinum from "../../../../../assets/membership/platinum.png";
import gold from "../../../../../assets/membership/gold.png";
import silver from "../../../../../assets/membership/silver.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const DealMembership = () => {

  return (
    <div className="deal-membership-container">
      <div className="membership-cards-large">
        <div className="text-center h-[78px]">
          <span className="membership-title tracking-[2.88px] mr-[4px]">
            Deal
          </span>
          <span className="membership-title text-green-600 tracking-[2.88px]">
            Membership,
          </span>
          <span className="membership-title block">Get Discount!</span>
        </div>
        <div className="membership-cards">
          <img className="membership-card" src={platinum} alt="Platinum card" />
          <img className="membership-card" src={gold} alt="Gold card" />
          <img className="membership-card" src={silver} alt="Silver card" />
        </div>
      </div>
      <div className="membership-cards-slider">
        <div className="flex ml-[-4px]">
          <span className="membership-title tracking-[2.88px] mr-[4px]">
            Deal
          </span>
          <span className="membership-title text-green-600 tracking-[2.88px]">
            Membership,
          </span>
          <span className="membership-title block">Get Discount!</span>
        </div>
        <Swiper
          // slidesPerView={1.2}
          spaceBetween={15}
          // centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          className="mySwiper rounded-[8px] mt-[18px]"
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            575: {
              slidesPerView: 2,
            },
            // 600: {
            //   slidesPerView: 2,
            // },
            1200: {
              slidesPerView: 2,
            },
          }}
        >
          {/* <Swiper {...swiperSettings}> */}
          <SwiperSlide>
            <img
              className="membership-card"
              src={platinum}
              alt="Platinum card"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img className="membership-card" src={gold} alt="Gold card" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="membership-card" src={silver} alt="Silver card" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default DealMembership;
