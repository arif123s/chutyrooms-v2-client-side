import { useState } from "react";
// import { useAddAmenitiesCategoryMutation } from "../../../../../redux/features/admin/Amenities/amenitiesCategory.api";
// import { useGetAllAmenitiesCategoriesQuery , useAddAmenitiesMutation } from "../../../../../redux/features/admin/Amenities/amenities.api";
import { useAddRoomTypeMutation } from "../../../../../../redux/features/admin/Room/RoomTypes.api";
import Loading from "../../../../../Common/Includes/Loading/Loading";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import arrowDownIcon from "../../../../../../assets/icons/arrow-down.svg";

const AddRoomType = () => {

    const navigate = useNavigate();
 const [
   AddRoomType,
   {
     isLoading,
   },
 ] = useAddRoomTypeMutation();
 // const [inputValue, setInputValue] = useState({ name: '', view_order: '', is_active: null });
 const {
   control,
   register,
   handleSubmit,
   formState: { errors },
 } = useForm();
 const [errorMessage, setErrorMessage] = useState({
   status: false,
   message: "",
   errors: [],
 });

 if (isLoading) {
   return <Loading></Loading>;
 }

 const onSubmit = async (data) => {
   // console.log(data);

   setErrorMessage({ status: false, message: "", errors: [] });

   const amenitiesCategoryInfo = {
     name: data.name,
     view_order: data.view_order,
     is_active: parseInt(data.is_active),
   };

   const formData = new FormData();


   Object.entries(data).forEach(([key, value]) => {
    
     
        const formattedValue =
         key === "is_active" ? parseInt(value, 10) : value;
        formData.append(key, formattedValue);
     
   });


   console.log("formdata", Object.fromEntries(formData));

 
   try {
     const result = await AddRoomType(formData);
     // Handle successful mutation
     if (result?.data?.status) {
       console.log("Room Type", result);
       toast.success("Room Type added successfully");
       navigate("/dashboard/rooms/roomTypes");
     } else {
       // console.log("Failed", result);
       console.log("Failed", result.error.data.errors);
       setErrorMessage({
         status: true,
         message: data.message,
         errors: [result.error.data.errors],
       });
       console.log("errormessage", errorMessage?.errors?.length);
     }
   } catch (error) {
     // Handle error
     console.error("Error adding Room Type:", error);
   }
 };
    
    return (
        <div className="RoomType-add-division">
        <form
          className="RoomType-add-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Property name */}
          <div className="mb-3">
            <label className="property-input-title" htmlFor="name">
              RoomType Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Payment Type is required",
                },
              })}
            />
            <label className="">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name?.message}
                </span>
              )}
            </label>
          </div>
       
          {/* View Order */}
          <div className="mb-3">
            <label className="property-input-title" htmlFor="view_order">
              View Order
            </label>
            <input
              className="input-box"
              id="view_order"
              name="view_order"
              // value={inputValue.view_order}
              // onChange={handleInput}
              {...register("view_order", {
                required: {
                  value: true,
                  message: "View order is required",
                },
              })}
            />
            <label className="">
              {errors.view_order?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.view_order?.message}
                </span>
              )}
            </label>
          </div>
          {/* isActive */}
          <div className="mb-3 property-input-title">
            <div className="flex gap-3">
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="active"
                  value={1}
                  {...register("is_active", { required: true })}
                />
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="inactive"
                  value={0}
                  {...register("is_active", { required: true })}
                />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
            <label className=" mb-0 pb-0">
              {errors.is_active?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  Please select one option.
                </span>
              )}
            </label>
          </div>
  
          {errorMessage.errors?.length > 0 &&
            errorMessage?.errors?.map((err, index) => (
              <div key={index}>
                {Object.values(err).map((value, i) => (
                  <p className="label-text-alt text-rose-500 mb-[2px]" key={i}>
                    {value}
                  </p>
                ))}
              </div>
            ))}
  
          <button type="submit" className="country-save-btn">
            Save
          </button>
        </form>
      </div>
    );
};

export default AddRoomType;