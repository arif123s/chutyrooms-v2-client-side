import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import deleteIcon from "../../../../assets/icons/delete.svg";
import imgIcon from "../../../../assets/icons/img.svg";
import tickSquareIcon from "../../../../assets/icons/tick-square-black.svg";
import { useGetSingleRoomInfoQuery } from '../../../../redux/features/owner/RoomAdd/roomAdd.api';
import { Controller, useForm, useWatch } from "react-hook-form";
import ChildAgeVariation from './ChildAgeVariation/ChildAgeVariation';
import BedInfo from './BedInfo/BedInfo';
import Loading from '../../../Common/Includes/Loading/Loading';


const RoomEdit = () => {
    const { id } = useParams();
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    // watch,
    formState: { errors },
  } = useForm();

    const [displayImages, setDisplayImages] = useState([null, null, null, null]);
    const [childAgeVariation, setChildAgeVariation] = useState([
      { start_age: null, end_age: null, free_qty:null, price: null },
    ]);
  
    const [bedInfos, setBedInfos] = useState([{ bed_name: "", qty: null }]);
    const selectedRoomTypes = useWatch({
      control,
      name: "roomTypes",
      defaultValue: [],
    });

    const { data, isLoading,refetch } = useGetSingleRoomInfoQuery(id);
    const roomTypes = data?.data.room_types;
    const roomInfo = data?.data.room;
   
    useEffect(()=>{
    setChildAgeVariation(data?.data?.room?.cahild_age_variations)
    setBedInfos(data?.data?.room?.beds)
    },[data?.data?.room?.cahild_age_variations,data?.data?.room?.beds,childAgeVariation,bedInfos])
  
console.log(childAgeVariation)

