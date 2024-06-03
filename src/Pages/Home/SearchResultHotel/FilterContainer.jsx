/* eslint-disable react/prop-types */
import { Rating, Slider } from "@mui/material";
import addIcon from "../../../assets/icons/addIcon.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";
import checkboxIcon from "../../../assets/icons/square.svg";
import checkboxTickIcon from "../../../assets/icons/square-tick.svg";
import searchIcon from "../../../assets/icons/search-normal.svg";
import { useEffect, useRef, useState } from "react";

const FilterContainer = ({
  searchData,
  priceRange,
  setPriceRange,
  accommodation_types,
  setAccommodationTypes,
  facilities,
  setFacilities,
  setRating,
  setSortBy,
  childLocation,
  setChildLocation,
}) => {
  const [value, setValue] = useState([0, 200000]);
  // const [priceRange, setPriceRange] = useState({
  //   lowestPrice: 0,
  //   highestPrice: 0,
  // });

  const [allChildLocation, setAllChildLocation] = useState(false);
  const [allFacilities, setAllFacilities] = useState(false);
  const [allAccomodationType, setAllAccomodationType] = useState(false);
 

  console.log("childLocation", childLocation);

  useEffect(() => {
    if (searchData?.accommodation_types) {
      const types = searchData?.accommodation_types.map((type) => ({
        id:type?.id,
        name: type?.name,
        isChecked: false,
      }));
      setAccommodationTypes(types);
    }
    if (searchData?.amenities_side) {
      const amenities = searchData?.amenities_side.map((amenity) => ({
        id: amenity?.id,
        name: amenity?.name,
        isChecked: false,
      }));
      setFacilities(amenities);
    }
    setPriceRange({
      lowestPrice: searchData?.min_price || 0,
      highestPrice: searchData?.max_price || 0,
    });
  }, []);

  // useEffect(() => {
  //   refetch();
  // }, [searchInfo.location_id, searchInfo.search_type, refetch]);
  // console.log(searchInfo)

    const handleLocationClick = (id, searchType) => {
      console.log("Location clicked", id, searchType); // Ensure this logs to the console
      setChildLocation((prevState) => ({
        ...prevState,
        location_id: id,
        search_type: searchType,
      }));
    };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setPriceRange({ lowestPrice: newValue[0], highestPrice: newValue[1] });
  };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      let newValue = Number(value);

      if (name === "lowest-price" && newValue < searchData?.min_price) {
        newValue = searchData.min_price;
      }

      setPriceRange((prevRange) => ({
        ...prevRange,
        [name]: newValue,
      }));

      handleSliderChange(event, [
        name === "lowest-price" ? newValue : priceRange.lowestPrice,
        name === "highest-price" ? newValue : priceRange.highestPrice,
      ]);
    };

  const accommodationTypesChange = (index) => {
    setAccommodationTypes((prevTypes) => {
      const updatedTypes = [...prevTypes];
      updatedTypes[index] = {
        ...updatedTypes[index],
        isChecked: !updatedTypes[index].isChecked,
      };
      return updatedTypes;
    });
  };

  const amenitiesChange = (index) => {
    setFacilities((prevFacilities) => {
      const updatedFacilities = prevFacilities.map((amenity, i) =>
        i === index ? { ...amenity, isChecked: !amenity.isChecked } : amenity
      );
      return updatedFacilities;
    });
  };

  return (
    <div className="">
      {/* <input
        type="checkbox"
        id="filter-hotels-modal"
        className="modal-toggle"
      /> */}
      <h2 className="search-page-title">Filter By</h2>
      <p className="mb-[12px] lg:mb-[18px] text-[14px] md:text-[16px] lg:text-[16px]">
        Popular location in Bangladesh
      </p>
      <div className="relative  ">
        <input
          placeholder="Search"
          className="z-10 opacity-70 bg-[#F8FEFF] flex p-[8px] pl-[32px] text-[14px] items-center w-full border-[1px] rounded-[8px] border-[#c6c6c6] mb-[12px]"
        />
        <img
          className="w-4 absolute top-[11px] left-[12px]"
          src={searchIcon}
          alt="search icon"
        />
      </div>
      {/* Child Location */}
      <div className="flex flex-wrap gap-[10px] text-[14px]">
        {allChildLocation ? (
          <>
            {searchData?.child_location.map((location) => (
              <p
                key={location.id}
                onClick={() =>
                  handleLocationClick(location.id, location.search_type)
                }
                className="suggested-place"
              >
                {location?.name}
              </p>
            ))}
            <div
              onClick={() => setAllChildLocation(!allChildLocation)}
              className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
            >
              <img className="mr-[4px]" src={addIcon} alt="" />
              <button>See Less</button>
            </div>
          </>
        ) : (
          <>
            {searchData?.child_location?.slice(0, 4).map((location) => (
              <p
                key={location.id}
                onClick={() =>
                  handleLocationClick(location.id, location.search_type)
                }
                className="suggested-place"
              >
                {location?.name}
              </p>
            ))}
            {searchData?.child_location?.length > 4 && (
              <div
                onClick={() => setAllChildLocation(!allChildLocation)}
                className="flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
              >
                <img className="mr-[4px]" src={addIcon} alt="" />
                <button>See more</button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>
      {/* Popularity */}
      <div>
        <h2 className="search-page-title">Sort By</h2>

        <div className="mt-[8px]">
          <div className="property-input-div h-[40] bg-[#F8FEFF]">
            <select
              id="popularity"
              className="property-input bg-[#F8FEFF] text-[14px] md:text-[16px] lg:text-[16px] "
              name="popularity"
              onClick={(e) => setSortBy(e.target.value)}
            >
              <option value={searchData?.sort_by[100]}>
                {searchData?.sort_by[100]}
              </option>
            </select>
            <img
              // className="absolute top-[14px] right-[12px] arrow-icon"
              className="arrow-icon"
              src={arrowDownIcon}
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Price Range */}
      <div>
        <h2 className="search-page-title mt-[20px]">Sort By</h2>
        {/* Price Slider */}
        <div className="mt-[8px]">
          <Slider
            value={value}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={searchData?.min_price}
            max={searchData?.max_price}
          />
          {/* Price input */}
          <div className="flex justify-between items-center gap-[12px] text-[12px] md:text-[12px] lg:text-[16px]">
            <div className="h-[40px]  border-[1px] border-[#808783] flex justify-center items-center w-fit pl-[4px] lg:pl-[10px] rounded-[4px]">
              <label htmlFor="lowest-price" className="mr-[4px]">
                BDT
              </label>
              <input
                className="w-[48px] outline-none bg-[#F8FEFF] "
                type="number"
                name="lowest-price"
                id="lowest-price"
                value={priceRange.lowestPrice}
                min={searchData?.min_price}
                onChange={(e) => {
                  setPriceRange({ ...priceRange, lowestPrice: e.target.value }),
                    handleSliderChange(e, [
                      e.target.value,
                      priceRange.highestPrice,
                    ]);
                }}
              />
            </div>

            <div className="h-[40px] border-[1px] border-[#808783] flex justify-center items-center w-fit pl-[4px] lg:pl-[10px] rounded-[4px]">
              <label htmlFor="highest-price" className="mr-[4px]">
                BDT
              </label>
              <input
                className="w-[48px] md:w-[60px] lg:w-[64px] outline-none bg-[#F8FEFF]"
                type="number"
                name="highest-price"
                id="highest-price"
                min={searchData?.min_price}
                value={priceRange.highestPrice}
                onChange={(e) => {
                  setPriceRange({
                    ...priceRange,
                    highestPrice: e.target.value,
                  });
                  handleSliderChange(e, [
                    priceRange.lowestPrice,
                    e.target.value,
                  ]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>
      {/* Rating */}
      <div>
        <h2 className="search-page-title">Rating</h2>
        <div className="mt-[8px]">
          <div>
            <Rating
              name="half-rating"
              precision={0.5}
              // value={parseFloat(field.value)}
              onClick={(e) => setRating(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>
      {/* Accommodation Type */}
      <div>
        <h2 className="search-page-title">Accommodation Type</h2>
        <div className="mt-[8px] text-[14px] md:text-[16px] lg:text-[16px]">
          {allAccomodationType ? (
            <>
              {accommodation_types?.map((type, index) => (
                <div className="flex items-center gap-[4px]" key={index}>
                  <div>
                    <img
                      className="w-[18px] cursor-pointer"
                      src={type.isChecked ? checkboxTickIcon : checkboxIcon}
                      alt={
                        type.isChecked
                          ? "checked checkbox"
                          : "unchecked checkbox"
                      }
                      onClick={() => accommodationTypesChange(index)}
                    />
                  </div>
                  <label htmlFor={`checkbox-${index}`}>{type.name}</label>
                </div>
              ))}
              <div
                onClick={() => setAllAccomodationType(!allAccomodationType)}
                className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
              >
                <img className="mr-[4px]" src={addIcon} alt="" />
                <button>See Less</button>
              </div>
            </>
          ) : (
            <>
              {accommodation_types?.slice(0, 4).map((type, index) => (
                <div className="flex items-center gap-[4px]" key={index}>
                  <div>
                    <img
                      className="w-[18px] cursor-pointer"
                      src={type.isChecked ? checkboxTickIcon : checkboxIcon}
                      alt={
                        type.isChecked
                          ? "checked checkbox"
                          : "unchecked checkbox"
                      }
                      onClick={() => accommodationTypesChange(index)}
                    />
                  </div>
                  <label htmlFor={`checkbox-${index}`}>{type.name}</label>
                </div>
              ))}
              {accommodation_types?.length > 4 && (
                <div
                  onClick={() => setAllAccomodationType(!allAccomodationType)}
                  className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
                >
                  <img className="mr-[4px]" src={addIcon} alt="" />
                  <button>See More</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>
      {/* Facilities */}
      <div>
        <h2 className="search-page-title">Facilities</h2>
        <div className="mt-[8px] text-[14px] md:text-[16px] lg:text-[16px]">
          {allFacilities ? (
            <>
              {facilities?.map((amenity, index) => (
                <div key={amenity.id} className="flex gap-x-[4px]">
                  <img
                    className="w-[18px] cursor-pointer"
                    src={amenity.isChecked ? checkboxTickIcon : checkboxIcon}
                    alt={
                      amenity.isChecked
                        ? "checked checkbox"
                        : "unchecked checkbox"
                    }
                    onClick={() => amenitiesChange(index)}
                  />
                  <p>{amenity?.name}</p>
                </div>
              ))}
              <div
                onClick={() => setAllFacilities(!allFacilities)}
                className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
              >
                <img className="mr-[4px]" src={addIcon} alt="" />
                <button>See Less</button>
              </div>
            </>
          ) : (
            <>
              {facilities?.slice(0, 4).map((amenity, index) => (
                <div key={amenity.id} className="flex gap-x-[4px]">
                  <img
                    className="w-[18px] cursor-pointer"
                    src={amenity.isChecked ? checkboxTickIcon : checkboxIcon}
                    alt={
                      amenity.isChecked
                        ? "checked checkbox"
                        : "unchecked checkbox"
                    }
                    onClick={() => amenitiesChange(index)}
                  />
                  <p>{amenity?.name}</p>
                </div>
              ))}
              {facilities?.length > 4 && (
                <div
                  onClick={() => setAllFacilities(!allFacilities)}
                  className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
                >
                  <img className="mr-[4px]" src={addIcon} alt="" />
                  <button>See More</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
