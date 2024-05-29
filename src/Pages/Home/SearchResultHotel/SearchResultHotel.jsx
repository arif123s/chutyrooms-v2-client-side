import "./SearchResultHotel.css";
// import SearchField from "../Home/HomePage/SearchField/SearchField";
import filterIcon from "../../../assets/icons/filter.svg";
import downloadApp from "../../../assets/download-app.png";
import { useEffect, useState } from "react";
import FilterContainer from "./FilterContainer";
import SingleHotel from "./SingleHotel";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Loading from "../../Common/Includes/Loading/Loading";
import { useLocation } from "react-router-dom";
import { useGetAllSearchResultHotelsQuery } from "../../../redux/features/searchProperty/searchResultHotel.api";

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const searchInfo = {
    location: searchParams.get("location"),
    search_type: searchParams.get("search_type"),
    location_id: parseInt(searchParams.get("location_id")),
    check_in: searchParams.get("check_in"),
    check_out: searchParams.get("check_out"),
    rooms: parseInt(searchParams.get("rooms")),
    adult_guest: parseInt(searchParams.get("adult_guest")),
    child_guest: parseInt(searchParams.get("child_guest")),
    child_age: parseInt(searchParams.get("child_age")),
    guest_session_id: searchParams.get("guest_session_id"),
  };

  console.log(searchInfo);

  const {
    data: searchData,
    error,
    isLoading,
  } = useGetAllSearchResultHotelsQuery(searchInfo);
  let hotelResult;

  console.log(searchData);
console.log('length',searchData?.data?.hotels_data?.data);
//   if (searchData?.hotels_data?.data) {
//     if (searchData?.hotels_data?.data?.length > 0) {
// hotelResult = 
//     }
//   }

  if (loadError) {
    return <div className="text-center py-[60px]">Error loading maps!</div>;
  }

  if (!isLoaded || isLoading) {
    return <Loading></Loading>;
  }

  // if (!searchData?.status)
  //   return <div className="text-center mt-[28px]">Error!!</div>;

  return (
    <div className="hotel-search-result-container">
      {/* <div className={`hotel-search-result-container ${mapView? 'bg-[#FFC0CB]':''}`}> */}
      {/* <SearchField></SearchField> */}

      <div className="custom-container filter-hotels-container">
        <div className="filter-mobile filter-container">
          <FilterContainer searchData={searchData?.data}></FilterContainer>
        </div>

        <div className="w-[1px]  bg-[#A3A3A3] filter-mobile"></div>

        {/* hotel results */}

        {searchData?.data?.hotels_data?.data ? (
          <div className="hotels-result-container">
            <div className="flex justify-between  items-start gap-[12px]">
              <h2 className="search-page-title">
                {searchData?.data?.hotels_data?.data?.length}{" "}
                {searchData?.data?.hotels_data?.data?.length > 1
                  ? "Properties"
                  : "Property"}{" "}
                Found
              </h2>
              <div className="flex items-center w-[120px] lg:w-[130px]">
                <p className="mr-[4px] text-[12px] md:text-[14px] lg:text-[16px]">
                  Map View
                </p>
                <input
                  type="checkbox"
                  className="toggle toggle-success w-[44px] h-[20px] lg:w-[46px] lg:h-[23px]"
                  onClick={() => setMapView(!mapView)}
                />
              </div>
            </div>
            <div className={`${mapView ? "hidden" : ""}`}>
              <div className="hotels">
                {searchData?.data?.hotels_data?.data?.map((hotel) => (
                  <SingleHotel
                    key={hotel?.property_id}
                    hotel={hotel}
                  ></SingleHotel>
                ))}

                {/* <SingleHotel></SingleHotel> */}
              </div>

              <img className="download-app-img" src={downloadApp} alt="" />

              {/* <div className="hotels">
                <SingleHotel></SingleHotel>
                <SingleHotel></SingleHotel>
              </div> */}

              <button className="login-btn">See More</button>
            </div>

            {mapView && (
              <div className=" mt-[24px]">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                >
                  <Marker />

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
        ) : (
          <h2 className="hotels-result-container font-['Gilroy-semibold'] text-[20px]">
            No properties found!
          </h2>
        )}
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div className="sticky bottom-[30px] z-10">
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
