import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import deleteIcon from "../../../../assets/icons/delete.svg";
import imgIcon from "../../../../assets/icons/img.svg";
import tickSquareIcon from "../../../../assets/icons/tick-square-black.svg";
import { useGetSingleRoomInfoQuery, useUpdateRoomMutation } from "../../../../redux/features/owner/RoomAdd/roomAdd.api";
import { Controller, useForm, useWatch } from "react-hook-form";
import ChildAgeVariation from "./ChildAgeVariation/ChildAgeVariation";
import BedInfo from "./BedInfo/BedInfo";
import Loading from "../../../Common/Includes/Loading/Loading";
import { BASE_ASSET_API } from "../../../../BaseApi/AssetUrl";
import { toast } from "react-toastify";

const RoomEdit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    // watch,
    formState: { errors },
  } = useForm();

  const { data, isLoading, refetch } = useGetSingleRoomInfoQuery(id);
   const [updateRoom, { isLoading: updateRoomLoading }] =
     useUpdateRoomMutation();
  const roomTypes = data?.data?.room_types; 
  // const room_rates = JSON.parse(data?.data?.room?.room_rates?.rates);
  // console.log(room_rates)

  const [roomData, setRoomData] = useState({
    name: "",
    number_of_rooms: null,
    room_size: "",
    short_description: "",
    description: "",
    room_categories: [],
    images: [],
    room_rates: {},
    guest_info: {},
    is_active: null,
    view_order: null,
  });

  const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [room_images, setRoomImages] = useState([]);
  const [childAgeVariation, setChildAgeVariation] = useState([
    { start_age: null, end_age: null, free_qty: null, price: null },
  ]);

  const [bedInfos, setBedInfos] = useState([{ bed_name: "", qty: null }]);
  const selectedRoomTypes = useWatch({
    control,
    name: "roomTypes",
    defaultValue: [],
  });

  const [displayImageError, setDisplayImageError] = useState(null);
  let displayImageCount = 0;

  console.log("roomData", roomData);

  useEffect(() => {
    refetch();

    if (data?.data?.room) {
     const room_rates = data?.data?.room?.room_rates?.rates
       ? JSON.parse(data?.data?.room?.room_rates?.rates)
       : {};
      setDisplayImages(
        data?.data?.room?.room_images?.map((image) => ({
          id: image.id,
          name: "",
          url: `${BASE_ASSET_API}/storage/images/room/room_image/${image?.image}`,
          displayImageFile: null,
        }))
      );

      setRoomData({...data?.data?.room,room_rates: room_rates});
    }
  }, [data?.data?.room ,refetch]);

  useEffect(() => {
    setChildAgeVariation(data?.data?.room?.child_age_variations);
    setBedInfos(data?.data?.room?.beds);
  }, [data?.data?.room?.child_age_variations, data?.data?.room?.beds]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDisplayImageSelect = (index, event, id) => {
    console.log("index", index);
    console.log("id", id);
    const fileInput = event.target;
    if (fileInput?.files?.length > 0) {
      const newImages = [...displayImages];
      newImages[index] = {
        id: id,
        name: fileInput?.files[0].name,
        url: URL.createObjectURL(fileInput?.files[0]),
        displayImageFile: fileInput?.files[0],
      };
      setDisplayImages(newImages);
      // Update the 'images' array
      const updatedImages = newImages.map((image) => ({
        id: image?.id, // Assuming you have the ID in the displayImages array
        file: image?.displayImageFile,
      }));

      setRoomImages(updatedImages);
      displayImages?.map((i) => {
        if (i === null) {
          displayImageCount++;
        }
      });
      if (displayImageCount > 1) {
        setDisplayImageError({
          status: true,
          message: "Please select all four display images.",
        });
      } else {
        setDisplayImageError({
          status: false,
          message: "",
        });
      }
    } else {
      const newImages = [...displayImages];
      newImages[index] = null;
      setDisplayImages(newImages);

      displayImages?.map((i) => {
        if (i === null) {
          displayImageCount++;
        }
      });
      if (displayImageCount == 0) {
        setDisplayImageError({
          status: true,
          message: "Please select all four display images.",
        });
      }
    }
  };

  const onSubmit = async () => {
    const roomCategoriesId = roomData?.room_categories?.map((type) => type.id);
    const updatedBeds = bedInfos.map((bed) => ({
      id: bed.id,
      bed_name: bed.bed_name,
      qty: bed.qty,
      is_active: bed.is_active,
      view_order: bed.view_order,
    }));
    const updateChildVariation = childAgeVariation.map((variation) => ({
      id: variation.id,
      start_age: variation.start_age,
      end_age: variation.end_age,
      price: variation.price,
      free_qty: variation.free_qty,
      view_order: variation.view_order,
      is_active: variation.is_active,
    }));

    console.log(updatedBeds)
    
    const updateRoomInfo = {
      room_id: roomData.id,
      name: roomData.name,
      number_of_rooms: roomData.number_of_rooms,
      room_size: roomData.room_size,
      short_description: roomData.short_description,
      description: roomData.description,
      room_categories: roomCategoriesId,
      images: room_images,
      regular_price: parseInt(roomData.room_rates.regular_price),
      company_purchase_price: parseInt(
        roomData.room_rates.company_purchase_price
      ),
      start_date: parseInt(roomData.room_rates.start_date),
      end_date: parseInt(roomData.room_rates.end_date),
      guest_infos: {
        id: parseInt(roomData.guest_info.id),
        adult_guest_qty: parseInt(roomData.guest_info.adult_guest_qty),
        child_guest_qty: parseInt(roomData.guest_info.adult_guest_qty),
        extra_adult_guest_qty: parseInt(
          roomData.guest_info.extra_adult_guest_qty
        ),
        price_per_extra_adult_guest: parseInt(
          roomData.guest_info.price_per_extra_adult_guest
        ),
        extra_child_guest_qty: parseInt(
          roomData.guest_info.extra_child_guest_qty
        ),
        is_active: parseInt(roomData.guest_info.is_active),
        view_order: parseInt(roomData.guest_info.view_order),
      },
      child_age_variation: updateChildVariation,
      beds: updatedBeds,
      is_active: roomData.is_active,
      view_order: roomData.view_order,
    };

    console.log(updateRoomInfo)

    const formData = new FormData();

    Object.entries(updateRoomInfo).forEach(([key, value]) => {
      if (key !== "images") {
        if (key === "room_categories") {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (key === "beds") {
          value.forEach((bed, index) => {
            Object.entries(bed).forEach(([subKey, subValue]) => {
              formData.append(`bed_infos[${index}][${subKey}]`, subValue);
            });
          });
        }
        else if (key === "child_age_variation") {
          value.forEach((bed, index) => {
            Object.entries(bed).forEach(([subKey, subValue]) => {
              formData.append(`child_age_infos[${index}][${subKey}]`, subValue);
            });
          });
        } else if (key === "guest_infos") {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`guest_infos[${subKey}]`, subValue);
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    // Append image files to FormData
    if (Array.isArray(updateRoomInfo.images)) {
      updateRoomInfo.images.forEach((imageFile, index) => {
        formData.append(`images[${index}][image]`, imageFile);
      });
    }

    formData.append("_method", "PUT");

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(formData));

    const updateRoomData = {
      id: roomData.id,
      formData: formData,
    };

    try {
      const result = await updateRoom(updateRoomData);
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("updateRoomInfo", result);
        toast.success("Room updated successfully");
        navigate(`/dashboard/property-list`);
      } else {
        // console.log("Failed", result?.error?.data?.errors);
        // setValidationErrors(result?.error?.data?.errors);
        console.log("Failed", result);
      }
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
      // setValidationErrors(err.response.data.errors);
    }
  };

  return (
    <div className="p-[12px] md:p-[24px] lg:p-[24px]">
      <form
        className="property-add-container"
        onSubmit={handleSubmit(onSubmit)}
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
              // rules={{ required: "Please select at least one checkbox." }}
              render={({ field }) => (
                <>
                  {roomTypes?.map((roomType) => (
                    <div key={roomType.id} className="flex gap-[8px]">
                      <input
                        type="checkbox"
                        id={`room-type${roomType.id}`}
                        checked={roomData?.room_categories.some(
                          (rt) => rt.id == roomType.id
                        )}
                        {...field}
                        onChange={(e) => {
                          // Logic to update property types
                          const isChecked = e.target.checked;
                          const typeId = roomType.id;
                          const updatedRoomTypes = isChecked
                            ? [...roomData.room_categories, roomType]
                            : roomData.room_categories.filter(
                                (rt) => rt.id != typeId
                              );
                          // Update state with the updated property types
                          setRoomData((prevState) => ({
                            ...prevState,
                            room_categories: updatedRoomTypes,
                          }));
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
            value={roomData?.name}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                name: e.target.value,
              })
            }
            placeholder="Single Room"
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
            <label
              className="property-input-title block"
              htmlFor="number_of_rooms"
            >
              Number of Rooms
            </label>
            <input
              className="input-box"
              id="number_of_rooms"
              name="number_of_rooms"
              type="number"
              value={roomData?.number_of_rooms}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  number_of_rooms: e.target.value,
                })
              }
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
              placeholder="250 square feet"
              value={roomData?.room_size}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  room_size: e.target.value,
                })
              }
            />
            <label className="">
              {errors.room_size?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.room_size?.message}
                </span>
              )}
            </label>
          </div>

          {/* Select Date */}
          <div className="">
            <label className="property-input-title block" htmlFor="start_date">
              Start Date
            </label>
            <input
              className="input-box"
              id="start_date"
              name="start_date"
              type="date"
              value={roomData?.room_rates?.start_date}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  room_rates: {
                    ...roomData.room_rates,
                    start_date: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* End Date */}
          <div className="">
            <label className="property-input-title block" htmlFor="end_date">
              End Date
            </label>
            <input
              className="input-box"
              id="end_date"
              name="end_date"
              type="date"
              value={roomData?.room_rates?.end_date}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  room_rates: {
                    ...roomData.room_rates,
                    end_date: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        {/* Room image */}
        <div className="mt-[18px]">
          <h2 className="">Display Image</h2>
          <div className="property-display-images">
            {displayImages?.map((image, index) => (
              <div key={index}>
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
                                src={image?.url}
                                alt={image.name}
                                className="w-20 mr-1"
                              />
                            </div>
                            <span className="text-[12px] block text-center">
                              {image?.name?.length > 16
                                ? image?.name?.slice(0, 15) + "..."
                                : image?.name}
                            </span>
                          </div>
                          <p className="text-[12px] text-center">
                            Update Photo
                          </p>
                        </div>
                      </>
                    ) : (
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
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id={`display-image-${index}`}
                  name={`display-image-${index}`}
                  style={{ display: "none" }}
                  onChange={(event) =>
                    handleDisplayImageSelect(index, event, image?.id)
                  }
                />
              </div>
            ))}
          </div>
          {displayImageError?.status === true && (
            <p className="label-text-alt text-red-500 mt-[4px]">
              {displayImageError.message}
            </p>
          )}
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
            value={roomData?.description}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                description: e.target.value,
              })
            }
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
            value={roomData?.short_description}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                short_description: e.target.value,
              })
            }
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
              value={roomData?.room_rates?.regular_price}
              onChange={(e) =>
                setRoomData((prevRoomData) => ({
                  ...prevRoomData,
                  room_rates: {
                    ...prevRoomData.room_rates,
                    regular_price: e.target.value,
                  },
                }))
              }
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
              value={roomData?.room_rates?.company_purchase_price}
              onChange={(e) =>
                setRoomData((prevRoomData) => ({
                  ...prevRoomData,
                  room_rates: {
                    ...prevRoomData.room_rates,
                    company_purchase_price: e.target.value,
                  },
                }))
              }
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
              value={roomData?.guest_info?.adult_guest_qty}
              onChange={(e) =>
                setRoomData((prevRoomData) => ({
                  ...prevRoomData,
                  guest_info: {
                    ...prevRoomData.guest_info,
                    adult_guest_qty: e.target.value,
                  },
                }))
              }
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
              value={roomData?.guest_info?.child_guest_qty}
              onChange={(e) =>
                setRoomData((prevRoomData) => ({
                  ...prevRoomData,
                  guest_info: {
                    ...prevRoomData.guest_info,
                    child_guest_qty: e.target.value,
                  },
                }))
              }
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
                value={roomData?.guest_info?.extra_adult_guest_qty}
                onChange={(e) =>
                  setRoomData((prevRoomData) => ({
                    ...prevRoomData,
                    guest_info: {
                      ...prevRoomData.guest_info,
                      extra_adult_guest_qty: e.target.value,
                    },
                  }))
                }
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
                value={roomData?.guest_info?.price_per_extra_adult_guest}
                onChange={(e) =>
                  setRoomData((prevRoomData) => ({
                    ...prevRoomData,
                    guest_info: {
                      ...prevRoomData.guest_info,
                      price_per_extra_adult_guest: e.target.value,
                    },
                  }))
                }
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
              value={roomData?.guest_info?.extra_child_guest_qty}
              onChange={(e) =>
                setRoomData((prevRoomData) => ({
                  ...prevRoomData,
                  guest_info: {
                    ...prevRoomData.guest_info,
                    extra_child_guest_qty: e.target.value,
                  },
                }))
              }
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

        {/*  Is Active */}
        <div className="mt-[18px]">
          <h2 id="property-type-title" className="text-[14px] mr-[4px]">
            Is Active
          </h2>

          <div className="flex gap-[8px]">
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="is_active"
                id="active"
                value={1}
                checked={roomData?.is_active == 1}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    is_active: e.target.value,
                  })
                }
              />
              <label htmlFor="active">Active</label>
            </div>
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="is_active"
                id="inactive"
                value={0}
                checked={roomData?.is_active == 0}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    is_active: e.target.value,
                  })
                }
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </div>
        </div>

        {/* Order By */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="view_order">
            View Order
          </label>
          <input
            className="input-box"
            id="view_order"
            name="view_order"
            type="number"
            value={roomData?.view_order}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                view_order: e.target.value,
              })
            }
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
