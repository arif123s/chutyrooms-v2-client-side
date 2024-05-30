/* eslint-disable react/prop-types */
import { Rating, Slider } from "@mui/material";
import addIcon from "../../../assets/icons/addIcon.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";
import checkboxIcon from "../../../assets/icons/square.svg";
import checkboxTickIcon from "../../../assets/icons/square-tick.svg";
import searchIcon from "../../../assets/icons/search-normal.svg";
import { useEffect, useState } from "react";
import sortBy from "sort-by";

const FilterContainer = ({
  searchData,
  priceRange,
  setPriceRange,
  accommodation_types,
  setAccommodationTypes,
  facilities,
  setFacilities,
  rating,
  setRating,
}) => {
  const [value, setValue] = useState([0, 200000]);
  // const [priceRange, setPriceRange] = useState({
  //   lowestPrice: 0,
  //   highestPrice: 0,
  // });

  const [allChildLocation, setAllChildLocation] = useState(false);
  const [allFacilities, setAllFacilities] = useState(false);
  const [allAccomodationType, setAllAccomodationType] = useState(false);
  // const [accommodation_types, setAccommodationTypes] = useState([]);

  console.log(searchData);
  console.log(accommodation_types);

  useEffect(() => {
    if (searchData?.accommodation_types) {
      const types = searchData.accommodation_types.map((type) => ({
        name: type.name,
        isChecked: false,
      }));
      setAccommodationTypes(types);
    }
    if (searchData?.amenities_side) {
      const types = searchData.amenities_side.map((type) => ({
        name: type.name,
        isChecked: false,
      }));
      setFacilities(types);
    }
    setPriceRange({
      lowestPrice: searchData?.min_price || 0,
      highestPrice: searchData?.max_price || 0,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const accommodationTypesChange = (index) => {
    const updatedAccommodationTypes = [...accommodation_types];
    updatedAccommodationTypes[index].isChecked =
      !updatedAccommodationTypes[index].isChecked;
    setAccommodationTypes(updatedAccommodationTypes);
  };

  const amenitiesChange = (index) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index].isChecked =
      !updatedFacilities[index].isChecked;
    setFacilities(updatedFacilities);
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
              <p key={location.id} className="suggested-place">
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
              <p key={location.id} className="suggested-place">
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
            >
              <option value="">{searchData?.sort_by[100]}</option>
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

        <div className="mt-[8px]">
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={priceRange?.lowestPrice}
            max={priceRange?.highestPrice}
          />

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
                onChange={(e) =>
                  setPriceRange({ ...priceRange, lowestPrice: e.target.value })
                }
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
                value={priceRange.highestPrice}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, highestPrice: e.target.value })
                }
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
              {allAccomodationType?.length > 4 && (
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
              {searchData?.amenities_side?.length > 4 && (
                <div
                  onClick={() => setAllFacilities(!allFacilities)}
                  className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit"
                >
                  <img className="mr-[4px]" src={addIcon} alt="" />
                  <button>See more</button>
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
