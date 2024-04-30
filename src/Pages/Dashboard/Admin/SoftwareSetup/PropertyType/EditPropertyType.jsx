import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BASE_ASSET_API } from "../../../../../BaseApi/AssetUrl";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { useGetSinglePropertyTypeQuery , useUpdatePropertyTypeMutation } from "../../../../../redux/features/admin/Property/PropertyTypes.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditPropertyType = () => {

    const navigate = useNavigate();
    const { id } = useParams();
  //   alert(id)
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const [propertyTypeData, setpropertyTypeData] = useState({
      name: "",
      view_order: "",
      is_active: null,
    });
  
  
     const [validationErrors, setValidationErrors] = useState({});
  
    const { data, isLoading,refetch } = useGetSinglePropertyTypeQuery(id);
    const propertyType = data?.data;
  
   
    console.log(propertyType);
  
    
    
  
    const [updatePropertyType, { isLoading: updateLoading,
    
      }] =useUpdatePropertyTypeMutation();
  
   useEffect(() => {
    
      if(propertyType)
      {
          setpropertyTypeData({
          name: propertyType.name,
        
          view_order: propertyType.view_order,
          is_active: propertyType.is_active,
        });
      
          refetch();
      }
    
    }, [propertyType]);
  
    
  
    if (isLoading || updateLoading) {
      return <Loading></Loading>;
    }
  
  
    const onSubmit = async (data) => {
      const propertyTypeInfo = {
        id: id,
        name: propertyTypeData.name,
     
        view_order: propertyTypeData.view_order,
        is_active: parseInt(propertyTypeData.is_active),
      };
  
    
  
     
  
      const formData = new FormData();
  
      Object.entries(propertyTypeInfo).forEach(([key, value]) => {
        const formattedValue =
            key === "is_active" ? parseInt(value, 10) : value;
          formData.append(key, formattedValue);
        
      });
      
      formData.append("_method", "PUT");
      console.log("formdata", Object.fromEntries(formData));
  
      const propertytypeInfo = {
        id,
        formData,
      };
  
      try {
        const result = await updatePropertyType(propertytypeInfo);
        if (result?.data?.status) {
          console.log("Property Type", result);
          toast.success("Property Type edited successfully");
          navigate("/dashboard/properties/propertyTypes");
          reset();
        }
        else {
          console.log("Failed", result?.error?.data?.errors);
          setValidationErrors(result?.error?.data?.errors);
        }
      } catch (error) {
        console.error("Error adding property type:", error);
      }
    };
    return (
        <div>
             <div className="PropertyType-add-division">
        <form
          className="PropertyType-add-form"
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
              value={propertyTypeData.name}
              onChange={(e) =>
               setpropertyTypeData({
                  ...propertyTypeData,
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
              value={propertyTypeData.view_order}
              onChange={(e) =>
                setpropertyTypeData({
                  ...propertyTypeData,
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
                  checked={propertyTypeData.is_active == 1}
                  onChange={(e) =>
                    setpropertyTypeData({
                      ...propertyTypeData,
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
                  checked={propertyTypeData.is_active == 0}
                  onChange={(e) =>
                    setpropertyTypeData({
                      ...propertyTypeData,
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

export default EditPropertyType;