if(isLoading){
  return <Loading></Loading>
}

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
            <Controller
              name="roomTypes"
              control={control}
              defaultValue={[]}
              rules={{ required: "Please select at least one checkbox." }}
              render={({ field }) => (
                <>
                  {roomTypes?.map((roomType) => (
                    <div key={roomType.id} className="flex gap-[8px]">
                      <input
                        type="checkbox"
                        id={`room-type${roomType.id}`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue(
                            "roomTypes",
                            e.target.checked
                              ? [...field.value, roomType.id]
                              : field.value.filter(
                                  (type) => type !== roomType.id
                                )
                          );
                        }}
                      />
                      <label htmlFor={`room-type${roomType.id}`}>
                        {roomType.name}
                      </label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          {errors.propertyTypes && !selectedRoomTypes?.length && (
            <span className="label-text-alt text-red-500">
              Please select at least one type
            </span>
          )}
        </div>

        {/* Room Name */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="room_name">
            Room Name
          </label>
          <input
            className="input-box"
            id="room_name"
            name="room_name"
            type="text"
            value={roomInfo?.name}
            placeholder="Single Room"
            {...register("room_name", {
              required: {
                value: true,
                message: "Room Name is required",
              },
            })}
          />
          <label className="">
            {errors.room_name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.room_name?.message}
              </span>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
          {/* Number of room */}
          <div className="">
            <label className="property-input-title block" htmlFor="number_of_rooms">
              Number of Rooms
            </label>
            <input
              className="input-box"
              id="number_of_rooms"
              name="number_of_rooms"
              type="number"
              value={roomInfo?.number_of_rooms}
              {...register("number_of_rooms", {
                required: {
                  value: true,
                  message: "Number of Rooms is required",
                },
              })}
            />
            <label className="">
              {errors.number_of_rooms?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.number_of_rooms?.message}
                </span>
              )}
            </label>
          </div>

          {/* Room Size */}
          <div className="">
            <label className="property-input-title" htmlFor="room_size">
              Room Size
            </label>
            <input
              className="input-box"
              id="room_size"
              name="room_size"
              type="text"
              value={roomInfo?.room_size}
              placeholder="250 square feet"
              {...register("room_size", {
                required: {
                  value: true,
                  message: "Room Size is required",
                },
              })}
            />
            <label className="">
              {errors.room_size?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.room_size?.message}
                </span>
              )}
            </label>
          </div>
        </div>
        {/* Room image */}
        <div className="mt-[18px]">
          <h2 className="">Display Image</h2>
          <div className="property-display-images">
            {displayImages?.map((image, index) => (
              <div className="relative" key={index}>
                <div className="flex justify-end absolute top-[20px] right-[8px]">
                  <img
                    className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                    src={deleteIcon}
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
            value={roomInfo?.description}
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
            value={roomInfo?.short_description}
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
            <label className="property-input-title" htmlFor="regular_price">
              Regular Price
            </label>
            <input
              className="input-box"
              id="regular_price"
              name="regular_price"
              type="number"
              value={roomInfo?.yearly_prices[0].regular_price}
              {...register("regular_price", {
                required: {
                  value: true,
                  message: "Regular Price is required",
                },
              })}
            />
            <label className="">
              {errors.regular_price?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.regular_price?.message}
                </span>
              )}
            </label>
          </div>
          {/* Chuty Purchase Price */}
          <div className="">
            <label
              className="property-input-title"
              htmlFor="chuty_purchase_price"
            >
              Chuty Purchase Price
            </label>
            <input
              className="input-box"
              id="chuty_purchase_price"
              name="chuty_purchase_price"
              type="number"
              value={roomInfo?.yearly_prices[0].company_purchase_price}
              {...register("chuty_purchase_price", {
                required: {
                  value: true,
                  message: "Chuty Purchase Price is required",
                },
              })}
            />
            <label className="">
              {errors.chuty_purchase_price?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.chuty_purchase_price?.message}
                </span>
              )}
            </label>
          </div>
          {/* Adult (qty) */}
          <div className="">
            <label className="property-input-title" htmlFor="adult_quantity">
              Adult (qty)
            </label>
            <input
              className="input-box"
              id="adult_quantity"
              name="adult_quantity"
              type="number"
              value={roomInfo?.guest_info.adult_guest_qty}
              {...register("adult_quantity", {
                required: {
                  value: true,
                  message: "Adult Quantity is required",
                },
              })}
            />
            <label className="">
              {errors.adult_quantity?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.adult_quantity?.message}
                </span>
              )}
            </label>
          </div>
          {/* Child (qty) */}
          <div className="">
            <label className="property-input-title" htmlFor="child_quantity">
              Child (qty)
            </label>
            <input
              className="input-box"
              id="child_quantity"
              name="child_quantity"
              type="number"
              value={roomInfo?.guest_info.child_guest_qty}
              {...register("child_quantity", {
                required: {
                  value: true,
                  message: "Child Quantity is required",
                },
              })}
            />
            <label className="">
              {errors.child_quantity?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.child_quantity?.message}
                </span>
              )}
            </label>
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
                htmlFor="extra_adult_quantity"
              >
                Extra Adult
              </label>
              <input
                className="input-box"
                id="extra_adult_quantity"
                name="extra_adult_quantity"
                type="number"
                value={roomInfo?.guest_info.extra_adult_guest_qty}
                {...register("extra_adult_quantity")}
              />
            </div>
            {/* Price per person */}
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra_adult_price"
              >
                Price {"("}per person{")"}
              </label>
              <input
                className="input-box"
                id="extra_adult_price"
                name="extra_adult_price"
                type="number"
                value={roomInfo?.guest_info.price_per_extra_adult_guest}
                {...register("extra_adult_price")}
              />
            </div>
          </div>
          {/* Extra Child */}
          <div className="">
            <label
              className="property-input-title"
              htmlFor="extra_child_quantity"
            >
              Extra Child
            </label>
            <input
              className="input-box"
              id="extra_child_quantity"
              name="extra_child_quantity"
              type="number"
              value={roomInfo?.guest_info.extra_child_guest_qty}
              {...register("extra_child_quantity")}
            />
          </div>

          {/* age variation */}
          <ChildAgeVariation
            childAgeVariation={childAgeVariation}
            setChildAgeVariation={setChildAgeVariation}
            register={register}
            childAgeLimit={parseInt(roomTypes?.çhild_age_limit)}
          ></ChildAgeVariation>
        </div>
        {/* Bed info */}
        <BedInfo
          register={register}
          errors={errors}
          bedInfos={bedInfos}
          setBedInfos={setBedInfos}
          setValue={setValue}
        ></BedInfo>
        {/* Order By */}
        {/* <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="orderby">
            Order By
          </label>
          <input
            className="input-box"
            id="orderby"
            name="orderby"
            type="number"
          />
        </div> */}

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
        {/* {dashboard && (
          <div className="mt-[18px] text-center">
            <a
              onClick={navigateDashboard}
              className="text-[14px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
            >
              Go to dashboard
            </a>
          </div>
        )} */}
      </form>
        </div>
    );
};

export default RoomEdit;