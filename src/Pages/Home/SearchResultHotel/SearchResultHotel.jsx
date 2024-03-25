import "./SearchResultHotel.css";
// import SearchField from "../Home/HomePage/SearchField/SearchField";
import filterIcon from "../../../assets/icons/filter.svg";
import downloadApp from "../../../assets/download-app.png";
import { useState } from "react";
import FilterContainer from "./FilterContainer";
import SingleHotel from "./SingleHotel";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Loading from "../../Common/Includes/Loading/Loading";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "630px",
  borderRadius: "8px",
};

const SearchResultHotel = () => {
  const [mapView, setMapView] = useState(false);
  const [center, setCenter] = useState({
    lat: 23.862725477930507,
    lng: 90.40080333547479,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY",
    libraries,
  });

  if (loadError) {
    return <div className="text-center py-[60px]">Error loading maps!</div>;
  }

  if (!isLoaded) {
    return <Loading></Loading>;
  }

  return (
    <div className="hotel-search-result-container">
      {/* <div className={`hotel-search-result-container ${mapView? 'bg-[#FFC0CB]':''}`}> */}
      {/* <SearchField></SearchField> */}

      <div className="custom-container filter-hotels-container">
        <div className="filter-mobile filter-container">
          <FilterContainer></FilterContainer>
        </div>

        <div className="w-[1px]  bg-[#A3A3A3] filter-mobile"></div>

        {/* hotel results */}

        <div className="hotels-result-container">
          <div className="flex justify-between  items-start gap-[12px]">
            <h2 className="search-page-title">
              Cox’s Bazar: 25 Properties Found
            </h2>
            <div className="flex items-center w-[120px] lg:w-[130px]">
              <p className="mr-[4px] text-[12px] md:text-[14px] lg:text-[16px]">
                Map View
              </p>
              <input
                type="checkbox"
                className="toggle toggle-success w-[44px] h-[20px] lg:w-[46px] lg:h-[23px]"
                onClick={() => setMapView(!mapView)}
                // checked
              />
            </div>
          </div>
          <div className={`${mapView ? "hidden" : ""}`}>
            {/* <div className="hotels-container"> */}

            {/* </div> */}
            <div className="hotels">
              <SingleHotel></SingleHotel>
              <SingleHotel></SingleHotel>

              {/* <div className="hotel">
              <Swiper
                slidesPerView={1}
                spaceBetween={15}
                navigation={true}
                speed={1000}
                modules={[Autoplay, Navigation]}
                className="mySwiper rounded-[8px] hotel-img-slider"
              >
                <SwiperSlide>
                  <img className="room-img" src={room2} alt="Place" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="room-img" src={room1} alt="Place" />
                </SwiperSlide>
              </Swiper>
              <div className="hotel-details-container">
                <p className="flex justify-center items-center text-[14px] lg:text-[16px] h-[28px] lg:h-[32px] p-[10px] border-[1px] border-[#808783] w-fit rounded-[4px]">
                  Hotels
                </p>
                <div className="flex justify-between mt-[2px]">
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
                      <p className="text-[14px] lg:text-[16px]">
                        4.8 (21 Reviews)
                      </p>
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
                    <p className="line-through font-light text-[#808783]">
                      BDT 5000
                    </p>
                    <h2 className="hotel-name">BDT 2300</h2>
                    <p className="text-[14px] lg:text-[16px]">
                      1 Room, Per Night
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            </div>

            <img className="download-app-img" src={downloadApp} alt="" />

            <div className="hotels">
              <SingleHotel></SingleHotel>
              <SingleHotel></SingleHotel>
            </div>

            <button className="login-btn">See More</button>
          </div>

          {mapView && (
            <div className=" mt-[24px]">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                // mapContainerStyle={"map-view-container"}
                zoom={10}
                // center={center}
                center={center}
                // onLoad={onMapLoad}
                // onClick={(e) => {
                //   setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                //   setValue("map", { lat: e.latLng.lat(), lng: e.latLng.lng() });
                // }}
                // onClick={onMapClick}
                // onClick={handleMapClick}
              >
                {/* {rectangleBounds && (
                <Rectangle bounds={rectangleBounds} onLoad={onRectangleLoad} />
              )} */}
                {/* <Marker position={center} /> */}
                <Marker />
                {/* Additional marker at the search location */}

                <Marker
                  clickable={true}
                  className="pointer-events-none"
                  // position={mapCenter}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Customize the marker icon as needed
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              </GoogleMap>
            </div>
          )}
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div className="sticky bottom-[80px] z-10">
        <button
          className="filter-btn"
          onClick={(e) => {
            e.preventDefault(),
              document.getElementById("filter-hotels-modal").showModal();
          }}
        >
          <img className="mr-[6px]" src={filterIcon} alt="Filter button" />
          <a href="">Filter</a>
        </button>
      </div>
      <dialog id="filter-hotels-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <FilterContainer></FilterContainer>
        </div>
      </dialog>
    </div>
  );
};

export default SearchResultHotel;
