import "./ExploreCountry.css";
import place1 from "../../../../../assets/places/place1.png";
import place2 from "../../../../../assets/places/place2.png";
import place3 from "../../../../../assets/places/place3.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const ExploreCountry = () => {
  return (
    <div className="pr-[6px]">
      <h2 className="homepage-title">Explore Bangladesh</h2>
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
            slidesPerView: 3,
          },
        //   1400: {
        //     slidesPerView: 3,
        //   },
        }}
      >
        {/* <Swiper {...swiperSettings}> */}
        <SwiperSlide>
          <img className="" src={place1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="" src={place2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="" src={place3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ExploreCountry;