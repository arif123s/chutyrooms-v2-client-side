import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BASE_ASSET_API } from "../../../../../../BaseApi/AssetUrl";
import Loading from "../../../../../Common/Includes/Loading/Loading";
import { useGetSingleRoomTypeQuery , useUpdateRoomTypeMutation } from "../../../../../../redux/features/admin/Room/RoomTypes.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RoomTypeEdit = () => {

    const navigate = useNavigate();
  const { id } = useParams();
//   alert(id)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [roomTypeData, setroomTypeData] = useState({
    name: "",
    view_order: "",
    is_active: null,
  });


   const [validationErrors, setValidationErrors] = useState({});

  const { data, isLoading,refetch } = useGetSingleRoomTypeQuery(id);
  const roomType = data?.data;

 
  console.log(roomType);

  
  

  const [updateRoomType, { isLoading: updateLoading,
  
    }] =useUpdateRoomTypeMutation();

 useEffect(() => {
  
    if(roomType)
    {
        setroomTypeData({
        name: roomType.name,
      
        view_order: roomType.view_order,
        is_active: roomType.is_active,
      });
    
        refetch();
    }
  
  }, [roomType]);

  

  if (isLoading || updateLoading) {
    return <Loading></Loading>;
  }


  const onSubmit = async (data) => {
    const roomTypeInfo = {
      id: id,
      name: roomTypeData.name,
   
      view_order: roomTypeData.view_order,
      is_active: parseInt(roomTypeData.is_active),
    };

  

   

    const formData = new FormData();

    Object.entries(roomTypeInfo).forEach(([key, value]) => {
      const formattedValue =
          key === "is_active" ? parseInt(value, 10) : value;
        formData.append(key, formattedValue);
      
    });
    
    formData.append("_method", "PUT");
    console.log("formdata", Object.fromEntries(formData));

    const roomtypeInfo = {
      id,
      formData,
    };

    try {
      const result = await updateRoomType(roomtypeInfo);
      if (result?.data?.status) {
        console.log("Room Type", result);
        toast.success("Room Type edited successfully");
        navigate("/dashboard/rooms/roomTypes");
        reset();
      }
      else {
        console.log("Failed", result?.error?.data?.errors);
        setValidationErrors(result?.error?.data?.errors);
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
    }
  };
  
  
    return (
        <div>
            <div className="RoomType-add-division">
        <form
          className="RoomType-add-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="property-input-title" htmlFor="name">
              RoomType Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              value={roomTypeData.name}
              onChange={(e) =>
               setroomTypeData({
                  ...roomTypeData,
                  name: e.target.value,
                })
              }
              // {...register("name", {
              //   required: {
              //     value: true,
              //     message: "Payment Type is required",
              //   },
              // })}
            />
            {validationErrors.name && (
              <span className="label-text-alt text-red-500">
                {validationErrors.name}
              </span>
            )}
          </div>

       

          <div className="mb-3">
            <label className="property-input-title" htmlFor="view_order">
              View Order
            </label>
            <input
              className="input-box"
              id="view_order"
              name="view_order"
              value={roomTypeData.view_order}
              onChange={(e) =>
                setroomTypeData({
                  ...roomTypeData,
                  view_order: e.target.value,
                })
              }
              // {...register("view_order", {
              //   required: {
              //     value: true,
              //     message: "View order is required",
              //   },
              // })}
            />

            {validationErrors.view_order && (
              <span className="label-text-alt text-red-500">
                {validationErrors.view_order}
              </span>
            )}
          </div>

          <div className="mb-3 property-input-title">
            <div className="flex gap-3">
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="active"
                  value={1}
                  checked={roomTypeData.is_active == 1}
                  onChange={(e) =>
                    setroomTypeData({
                      ...roomTypeData,
                      is_active: e.target.value,
                    })
                  }
                  // {...register("is_active", { required: true })}
                />
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="inactive"
                  value={0}
                  checked={roomTypeData.is_active == 0}
                  onChange={(e) =>
                    setroomTypeData({
                      ...roomTypeData,
                      is_active: e.target.value,
                    })
                  }
                  // {...register("is_active", { required: true })}
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

          <button type="submit" className="country-save-btn">
            Save
          </button>
        </form>
</div>
        </div>
    );
};

export default RoomTypeEdit;