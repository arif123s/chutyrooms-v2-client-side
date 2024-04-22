import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BASE_ASSET_API } from "../../../../../BaseApi/AssetUrl";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { useGetAllAmenitiesCategoriesQuery , useGetSingleAmenitiesQuery , useUpdateAmenitiesMutation } from "../../../../../redux/features/admin/Amenities/amenities.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import arrowDownIcon from "../../../../../assets/icons/arrow-down.svg";

const EditAmenities = () => {

    const navigate = useNavigate();
    const { id } = useParams();
  //   alert(id)
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const [amenitiesData, setamenitiesData] = useState({
      name: "",
      amenities_type_id : "",
      view_order: "",
      is_active: null,
    });
    const [selectedAmenitiesCategory, setSelectedAmenitiesCategory] = useState('');
  
  
     const [validationErrors, setValidationErrors] = useState({});
  
    const { data } = useGetAllAmenitiesCategoriesQuery();
    const AmenitiesCategories = data?.data.data;
    // console.log(AmenitiesCategories);

    const {data: singleAmenitiesdata,  isLoading , refetch } = useGetSingleAmenitiesQuery(id);
    // console.log(singleAmenitiesdata);
    const SingleAmenity = singleAmenitiesdata?.data;
    console.log(SingleAmenity)

    useEffect(() => {

      setSelectedAmenitiesCategory(SingleAmenity?.amenities_type_id);
      refetch();
    }, [SingleAmenity]);

   
  
   
    
  
    
    
  
    const [updateAmenitities, { isLoading: updateLoading,
    
      }] =useUpdateAmenitiesMutation();
  
   useEffect(() => {
    
      if(SingleAmenity)
      {
        setamenitiesData({
          name: SingleAmenity.name,
          amenities_type_id : SingleAmenity.amenities_type_id,
          view_order: SingleAmenity.view_order,
          is_active: SingleAmenity.is_active,
        });
      
          refetch();
      }
    
    }, [SingleAmenity]);
  
    
  
    if (isLoading ) {
      return <Loading></Loading>;
    }
  
  
    const onSubmit = async (data) => {
      const amenitiesInfo = {
        id: id,
        name: amenitiesData.name,
        amenities_type_id : amenitiesData.amenities_type_id,
        view_order: amenitiesData.view_order,
        is_active: parseInt(amenitiesData.is_active),
      };
  
    
  
     
  
      const formData = new FormData();
  
      Object.entries(amenitiesInfo).forEach(([key, value]) => {
        const formattedValue =
            key === "is_active" ? parseInt(value, 10) : value;
          formData.append(key, formattedValue);
        
      });
      
      formData.append("_method", "PUT");
      console.log("formdata", Object.fromEntries(formData));
  
      const amenitiesinfo = {
        id,
        formData,
      };
  
      try {
        const result = await updateAmenitities(amenitiesinfo);
        if (result?.data?.status) {
          console.log("Amenities ", result);
          toast.success("Amenities  edited successfully");
          navigate("/dashboard/Amenities");
          reset();
        }
        else {
          console.log("Failed", result?.error?.data?.errors);
          setValidationErrors(result?.error?.data?.errors);
        }
      } catch (error) {
        console.error("Error adding Amenities:", error);
      }
    };
    
    return (
        <div>
            <div className="amenities-add-division">
        <form
          className="amenities-add-form"
          onSubmit={handleSubmit(onSubmit)}
        >

        <label className="property-input-title block" htmlFor="amenities_type_id">
              Amenities Category
            </label>
            <div className="property-input-div">
              <select
                id="amenities_type_id"
                className="property-input"
                name="amenities_type_id"
              value={selectedAmenitiesCategory}

                // {...register("amenities_type_id", {
                //   required: {
                //     value: true,
                //     message: "amenities_type_id  is required",
                //   },
                // })}

                onClick={(e) =>
                    setamenitiesData({
                      ...amenitiesData,
                      amenities_type_id: e.target.value,
                    })
                  }
              >
                <option>Select Amenities Category</option>
             
                {AmenitiesCategories?.map(amenitiescatergory => (
                    <option key={amenitiescatergory.id} value={amenitiescatergory.id}>
                        {amenitiescatergory.name}
                    </option>
                ))}
           
              </select>
            
              <img
                // className="absolute top-[14px] right-[12px] arrow-icon"
                className="arrow-icon"
                src={arrowDownIcon}
                alt=""
              />
            </div>
          <div>
            <label className="property-input-title" htmlFor="name">
              Amenities Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              value={amenitiesData.name}
              onChange={(e) =>
                setamenitiesData({
                  ...amenitiesData,
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
              value={amenitiesData.view_order}
              onChange={(e) =>
                setamenitiesData({
                  ...amenitiesData,
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
                  checked={amenitiesData.is_active == 1}
                  onChange={(e) =>
                    setamenitiesData({
                      ...amenitiesData,
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
                  checked={amenitiesData.is_active == 0}
                  onChange={(e) =>
                    setamenitiesData({
                      ...amenitiesData,
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

export default EditAmenities;