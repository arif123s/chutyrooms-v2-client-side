import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router";
import deleteIcon from "../../../../assets/icons/delete.svg";
import imgIcon from "../../../../assets/icons/img.svg";
import { useGetSingleRoomInfoQuery } from '../../../../redux/features/owner/RoomAdd/roomAdd.api';


const RoomEdit = () => {
    const { id } = useParams();
    const [displayImages, setDisplayImages] = useState([null, null, null, null]);


    const { data, isLoading,refetch } = useGetSingleRoomInfoQuery(id);
    const roomTypes = data?.data.room_types;
    const roomInfo = data?.data.room;
    const roomPrice = data?.data.room.yearly_prices[0].regular_price;
  
   
    console.log(roomPrice);
  

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
    return (
        <div className="p-[12px] md:p-[24px] lg:p-[24px]">
              <form
        className="property-add-container"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="property-add-title mb-[25px]">Room Edit</h2>
        {/* Room Category */}
        <div>
          <h2 className="property-input-title">Room Category</h2>
          <div className="flex gap-x-[12px] gap-y-[15px] lg:gap-x-[18px] text-[16px] flex-wrap">
          {roomTypes?.map((roomType) => (
            <div className="flex gap-[8px]">
              <input type="checkbox" name="single" id="single" />
              <label htmlFor="deluxe">{roomType.name}</label>
            </div>
          ))}
           
           
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
              value={roomInfo?.name}
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
              value={roomInfo?.room_size}
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
                    src={deleteIcon}
                    // onClick={() => handleDeleteImage(index)}
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
                //   onChange={(event) => handleDisplayImageSelect(index, event)}
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
            className="property-description block input-box h-[120px]"
            name="description"
            value={roomInfo?.description}
            id="description"
            placeholder="Sea View"
          ></textarea>
        </div>
        {/* Short Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="short-description">
            Short Description
          </label>
          <textarea
            className="property-description block input-box h-[120px]"
            name="short-description"
            value={roomInfo?.short_description}
            id="short-description"
            placeholder=""
          ></textarea>
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
              value={roomInfo?.yearly_prices[0].regular_price}
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
              value={roomInfo?.yearly_prices[0].company_purchase_price}
            />
          </div>
        </div>
        <div className="mt-[18px]">
          <h2 className="text-[16px] font-['Gilroy-SemiBold'] mb-[8px]">
            Guest Info
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] ">
            <div className="">
              <label className="property-input-title" htmlFor="adult-quantity">
                Adult (qty)
              </label>
              <input
                className="input-box"
                id="adult-quantity"
                name="adult-quantity"
                type="number"
                value={roomInfo?.guest_info.adult_guest_qty}
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
                value={roomInfo?.guest_info.child_guest_qty}
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="adult-extra">
                Adult (extra)
              </label>
              <input
                className="input-box"
                id="adult-quantity"
                name="adult-quantity"
                type="number"
                value={roomInfo?.guest_info.extra_adult_guest_qty}
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="child-extra">
                Child (extra)
              </label>
              <input
                className="input-box"
                id="child-extra"
                name="child-extra"
                type="number"
                value={roomInfo?.guest_info.extra_child_guest_qty}
              />
            </div>
          </div>
        </div>
        <div className="mt-[18px]">
          <h2 className="text-[16px] font-['Gilroy-SemiBold'] mb-[8px]">
            Extra Guest Info
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] ">
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-guest-quantity"
              >
                Extra guest (qty)
              </label>
              <input
                className="input-box"
                id="extra-guest-quantity"
                name="extra-guest-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-guest-price"
              >
                Price per extra guest
              </label>
              <input
                className="input-box"
                id="extra-guest-price"
                name="extra-guest-price"
                type="number"
              />
            </div>
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

     
      </form>
        </div>
    );
};

export default RoomEdit;