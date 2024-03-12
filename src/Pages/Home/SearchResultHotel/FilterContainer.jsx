import { Rating, Slider } from "@mui/material";
import addIcon from "../../../assets/icons/addIcon.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";
import checkboxIcon from "../../../assets/icons/square.svg";
import checkboxTickIcon from "../../../assets/icons/square-tick.svg";
import searchIcon from "../../../assets/icons/search-normal.svg";
import { useState } from "react";

const  FilterContainer = () => {
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState([0, 200000]);
  const [priceRange,setPriceRange]=useState({
    lowestPrice:500,
    highestPrice:200000,
  })
  const initialState = ["Hotel", "Resort", "Cottage"];
  const [checkboxes, setCheckboxes] = useState(
    initialState.map((label) => ({ label, isChecked: false }))
  );

  console.log(rating);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('value',priceRange)

  const toggleCheckbox = (index) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index].isChecked = !updatedCheckboxes[index].isChecked;
      return updatedCheckboxes;
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
          className="z-10 opacity-70 flex p-[8px] pl-[32px] text-[14px] items-center w-full border-[1px] rounded-[8px] border-[#c6c6c6] mb-[12px]"
        />
        <img
          className="w-4 absolute top-[11px] left-[12px]"
          src={searchIcon}
          alt="search icon"
        />
      </div>

      <div className="flex flex-wrap gap-[10px] text-[14px]">
        <p className="suggested-place">Cox’s Bazar</p>
        <p className="suggested-place">Saint Martin</p>
        <p className="suggested-place">Teknaf</p>
        <p className="suggested-place">Marine Drive</p>
        <p className="suggested-place">Laboni</p>
        <div className="flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit">
          <img className="mr-[4px]" src={addIcon} alt="" />
          <button>See more</button>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>

      <div>
        <h2 className="search-page-title">Sort By</h2>

        <div className="mt-[8px]">
          <div className="property-input-div">
            <select
              id="popularity"
              className="bg-[#F8FEFF] property-input text-[14px] md:text-[16px] lg:text-[16px] "
              name="popularity"
            >
              <option value="">Popularity</option>
              <option value="Popularity">Popularity</option>
              <option value="Popularity">Popularity</option>
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

      <div>
        <h2 className="search-page-title mt-[20px]">Sort By</h2>

        <div className="mt-[8px]">
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={200000}
            // getAriaValueText={valuetext}
          />

          <div className="flex justify-between items-center gap-[12px] text-[14px] md:text-[16px] lg:text-[16px]">
            <div className="h-[40px] md:h-[44px] lg:h-[48px] border-[1px] border-[#808783] flex justify-center items-center w-fit pl-[4px] lg:pl-[10px] rounded-[4px]">
              <label htmlFor="lowest-price" className="mr-[4px]">
                BDT
              </label>
              <input
                className="w-[48px] outline-none bg-[#F8FEFF]"
                type="number"
                name="lowest-price"
                id="lowest-price"
                value={priceRange.lowestPrice}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, lowestPrice: e.target.value })
                }
                // onChange={}
              />
            </div>

            {/* <p>To</p> */}

            <div className="h-[40px] md:h-[44px] lg:h-[48px] border-[1px] border-[#808783] flex justify-center items-center w-fit pl-[4px] lg:pl-[10px] rounded-[4px]">
              <label htmlFor="lowest-price" className="mr-[4px]">
                BDT
              </label>
              <input
                className="w-[48px] md:w-[60px] lg:w-[60px] outline-none bg-[#F8FEFF]"
                type="number"
                name="lowest-price"
                id="lowest-price"
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

      <div>
        <h2 className="search-page-title">Rating</h2>
        <div className="mt-[8px]">
          {/* <Controller
                name="rating"
                control={control}
                defaultValue={0}
                render={({ field }) => ( */}
          <div>
            <Rating
              name="half-rating"
              precision={0.5}
              // value={parseFloat(field.value)}
              onClick={(e) => setRating(e.target.value)}
            />
          </div>
          {/* //   )}
               
              // > */}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>

      <div>
        <h2 className="search-page-title">Accommodation Type</h2>
        <div className="mt-[8px] text-[14px] md:text-[16px] lg:text-[16px]">
          {checkboxes.map((checkbox, index) => (
            <div className="flex items-center gap-[4px]" key={index}>
              <div>
                <img
                  className="w-[18px]"
                  src={checkbox.isChecked ? checkboxTickIcon : checkboxIcon}
                  alt="checkbox icon"
                  onClick={() => toggleCheckbox(index)}
                />
              </div>
              <label htmlFor="">{checkbox.label}</label>
            </div>
          ))}
          <div className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit">
            <img className="mr-[4px]" src={addIcon} alt="" />
            <button>See more</button>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#808783] my-[18px] lg:my-[20px]"></div>

      <div>
        <h2 className="search-page-title">Facilities</h2>
        <div className="mt-[8px] text-[14px] md:text-[16px] lg:text-[16px]">
          <p>Wifi</p>
          <p>TV</p>
          <p>CCTV</p>
          <p>Restaurant</p>
          <p>Premium Suite</p>
          <p>Twin Bed</p>
          <p>Deluxe Bed</p>
          <p>Room Heater</p>

          <div className="mt-[8px] text-[14px] flex h-[40px] px-[10px] bg-[#159947] rounded-[5px] justify-center items-center text-white w-fit">
            <img className="mr-[4px]" src={addIcon} alt="" />
            <button>See more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
