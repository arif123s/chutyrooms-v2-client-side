import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BASE_ASSET_API } from "../../../../../BaseApi/AssetUrl";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { useGetSingleAmenitiesCategoryQuery , useUpdateAmenitiesCategoryMutation } from "../../../../../redux/features/admin/Amenities/amenitiesCategory.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditAmenitiesCategory = () => {

    const navigate = useNavigate();
  const { id } = useParams();
//   alert(id)
  const {
    control,
    // register,
    handleSubmit,
    // setValue,
    // formState: { errors },
    reset,
  } = useForm();

  const [amenitiesCategoryData, setamenitiesCategoryData] = useState({
    name: "",
    view_order: "",
    is_active: null,
  });






  // const [errorMessage, setErrorMessage] = useState({
  //   status: false,
  //   message: "",
  //   errors: [],
  // });

   const [validationErrors, setValidationErrors] = useState({});

  const { data, isLoading,refetch } = useGetSingleAmenitiesCategoryQuery(id);
  const amenitiesCategory = data?.data;

 
  console.log(amenitiesCategory);

  
  

  const [updateAmenititiesCategory, { isLoading: updateLoading,
    //  isError, error 
    }] =useUpdateAmenitiesCategoryMutation();

 useEffect(() => {
  
    if(amenitiesCategory)
    {
      setamenitiesCategoryData({
        name: amenitiesCategory.name,
      
        view_order: amenitiesCategory.view_order,
        is_active: amenitiesCategory.is_active,
      });
    
        refetch();
    }
  
  }, [amenitiesCategory]);

  
  


  if (isLoading || updateLoading) {
    return <Loading></Loading>;
  }


 

  const onSubmit = async (data) => {
    const amenitiesCategoryInfo = {
      id: id,
      name: amenitiesCategoryData.name,
   
      view_order: amenitiesCategoryData.view_order,
      is_active: parseInt(amenitiesCategoryData.is_active),
    };

  

   

    const formData = new FormData();

    Object.entries(amenitiesCategoryInfo).forEach(([key, value]) => {
   
        // Convert is_active to integer if it's present
        const formattedValue =
          key === "is_active" ? parseInt(value, 10) : value;
        formData.append(key, formattedValue);
      
    });

    // Append image file to FormData
   

    formData.append("_method", "PUT");

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(formData));

    const amenitiescategoryInfo = {
      id,
      formData,
    };

    try {
      const result = await updateAmenititiesCategory(amenitiescategoryInfo);
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("Amenities Category", result);
        toast.success("Amenities Category edited successfully");
        navigate("/dashboard/AmenitiesCategories");
        reset();
      }
      else {
        console.log("Failed", result?.error?.data?.errors);
        setValidationErrors(result?.error?.data?.errors);
        // console.log("Failed", result);
      }
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
      // setValidationErrors(err.response.data.errors);
    }
  };
  
  
  return (
<div>
<div className="paymentmethod-add-division">
        <form
          className="paymentmethod-add-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="property-input-title" htmlFor="name">
              PaymentType Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              value={amenitiesCategoryData.name}
              onChange={(e) =>
                setamenitiesCategoryData({
                  ...amenitiesCategoryData,
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
              value={amenitiesCategoryData.view_order}
              onChange={(e) =>
                setamenitiesCategoryData({
                  ...amenitiesCategoryData,
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
                  checked={amenitiesCategoryData.is_active == 1}
                  onChange={(e) =>
                    setamenitiesCategoryData({
                      ...amenitiesCategoryData,
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
                  checked={amenitiesCategoryData.is_active == 0}
                  onChange={(e) =>
                    setamenitiesCategoryData({
                      ...amenitiesCategoryData,
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

export default EditAmenitiesCategory;