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
  const [childLocation, setChildLocation] = useState({
    location_id: 0,
    search_type: "",
  });
  const [priceRange, setPriceRange] = useState({
    lowestPrice: 0,
    highestPrice: 0,
  });
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [accommodation_types, setAccommodationTypes] = useState([]);
  const [facilities, setFacilities] = useState([]);
  // console.log(accommodation_types);

  const [searchInfo, setSearchInfo] = useState({
    location: searchParams.get("location"),
    search_type: searchParams.get("search_type"),
    location_id: parseInt(searchParams.get("location_id")),
    check_in: searchParams.get("check_in"),
    check_out: searchParams.get("check_out"),
    rooms: parseInt(searchParams.get("rooms")),
    adult_guest: parseInt(searchParams.get("adult_guest")),
    child_guest: parseInt(searchParams.get("child_guest")),
    child_age: parseInt(searchParams.get("child_age")),
  });
  const [filterProperty, setFilterProperty] = useState({
    guest_session_id: searchParams.get("guest_session_id"),
    start_price: null,
    end_price: null,
    hotel_class: null,
    sort_by: null,
    accommodation_types: [],
    facilities: [],
  });

  const searchQuery = {
    searchInfo,
    filterProperty,
  };
  // console.log(searchQuery);

  const {
    data: searchData,
    isLoading,
    refetch,
  } = useGetAllSearchResultHotelsQuery(searchQuery);
  // console.log(searchData);

  let hotelResult;

  //   if (searchData?.hotels_data?.data) {
  //     if (searchData?.hotels_data?.data?.length > 0) {
  // hotelResult =
  //     }
  //   }
  useEffect(() => {
    // Update filter property when priceRange changes
    setFilterProperty({
      ...filterProperty,
      sort_by: sortBy,
      start_price: parseInt(priceRange.lowestPrice),
      end_price: parseInt(priceRange.highestPrice),
      hotel_class: rating ? parseFloat(rating) : null,
      accommodation_types: accommodation_types
        .filter((type) => type?.isChecked == true)
        .map((type) => type.id),
      facilities: facilities
        .filter((type) => type?.isChecked == true)
        .map((type) => type.id),
    });
    refetch();
  }, [priceRange, rating, accommodation_types, facilities, sortBy, refetch]);

  useEffect(() => {
    setChildLocation({
      ...childLocation,
      location_id: parseInt(searchParams.get("location_id")),
      search_type: searchParams.get("search_type"),
    });
  }, []);

  useEffect(() => {
    setSearchInfo({
      ...searchInfo,
      location_id: childLocation.location_id,
      search_type: childLocation.search_type,
    });
    refetch();
  }, [childLocation.location_id, childLocation.search_type, refetch]);

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
          <FilterContainer
            searchData={searchData?.data}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            accommodation_types={accommodation_types}
            setAccommodationTypes={setAccommodationTypes}
            rating={rating}
            setRating={setRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            facilities={facilities}
            setFacilities={setFacilities}
            childLocation={childLocation}
            setChildLocation={setChildLocation}
          ></FilterContainer>
        </div>

        <div className="w-[1px]  bg-[#A3A3A3] filter-mobile"></div>

        {/* hotel results */}

        {searchData?.data?.hotels_data?.data ? (
          <div className="hotels-result-container">
            <div className="flex justify-between  items-start gap-[12px]">
              <h2 className="search-page-title">
                ChutyRooms: {searchData?.data?.hotels_data?.data?.length}{" "}
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
                    searchInfo = {searchInfo}
                  ></SingleHotel>
                ))}

                {/* <SingleHotel></SingleHotel> */}
              </div>

              <img className="download-app-img" src={downloadApp} alt="" />

              {/* <div className="hotels">
                <SingleHotel></SingleHotel>
                <SingleHotel></SingleHotel>
              </div> */}

              {/* <button className="login-btn">See More</button> */}
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
            ChutyRooms: No property found!
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
          <FilterContainer
            searchData={searchData?.data}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            accommodation_types={accommodation_types}
            setAccommodationTypes={setAccommodationTypes}
            rating={rating}
            setRating={setRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            facilities={facilities}
            setFacilities={setFacilities}
            childLocation={childLocation}
            setChildLocation={setChildLocation}
          ></FilterContainer>
        </div>
      </dialog>
    </div>
  );
};

export default SearchResultHotel;
