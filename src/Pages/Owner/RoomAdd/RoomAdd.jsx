import { useState } from "react";
import "./RoomAdd.css";
import { useNavigate, useParams } from "react-router-dom";
import imgIcon from "../../../assets/icons/img.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import tickSquareIcon from "../../../assets/icons/tick-square-black.svg";
import { Controller, useForm, useWatch } from "react-hook-form";
import ChildAgeVariation from "./ChildAgeVariation/ChildAgeVariation";
import BedInfo from "./BedInfo/BedInfo";
import { useGetAllRoomCategoriesQuery, useRoomAddMutation } from "../../../redux/features/owner/RoomAdd/roomAdd.api";
import Loading from "../../Common/Includes/Loading/Loading";
import { toast } from "react-toastify";

const RoomAdd = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(false);
  const { data: roomCategories, isLoading } =
    useGetAllRoomCategoriesQuery(propertyId);
const [roomAdd, { isLoading: roomAddLoading }] = useRoomAddMutation();
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

  if (isLoading) {
    return <Loading></Loading>;
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

  // const handleSave = () => {
  //   setDashboard(!dashboard)
  // };

  const onSubmit = async(data) => {
    const displayImageFiles = displayImages.map(
      (image) => image.displayImageFile
    );

    const roomAddInfo = {
      name: data.room_name,
      number_of_rooms:data.number_of_rooms,
      room_size: data.room_size,
      short_description: data.short_description,
      description: data.description,
      room_categories: data.roomTypes,
      images: displayImageFiles,
      regular_price: parseInt(data.regular_price),
      company_purchase_price: parseInt(data.chuty_purchase_price),
      adult_guest_qty: parseInt(data.adult_quantity),
      child_guest_qty: parseInt(data.child_quantity),
      extra_adult_guest_qty: parseInt(data.extra_adult_quantity) || 0,
      price_per_extra_adult_guest: parseInt(data.extra_adult_price) || 0,
      extra_child_guest_qty: parseInt(data.extra_child_quantity) || 0,
      child_age_variation: childAgeVariation,
      bed_infos: bedInfos,
    };

    console.log(roomAddInfo);

    const formData = new FormData();

    // Append non-file fields to FormData
    // Object.entries(paymentMethodInfo).forEach(([key, value]) => {
    //   if (key !== "image") {
    //     formData.append(key, value);
    //   }
    // });

    Object.entries(roomAddInfo).forEach(([key, value]) => {
      if (key !== "images") {
        if (key === "room_categories") {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        }
        else if (key === "bed_infos") {
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
        } else if (
          key === "adult_guest_qty" ||
          key === "child_guest_qty" ||
          key === "extra_adult_guest_qty" ||
          key === "price_per_extra_adult_guest" ||
          key === "extra_child_guest_qty"
        ) {
          formData.append(`guest_infos[${key}]`, value);
        } else {
          formData.append(key, value);
        }
      }
    });
    // Append image files to FormData
    if (Array.isArray(roomAddInfo.images)) {
      roomAddInfo.images.forEach((imageFile, index) => {
        formData.append(`images[${index}][image]`, imageFile);
      });
    }

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(formData));

    const roomInfo = {
      id: propertyId,
      formData: formData,
    };

    try {
      const result = await roomAdd(roomInfo);
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("Room", result);
        toast.success("Room added successfully");
        navigate(`/dashboard/property-list`);
      } else {
        console.log("Failed", result);
        // setValidationErrors(result?.error?.data?.errors);
        // console.log("Failed", result);
      }
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
      // setValidationErrors(err.response.data.errors);
    }

    setDashboard(true);
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
            <Controller
              name="roomTypes"
              control={control}
              defaultValue={[]}
              rules={{ required: "Please select at least one checkbox." }}
              render={({ field }) => (
                <>
                  {roomCategories?.data?.room_types?.map((roomType) => (
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
            <label className="property-input-title" htmlFor="regular_price">
              Regular Price
            </label>
            <input
              className="input-box"
              id="regular_price"
              name="regular_price"
              type="number"
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
              {...register("extra_child_quantity")}
            />
          </div>

          {/* age variation */}
          <ChildAgeVariation
            childAgeVariation={childAgeVariation}
            setChildAgeVariation={setChildAgeVariation}
            register={register}
            childAgeLimit={parseInt(roomCategories?.data?.çhild_age_limit)}
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
