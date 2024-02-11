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
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const DealMembership = () => {
  // const [swiperSettings, setSwiperSettings] = useState({
  //  slidesPerView:"auto",
  //         spaceBetween:30,
  //         centeredSlides:true,
  //         loop:true,
  //         autoplay:{
  //           delay: 2000,
  //           disableOnInteraction: false,
  //         },
  //         speed:1000,
  //         modules:[Autoplay, Pagination, Navigation],
  //         className:"mySwiper rounded-[8px]"
  // });

  // useEffect(() => {
  //   function handleResize() {
  //     const windowWidth = window.innerWidth;
  //     // Adjust settings based on window width
  //     if (windowWidth < 575) {
  //       setSwiperSettings({
  //         ...swiperSettings,
  //         slidesPerView: 1.3,
  //         spaceBetween: 10,
  //       });
  //     }
  //      if (windowWidth > 575 && windowWidth<767){
  //        setSwiperSettings({
  //          ...swiperSettings,
  //          slidesPerView: 2,
  //        });
  //      }
  //     else {
  //       setSwiperSettings({
  //         ...swiperSettings,
  //         spaceBetween: 30,
  //       });
  //     }
  //   }

  //   // Initial call to set initial settings
  //   handleResize();

  //   // Event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const images = [platinum, gold, silver];

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
          <img className="membership-card" src={platinum} alt="" />
          <img className="membership-card" src={gold} alt="" />
          <img className="membership-card" src={silver} alt="" />
        </div>
      </div>
      <div className="membership-cards-slider">
        <div className="flex">
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
          spaceBetween={20}
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
            <img className="membership-card" src={platinum} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="membership-card" src={gold} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="membership-card" src={silver} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default DealMembership;
