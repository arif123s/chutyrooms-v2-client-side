import { useState } from "react";
import "./RoomAdd.css"
import { useNavigate } from "react-router-dom";
import imgIcon from "../../../assets/icons/img.svg";
import delteIcon from "../../../assets/icons/delete.svg";
import tickSquareIcon from "../../../assets/icons/tick-square-black.svg";
import dashIcon from "../../../assets/icons/dash.svg";
import plusIcon from "../../../assets/icons/plus.svg";
import { useForm } from "react-hook-form";

const RoomAdd = () => {
  const [dashboard,setDashboard]=useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [displayImages, setDisplayImages] = useState([null, null, null, null]);

    const handleDisplayImageSelect = (index, event) => {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        const newImages = [...displayImages];
        newImages[index] = {
          name: fileInput.files[0].name,
          url: URL.createObjectURL(fileInput.files[0]),
          displayImageFile: fileInput.files[0],
        };
        setDisplayImages(newImages);
      } else {
        const newImages = [...displayImages];
        newImages[index] = null;
        setDisplayImages(newImages);
      }
    };

      const handleDeleteImage = (index) => {
        const newImages = [...displayImages];
        newImages[index] = null;
        setDisplayImages(newImages);
      };

  // const handleSave = () => {
  //   setDashboard(!dashboard)
  // };

    const onSubmit = (data) => {
      // Handle form submission here
      console.log(data);
      setDashboard(true)
    };

  const navigateDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };


  return (
    <div className="">
      <form
        className="property-add-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="property-add-title mb-[25px]">Room Adding</h2>
        {/* Room Category */}
        <div>
          <h2 className="property-input-title">Room Category</h2>
          <div className="flex gap-x-[12px] gap-y-[15px] lg:gap-x-[18px] text-[16px] flex-wrap">
            <div className="flex gap-[8px]">
              <input type="checkbox" name="single" id="single" />
              <label htmlFor="deluxe">Single</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="double" id="double" />
              <label htmlFor="deluxe">Double</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="triple" id="triple" />
              <label htmlFor="deluxe">Triple</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="quad" id="quad" />
              <label htmlFor="deluxe">Quad</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="couple" id="couple" />
              <label htmlFor="deluxe">Couple</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="king" id="king" />
              <label htmlFor="deluxe">King</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="queen" id="queen" />
              <label htmlFor="deluxe">Queen</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="deluxe" id="deluxe" />
              <label htmlFor="deluxe">Deluxe</label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
          <div className="">
            <label className="property-input-title" htmlFor="room-name">
              Room Name
            </label>
            <input
              className="input-box"
              id="room-name"
              name="room-name"
              type="text"
              placeholder="Single Room"
            />
          </div>
          <div className="">
            <label className="property-input-title" htmlFor="room-size">
              Room Size
            </label>
            <input
              className="input-box"
              id="room-size"
              name="room-size"
              type="text"
              placeholder="250 square feet"
            />
          </div>
        </div>
        {/* Room image */}
        <div className="mt-[18px]">
          <h2 className="">Display Image</h2>
          <div className="property-display-images">
            {displayImages.map((image, index) => (
              <div className="relative" key={index}>
                <div className="flex justify-end absolute top-[20px] right-[8px]">
                  <img
                    className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                    src={delteIcon}
                    onClick={() => handleDeleteImage(index)}
                    alt=""
                  />
                </div>
                <label
                  htmlFor={`display-image-${index}`}
                  className="input-label"
                >
                  <div className="w-full h-[148px] flex justify-center items-center rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                    {image ? (
                      <>
                        <div className="grid justify-center ">
                          <div className="flex items-center mb-[8px] md:block md:justify-center">
                            <div className="flex md:justify-center">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-8 mr-1"
                              />
                            </div>
                            <span className="">{image.name}</span>
                          </div>
                          <p className="property-input-title text-center">
                            Browse Photo
                          </p>
                        </div>
                        {/* <img
                                src={image.url}
                                alt={image.name}
                                className="selected-image"
                              />
                              <span>{image.name}</span> */}
                      </>
                    ) : (
                      // <label htmlFor={`display-image-${index}`}>
                      <>
                        <div>
                          <div className="flex justify-center mb-[8px]">
                            <img className="w-[20px]" src={imgIcon} alt="" />
                          </div>
                          <p className="property-input-title text-center">
                            Browse Photo
                          </p>
                        </div>
                      </>
                      // </label>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id={`display-image-${index}`}
                  name={`display-image-${index}`}
                  style={{ display: "none" }}
                  onChange={(event) => handleDisplayImageSelect(index, event)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="description">
            Description
          </label>
          <textarea
            className="property-description"
            name="description"
            id="description"
            placeholder="ChutyRooms is a trusted, largest, and fastest-growing hospitality partner in Bangladesh. Investing in technology takes the country to a higher status of travel."
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 1000,
                message: "Description cannot exceed 1000 characters",
              },
            })}
          ></textarea>
          <label className="">
            {errors.description && (
              <span className="label-text-alt text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>
        </div>

        {/* Short Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="short_description">
            Short Description
          </label>
          <textarea
            className="property-description"
            name="short_description"
            id="short_description"
            placeholder="ChutyRooms is a trusted, largest, and fastest-growing hospitality partner in Bangladesh. Investing in technology takes the country to a higher status of travel."
            {...register("short_description", {
              required: "Short Description is required",
              maxLength: {
                value: 1000,
                message: "Short Description cannot exceed 1000 characters",
              },
            })}
          ></textarea>
          <label className="">
            {errors.short_description && (
              <span className="label-text-alt text-red-500">
                {errors.short_description.message}
              </span>
            )}
          </label>
        </div>

        {/* Room price , bed, guest */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
          {/* Regular Price */}
          <div className="">
            <label className="property-input-title" htmlFor="regular-price">
              Regular Price
            </label>
            <input
              className="input-box"
              id="regular-price"
              name="regular-price"
              type="number"
            />
          </div>
          <div className="">
            <label
              className="property-input-title"
              htmlFor="chuty-purchase-price"
            >
              Chuty Purchase Price
            </label>
            <input
              className="input-box"
              id="chuty-purchase-price"
              name="chuty-purchase-price"
              type="number"
            />
          </div>

          <div className="">
            <label className="property-input-title" htmlFor="adult-quantity">
              Adult (qty)
            </label>
            <input
              className="input-box"
              id="adult-quantity"
              name="adult-quantity"
              type="number"
            />
          </div>
          <div className="">
            <label className="property-input-title" htmlFor="child-quantity">
              Child (qty)
            </label>
            <input
              className="input-box"
              id="child-quantity"
              name="child-quantity"
              type="number"
            />
          </div>
        </div>

        {/* Extra guest info */}
        <div className="mt-[18px]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <h2 className="text-[16px] font-['Gilroy-SemiBold']">
              Extra Guest Info
            </h2>
            <img src={tickSquareIcon} alt="" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mb-[18px]">
            {/* Extra Adult */}
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-guest-quantity"
              >
                Extra Adult
              </label>
              <input
                className="input-box"
                id="extra-guest-quantity"
                name="extra-guest-quantity"
                type="number"
              />
            </div>
            {/* Price per person */}
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-guest-price"
              >
                Price {"("}per person{")"}
              </label>
              <input
                className="input-box"
                id="extra-guest-price"
                name="extra-guest-price"
                type="number"
              />
            </div>
          </div>
          {/* Extra Child */}
          <div className="">
            <label
              className="property-input-title"
              htmlFor="extra-guest-quantity"
            >
              Extra Child
            </label>
            <input
              className="input-box"
              id="extra-guest-quantity"
              name="extra-guest-quantity"
              type="number"
            />
          </div>

          {/* age variation */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] my-[18px]">
              <div>
                <label
                  className="property-input-title"
                  htmlFor="extra-guest-quantity"
                >
                  Age
                </label>
                <div className="flex">
                  <input
                    className="input-box"
                    id="extra-guest-quantity"
                    name="extra-guest-quantity"
                    type="number"
                  />
                  <img className="mx-[12px]" src={dashIcon} alt="" />
                  <input
                    className="input-box"
                    id="extra-guest-quantity"
                    name="extra-guest-quantity"
                    type="number"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="">
                <label
                  className="property-input-title"
                  htmlFor="extra-guest-quantity"
                >
                  Price
                </label>
                <input
                  className="input-box"
                  id="extra-guest-quantity"
                  name="extra-guest-quantity"
                  type="number"
                />
              </div>
            </div>
            <button className="input-box flex"><img src={plusIcon} alt="" /> Add more variation</button>
          </div>
        </div>
        <div className="mt-[18px]">
          <h2 className="text-[16px] font-['Gilroy-SemiBold'] mb-[8px]">
            Extra Bed
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] ">
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-bed-quantity"
              >
                Extra bed (qty)
              </label>
              <input
                className="input-box"
                id="extra-bed-quantity"
                name="extra-bed-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="extra-bed-price">
                Price per extra bed
              </label>
              <input
                className="input-box"
                id="extra-bed-price"
                name="extra-bed-price"
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="orderby">
            Order By
          </label>
          <input
            className="input-box"
            id="orderby"
            name="orderby"
            type="number"
          />
        </div>

        <div className="mt-[20px] flex justify-end items-center gap-x-[12px]">
          <a className="text-[14px] flex justify-center items-center w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px]">
            Cancel
          </a>
          <button
            // onClick={handleSave}
            type="submit"
            className="text-[14px] flex justify-center items-center w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
          >
            Save
          </button>
        </div>

        {dashboard && (
          <div className="mt-[18px] text-center">
            <a
              onClick={navigateDashboard}
              className="text-[14px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
            >
              Go to dashboard
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default RoomAdd;
