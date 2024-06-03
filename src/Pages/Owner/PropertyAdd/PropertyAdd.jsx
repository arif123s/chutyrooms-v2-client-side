// import starFill from "../../../assets/icons/star-fill.svg";
// import starBlank from "../../../assets/icons/star-blank.svg";
// import delteIcon from "../../../assets/icons/delete.svg";
import imgIcon from "../../../assets/icons/img.svg";
// import videoIcon from "../../../assets/icons/frame.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";
import searchIcon from "../../../assets/icons/search-normal.svg";
// import markLoaction from "../../../assets/icons/mark-location.svg";
import Rating from "@mui/material/Rating";
// import Stack from "@mui/material/Stack";
import "./PropertyAdd.css";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Rectangle,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import CancellationPolicy from "./CancellationPolicy/CancellationPolicy";
// import { useMutation } from "react-query";
import Loading from "../../Common/Includes/Loading/Loading";
import {
  useGetAllActiveDivisionQuery,
  useGetAllActiveDistrictQuery,
  useGetAllActiveAreaQuery,
  useAddPropertyAddMutation,
  useGetAllPropertyAddingPropertiesQuery,
} from "../../../redux/features/owner/propertyAdd/propertyAdd.api";
import { BASE_ASSET_API } from "../../../BaseApi/AssetUrl";
import { toast } from "react-toastify";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "230px",
  borderRadius: "8px",
};
// const center = {
//   lat: 23.862725477930507,
//   lng: 90.40080333547479,
// };

const PropertyAdd = () => {
  // const MAX_VIDEO_SIZE_MB = 5;
  const navigate = useNavigate();

  const {
    data: propertyAdding,
    isLoading: propertyLoading,
    // refetch,
  } = useGetAllPropertyAddingPropertiesQuery();

  console.log(propertyAdding);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [cancellationData, setCancellationData] = useState([
    { duration: { hours: 47, minutes: 59 }, refund_percentage: 100 },
    { duration: { hours: 23, minutes: 59 }, refund_percentage: 50 },
  ]);

  const [center, setCenter] = useState({
    lat: 23.862725477930507,
    lng: 90.40080333547479,
  });

  const [mapCenter, setMapCenter] = useState(center);
  // const [mapError, setMapError] = useState(false);
  const [mapError, setMapError] = useState({
    status: false,
    message: "",
    color: false,
    count: 0,
  });
  const [validationErrors, setValidationErrors] = useState({});
  console.log(validationErrors);
  // console.log(validationErrors?.images.0.image)

  const [address, setAddress] = useState("");
  const [rectangleBounds, setRectangleBounds] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY",
    libraries,
  });

  const [allInputError, setAllInputError] = useState({
    status: false,
    message: "",
  });

  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState(null);
  const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [displayImageError, setDisplayImageError] = useState(null);
  let displayImageCount = 0;
  // const [video, setVideo] = useState(null);
  // const [videoError, setVideoError] = useState(true);

  const selectedPropertyTypes = useWatch({
    control,
    name: "propertyTypes",
    defaultValue: [],
  });

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(null);

  const [countryId, setCountryId] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  // console.log( countryId);

  const { data: divisionData, refetch: refetchDivisions } =
    useGetAllActiveDivisionQuery(countryId);

  const { data: districtData, refetch: refetchDistricts } =
    useGetAllActiveDistrictQuery(divisionId);

  const { data: areaData, refetch: refetchAreas } =
    useGetAllActiveAreaQuery(districtId);

  const [
    addPropertyAdd,
    {
      isLoading,
      // isError,
      //  error
    },
  ] = useAddPropertyAddMutation();

  // console.log("divisionData", divisionData?.data?.length);

  useEffect(() => {
    // Fetch data only if Id is not null
    if (countryId !== null) {
      refetchDivisions();
    }
    if (divisionId !== null) {
      refetchDistricts();
    }
    if (districtId !== null) {
      refetchAreas();
    }
  }, [
    countryId,
    refetchDivisions,
    divisionId,
    refetchDistricts,
    districtId,
    refetchAreas,
  ]);

  // const handleCountryChange = (e) => {
  //   const selectedCountryId = e.target.value;
  //   console.log(selectedCountryId);
  // };

  const handleMapClick = (e) => {
    const { latLng } = e;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setCenter({ lat: latitude, lng: longitude });
    setMapCenter({ lat: latitude, lng: longitude });
    setSelectedLocation({ lat: latitude, lng: longitude }); // Update selected location
    // setMapError(false);
    setMapError({
      status: true,
      message: "Location selected",
      color: true,
      count: 1,
    });
  };

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setMapCenter(latLng);
      console.log("latLng", latLng);
      setRectangleBounds(/* calculate your bounds if needed */);

      // Set the selected location
      setSelectedLocation(latLng);

      // setMapError({
      //   status: false,
      // });
      setMapError({
        status: true,
        message: "Location selected",
        color: true,
        count: 1,
      });
    } catch (error) {
      console.error("Error selecting address", error);
    }
  };

  const onRectangleLoad = (rectangle) => {
    // Access rectangle object here
    console.log("Rectangle Loaded:", rectangle);
  };

  if (loadError) {
    return <div className="text-center py-[60px]">Error loading maps!</div>;
  }

  if (!isLoaded || loading || propertyLoading) {
    return <Loading></Loading>;
  }

  const handleLogoSelect = (event) => {
    const fileInput = event.target;

    if (fileInput?.files[0]?.size > 100 * 1024) {
      setLogo(null);
      setLogoError({
        status: true,
        message: "Image size can't be more than 100KB",
      });
      return;
    }

    if (fileInput?.files?.length > 0) {
      setLogo({
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
        logoFile: fileInput.files[0],
      });
      // setLogoError("");
      setLogoError(null);
    }
    else {
      // setLogo(null);
      // setLogoError({
      //   status: true,
      //   message: "Logo is required",
      // });
    }
  };

  // console.log(displayImages)

  const handleDisplayImageSelect = (index, event) => {
    const fileInput = event.target;
    if (fileInput?.files?.length > 0) {
      const newImages = [...displayImages];
      newImages[index] = {
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
        displayImageFile: fileInput.files[0],
      };
      setDisplayImages(newImages);
      displayImages.map((i) => {
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
    }
    else {
      // const newImages = [...displayImages];
      // newImages[index] = null;
      // setDisplayImages(newImages);

      // displayImages.map((i) => {
      //   if (i === null) {
      //     displayImageCount++;
      //   }
      // });
      // if (displayImageCount == 0) {
      //   setDisplayImageError({
      //     status: true,
      //     message: "Please select all four display images.",
      //   });
      // }
    }
  };

  // const handleVideoSelect = (event) => {
  //   const fileInput = event.target;
  //   if (fileInput?.files?.length > 0) {
  //     setVideo({
  //       name: fileInput.files[0].name,
  //       url: URL.createObjectURL(fileInput.files[0]),
  //     });
  //   } else {
  //     setVideo(null);
  //     setVideoError(true);
  //   }
  // };

  // const handleVideoDelete = () => {
  //   setVideo(null);
  //   setVideoError(false);
  // };

  const onSubmit = async (data) => {
    displayImages.map((i) => {
      if (i === null) {
        displayImageCount++;
      }
    });

    //  if (
    //    center.lat == 23.862725477930507 &&
    //    center.lng == 90.40080333547479 &&
    //    mapError.status == false
    //  )
    //  {
    //    setMapError({
    //      status: true,
    //      message: "Please select hotel location",
    //    });
    //    return;
    //  }

    if (!logo) {
      // setLogoError("Logo is required");
      setLogoError({
        status: true,
        message: "Logo is required",
      });
      setAllInputError({
        status: true,
        message: "Please select all the required fields",
      });
      return;
    }

    if (displayImageCount) {
      setDisplayImageError({
        status: true,
        message: "Please select all four display images.",
      });
      setAllInputError({
        status: true,
        message: "Please select all the required fields",
      });
      return;
    }

    if (!mapError.count) {
      console.log("Map error");
      setMapError({
        status: true,
        message: "Please select hotel location",
      });
      return;
    }

    const displayImageFiles = displayImages.map(
      (image) => image.displayImageFile
    );

    const propertyData = {
      name: data.propertyName,
      subtitle: data.subtitle,
      bin: data.bin,
      tin: data.tin,
      trade_license_number: "aaaa",
      area_id: data.area,
      address: data.address,
      description: data.description,
      hotel_class: data.rating,
      property_types: data.propertyTypes,
      amenities: data.amenities,
      images: displayImageFiles,
      check_in_time: `${data.checkin_hour}:${data.checkin_minute}`,
      check_in_time_period: data.checkin_time_period,
      // check_in_time_period: "AM",
      check_out_time: `${data.checkout_hour}:${data.checkout_minute}`,
      check_out_time_period: data.checkout_time_period,
      // check_out_time_period: "AM",
      latitude: parseFloat(mapCenter.lat),
      longitude: parseFloat(mapCenter.lng),
      cancellation: cancellationData,
      child_age_limit: data.child_age_limit,
      logo: logo.logoFile,
      short_description: data.shortDescription,
      instruction: data.instruction,
      payment_methods: data.paymentMethods,
      pet_policy: data.pet_policy,
      is_active: data.is_active,
      // video,
    };

    console.log(propertyData);

    const propertyFormData = new FormData();

    Object.entries(propertyData).forEach(([key, value]) => {
      if (
        key !== "images" &&
        key !== "logo" &&
        key !== "latitude" &&
        key !== "longitude"
      ) {
        // Handle specific properties
        if (
          key === "property_types" ||
          key === "payment_methods" ||
          key === "amenities"
        ) {
          value.forEach((item, index) => {
            propertyFormData.append(`${key}[${index}]`, item);
          });
        }
        // else if (key === "amenities") {
        //   // Merge amenities into FormData
        //   value.forEach((amenity, index) => {
        //     Object.entries(amenity).forEach(([amenityKey, amenityValue]) => {
        //       propertyFormData.append(
        //         `amenities[${index}][${amenityKey}]`,
        //         amenityValue
        //       );
        //     });
        //   });
        // }
        // else if (key === "cancellation") {
        //   // Handle cancellation data
        //   value.forEach((cancelData, index) => {
        //     Object.entries(cancelData).forEach(([cancelKey, cancelValue]) => {
        //       if (cancelKey === "duration") {
        //         // Handle duration object
        //         Object.entries(cancelValue).forEach(
        //           ([durationKey, durationValue]) => {
        //             propertyFormData.append(
        //               `cancellation[${index}][duration][${durationKey}]`,
        //               durationValue
        //             );
        //           }
        //         );
        //       } else {
        //         // Append other cancellation properties
        //         propertyFormData.append(
        //           `cancellation[${index}][${cancelKey}]`,
        //           cancelValue
        //         );
        //       }
        //     });
        //   });
        // }
        else if (key === "cancellation") {
          // Handle cancellation data
          value.forEach((cancelData, index) => {
            // Append duration object with hours and minutes
            propertyFormData.append(
              `cancellation_policies[${index}][duration]`,
              `{"hour":${cancelData.duration.hours},"min":${cancelData.duration.minutes}}`
            );

            // Append other cancellation properties
            Object.entries(cancelData).forEach(([cancelKey, cancelValue]) => {
              if (cancelKey !== "duration") {
                propertyFormData.append(
                  `cancellation_policies[${index}][${cancelKey}]`,
                  cancelValue
                );
              }
            });
          });
        } else {
          // Convert is_active to integer if it's present
          const formattedValue = key === "is_active" ? (value ? 1 : 0) : value;
          propertyFormData.append(key, formattedValue);
        }
      }
    });

    console.log(mapCenter);

    propertyFormData.append("latitude", parseFloat(mapCenter.lat));
    propertyFormData.append("longitude", parseFloat(mapCenter.lng));

    // Append image files to FormData
    if (Array.isArray(propertyData.images)) {
      propertyData.images.forEach((imageFile, index) => {
        propertyFormData.append(`images[${index}][image]`, imageFile);
      });
    }

    // Append logo file to FormData
    if (propertyData.logo) {
      propertyFormData.append("logo", propertyData.logo);
    }

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(propertyFormData));

    try {
      const result = await addPropertyAdd(propertyFormData);
      setLoading(false);

      // Handle successful mutation
      if (result?.data?.status) {
        console.log("Property", result);
        toast.success("Property registered successfully");
        navigate("/dashboard/property-list");
      } else {
        // console.log("Failed", result);
        console.log("Failed", result.error.data.errors);
        setValidationErrors(result?.error?.data?.errors);
        // setErrorMessage({
        //   status: true,
        //   message: data.message,
        //   errors: [result.error.data.errors],
        // });
        // console.log("errormessage", errorMessage?.errors?.length);
      }
    } catch (error) {
      // Handle error
      // console.error("Error :", error);
    }
  };

  const renderSpecificImageErrors = (validationErrors, imageIndex) => {
    const key = `images.${imageIndex}.image`;
    const errors = validationErrors[key];
    
    return (
      errors?.length > 0 &&
      errors.map((err, index) => (
        <p
          className="label-text-alt text-red-500 mt-[4px]"
          key={`${key}-${index}`}
        >
          {err}
        </p>
      ))
    );
  };

  return (
    <div className="mt-[12px] md:mt-[18px] lg:mt-[18px]">
      <form
        className="property-add-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="property-add-title">Property Adding</h2>

        {/* <form className="mt-[20px] text-[14px]" action=""> */}
        {/* General info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
          {/* Property Name */}
          <div className="">
            <label className="property-input-title" htmlFor="propertyName">
              Property Name
            </label>
            <input
              className="input-box"
              id="propertyName"
              name="propertyName"
              type="text"
              placeholder="Sea View"
              {...register("propertyName", {
                required: {
                  value: true,
                  message: "Property Name is required",
                },
              })}
            />
            <label className="">
              {errors.propertyName?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.propertyName?.message}
                </span>
              )}
            </label>
          </div>
          {/* Subtitle */}
          <div className="">
            <label className="property-input-title" htmlFor="bin">
              Subtitle
            </label>
            <input
              className="input-box"
              id="subtitle"
              name="subtitle"
              type="text"
              {...register("subtitle", {
                required: {
                  value: true,
                  message: "Subtitle is required",
                },
              })}
            />
            <label className="">
              {errors.subtitle?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.subtitle?.message}
                </span>
              )}
            </label>
          </div>
          {/* Bin */}
          <div className="">
            <label className="property-input-title" htmlFor="bin">
              Bin
            </label>
            <input
              className="input-box"
              id="bin"
              name="bin"
              type="text"
              {...register("bin", {
                required: {
                  value: true,
                  message: "Bin No is required",
                },
              })}
            />
            <label className="">
              {errors.bin?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.bin?.message}
                </span>
              )}
            </label>
          </div>
          {/* Tin */}
          <div className="">
            <label className="property-input-title" htmlFor="tin">
              Tin
            </label>
            <input
              className="input-box"
              id="tin"
              name="tin"
              type="text"
              {...register("tin", {
                required: {
                  value: true,
                  message: "Tin No is required",
                },
              })}
            />
            <label className="">
              {errors.tin?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.tin?.message}
                </span>
              )}
            </label>
          </div>
          {/* Country */}
          <div className="">
            <label className="property-input-title block" htmlFor="country">
              Country
            </label>
            <div className="property-input-div">
              <select
                id="country"
                className="property-input"
                name="country"
                onClick={(e) => setCountryId(e.target.value)}
                disabled={propertyAdding?.data?.countries?.length <= 0}
                {...register("country", {
                  required: {
                    value: true,
                    message: "Please select a country",
                  },
                })}
              >
                <option onClick={() => setCountryId(0)} value={null}>
                  Select Country
                </option>
                {propertyAdding?.data?.countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <label className="">
                {errors.country?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.country?.message}
                  </span>
                )}
              </label>
              <img
                // className="absolute top-[14px] right-[12px] arrow-icon"
                className="arrow-icon"
                src={arrowDownIcon}
                alt=""
              />
            </div>
          </div>
          {/* Division */}
          <div className="">
            <label className="property-input-title block" htmlFor="">
              Division
            </label>
            <div className="property-input-div">
              <select
                className="property-input"
                name="division"
                id="division"
                onClick={(e) => setDivisionId(e.target.value)}
                disabled={divisionData?.data?.length <= 0}
                {...register("division", {
                  required: {
                    value: true,
                    message: "Please select a division",
                  },
                })}
              >
                <option
                  onClick={(e) => setDivisionId(e.target.value)}
                  value={null}
                >
                  Select Division
                </option>
                {divisionData?.data?.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
              <label className="">
                {errors.division?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.division?.message}
                  </span>
                )}
              </label>
              <img className="arrow-icon" src={arrowDownIcon} alt="" />
            </div>
          </div>
          {/* State/District */}
          <div className="">
            <label className="property-input-title block" htmlFor="">
              State/District
            </label>
            <div className="property-input-div">
              <select
                className="property-input"
                name="district"
                id="district"
                onClick={(e) => setDistrictId(e.target.value)}
                disabled={districtData?.data?.length <= 0}
                {...register("district", {
                  required: {
                    value: true,
                    message: "Please select a district",
                  },
                })}
              >
                <option
                  onClick={(e) => setDistrictId(e.target.value)}
                  value={null}
                >
                  Select District
                </option>
                {districtData?.data?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <label className="">
                {errors.district?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.district?.message}
                  </span>
                )}
              </label>
              <img className="arrow-icon" src={arrowDownIcon} alt="" />
            </div>
          </div>
          {/* Area */}
          <div className="">
            <label className="property-input-title block" htmlFor="">
              Area
            </label>
            <div className="property-input-div">
              <select
                className="property-input"
                name="area"
                id="area"
                disabled={areaData?.data?.length <= 0}
                {...register("area", {
                  required: {
                    value: true,
                    message: "Please select an area",
                  },
                })}
              >
                <option value="">Select Area</option>
                {areaData?.data?.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
              <label className="">
                {errors.area?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.area?.message}
                  </span>
                )}
              </label>
              <img className="arrow-icon" src={arrowDownIcon} alt="" />
            </div>
          </div>
        </div>
        {/* Address */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="address">
            Address
          </label>
          <input
            className="input-box"
            id="address"
            name="address"
            type="text"
            {...register("address", {
              required: {
                value: true,
                message: "Address is required",
              },
            })}
          />
          <label className="">
            {errors.address?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.address?.message}
              </span>
            )}
          </label>
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
        {/* Property Rating */}
        <div className="mt-[18px]">
          <label className="property-input-title block" htmlFor="address">
            Property Rating
          </label>
          
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <div
                className="flex items-center gap-1.5 w-fit"
                onClick={(e) => {
                  field.onChange(e.target.value), setRating(e.target.value);
                }}
              >
                <Rating
                  name="half-rating"
                  precision={0.5}
                  value={parseFloat(field.value)}
                />
                {/* {rating && (
                  <p>
                    {rating}
                  </p>
                )} */}
              </div>
            )}
            rules={{
              validate: (value) => {
                if (value < 1 || value > 5) {
                  return "Rating must be between 1 and 5";
                }
                return true;
              },
            }}
          />
          {errors.rating && (
            <span className="label-text-alt text-red-500">
              {errors.rating.message}
            </span>
          )}
        </div>

        {/* Property Type */}
        <div className="mt-[18px]">
          <h2 id="property-type-title" className="property-input-title">
            Property Type
          </h2>

          <div className="text-[14px] flex items-center gap-x-[10px] md:gap-x-[12px] lg:gap-x-[12px]">
            <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="propertyTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  // <div>
                  //   <input
                  //     type="checkbox"
                  //     id="hotel-type1"
                  //     {...field}
                  //     onChange={(e) => {
                  //       field.onChange(e);
                  //       setValue(
                  //         "propertyTypes",
                  //         e.target.checked
                  //           ? [...field.value, "Hotel"]
                  //           : field.value.filter((type) => type !== "Hotel")
                  //       );
                  //     }}
                  //   />
                  //   <label htmlFor="hotel-type1"> Hotel</label>
                  // </div>

                  <>
                    {propertyAdding?.data?.property_types?.map(
                      (propertyType) => (
                        <div
                          key={propertyType.id}
                          className="flex items-center gap-[4px]"
                        >
                          <input
                            type="checkbox"
                            id={`hotel-type${propertyType.id}`}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValue(
                                "propertyTypes",
                                e.target.checked
                                  ? [...field.value, propertyType.id]
                                  : field.value.filter(
                                      (type) => type !== propertyType.id
                                    )
                              );
                              // setValue(
                              //   "propertyTypes",
                              //   e.target.checked
                              //     ? [...field.value, propertyType.name]
                              //     : field.value.filter(
                              //         (type) => type !== propertyType.name
                              //       )
                              // );
                            }}
                          />
                          <label htmlFor={`hotel-type${propertyType.id}`}>
                            {propertyType.name}
                          </label>
                        </div>
                      )
                    )}
                  </>
                )}
              />
            </div>

            {/* <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="propertyTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  <div>
                    <input
                      type="checkbox"
                      id="resort-type1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue(
                          "propertyTypes",
                          e.target.checked
                            ? [...field.value, "Resort"]
                            : field.value.filter((type) => type !== "Resort")
                        );
                      }}
                    />
                    <label htmlFor="resort-type1"> Resort</label>
                  </div>
                )}
              />
            </div> */}

            {/* <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="propertyTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  <div>
                    <input
                      type="checkbox"
                      id="cottage-type1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue(
                          "propertyTypes",
                          e.target.checked
                            ? [...field.value, "Cottage"]
                            : field.value.filter((type) => type !== "Cottage")
                        );
                      }}
                    />
                    <label htmlFor="cottage-type1"> Cottage</label>
                  </div>
                )}
              />
            </div> */}
          </div>
          {errors.propertyTypes && !selectedPropertyTypes?.length && (
            <span className="label-text-alt text-red-500">
              Please select at least one type
            </span>
          )}
        </div>

        {/* <div className="mt-[18px]">
          <h2 id="property-type-title" className="property-input-title">
            Property Type
          </h2>

          <div className="text-[14px] flex items-center gap-x-[10px] md:gap-x-[12px] lg:gap-x-[12px]">

            <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="propertyTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  <div>
                    <input
                      type="checkbox"
                      id="hotel-type1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue(
                          "propertyTypes",
                          e.target.checked
                            ? [...field.value, "Hotel"]
                            : field.value.filter((type) => type !== "Hotel")
                        );
                      }}
                    />
                    <label htmlFor="hotel-type1"> Hotel</label>
                  </div>
                )}
              />
            </div>

      
            <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="propertyTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  <div>
                    <input
                      type="checkbox"
                      id="resort-type1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue(
                          "propertyTypes",
                          e.target.checked
                            ? [...field.value, "Resort"]
                            : field.value.filter((type) => type !== "Resort")
                        );
                      }}
                    />
                    <label htmlFor="resort-type1"> Resort</label>
                  </div>
                )}
              />
            </div>

            <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="propertyTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  <div>
                    <input
                      type="checkbox"
                      id="cottage-type1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue(
                          "propertyTypes",
                          e.target.checked
                            ? [...field.value, "Cottage"]
                            : field.value.filter((type) => type !== "Cottage")
                        );
                      }}
                    />
                    <label htmlFor="cottage-type1"> Cottage</label>
                    {field &&
                      field.fieldState.value.length === 0 &&
                      errors.propertyTypes && (
                        <span className="label-text-alt text-red-500">
                          Please select at least one type
                        </span>
                      )}
                  </div>
                )}
              />
            </div>
          </div>
        </div> */}

        {/* Amenities */}
        <div className="mt-[18px] text-[14px]">
          <h2
            className="text-[16px] font-['Gilroy-semibold'] mb-[15px]"
            htmlFor="amenities"
          >
            Amenities
          </h2>

          {propertyAdding?.data?.amenitiesCategory?.map((category) => (
            <div key={category.id} className="mb-[15px]">
              <h2 className="property-input-title" htmlFor="amenities">
                {category.name}
              </h2>
              <div className="flex items-center gap-x-[8px] md:gap-x-[12px] lg:gap-x-[12px]">
                {category.amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]"
                  >
                    <Controller
                      name="amenities"
                      // name="amenities.generalAmenities"
                      control={control}
                      defaultValue={[]}
                      // rules={{ required: "Please select at least one checkbox." }}
                      render={({ field }) => (
                        <div className="flex items-center gap-[4px]">
                          <input
                            type="checkbox"
                            id="near-sea-beach"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValue(
                                "amenities",
                                e.target.checked
                                  ? [...field.value, amenity.id]
                                  : field.value.filter(
                                      (amenity) => amenity.id !== amenity.id
                                    )
                              );
                            }}
                          />
                          <label htmlFor="near-sea-beach">
                            {" "}
                            {amenity.name}
                          </label>
                        </div>
                      )}
                    />
                  </div>
                ))}

                {/* <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                  <Controller
                    name="amenities.generalAmenities"
                    control={control}
                    defaultValue={[]}
                    // rules={{ required: "Please select at least one checkbox." }}
                    render={({ field }) => (
                      <div className="flex items-center gap-[4px]">
                        <input
                          type="checkbox"
                          id="safety-lockers"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setValue(
                              "amenities.generalAmenities",
                              e.target.checked
                                ? [...field.value, "Safety lockers"]
                                : field.value.filter(
                                    (amenity) => amenity !== "Safety lockers"
                                  )
                            );
                          }}
                        />
                        <label htmlFor="safety-lockers"> Safety lockers</label>
                      </div>
                    )}
                  />
                </div> */}
              </div>
            </div>
          ))}

          {errors.generalAmenities && (
            <span className="label-text-alt text-red-500">
              {errors.generalAmenities.message}
            </span>
          )}
          {errors.bathroomAmenities && (
            <span className="label-text-alt text-red-500">
              {errors.bathroomAmenities.message}
            </span>
          )}
        </div>
        {/* <div className="mt-[18px] text-[14px]">
          <h2 className="text-[16px] font-semibold mb-[15px]" htmlFor="address">
            Amenities
          </h2>
          <div className="mb-[15px]">
            <h2 className="property-input-title" htmlFor="address">
              General
            </h2>
            <div className="flex items-center gap-x-[8px] md:gap-x-[12px] lg:gap-x-[12px]">
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <Controller
                  name="amenities.generalAmenities"
                  control={control}
                  defaultValue={[]}
                  // rules={{ required: "Please select at least one checkbox." }}
                  render={({ field }) => (
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="checkbox"
                        id="near-sea-beach"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue(
                            "amenities.generalAmenities",
                            e.target.checked
                              ? [...field.value, "Near from sea beach"]
                              : field.value.filter(
                                  (amenity) => amenity !== "Near from sea beach"
                                )
                          );
                        }}
                      />
                      <label htmlFor="near-sea-beach">
                        {" "}
                        Near from sea beach
                      </label>
                    </div>
                  )}
                />
              </div>
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <Controller
                  name="amenities.generalAmenities"
                  control={control}
                  defaultValue={[]}
                  // rules={{ required: "Please select at least one checkbox." }}
                  render={({ field }) => (
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="checkbox"
                        id="safety-lockers"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue(
                            "amenities.generalAmenities",
                            e.target.checked
                              ? [...field.value, "Safety lockers"]
                              : field.value.filter(
                                  (amenity) => amenity !== "Safety lockers"
                                )
                          );
                        }}
                      />
                      <label htmlFor="safety-lockers"> Safety lockers</label>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="property-input-title" htmlFor="address">
              Bathrooms
            </h2>
            <div className="flex items-center gap-x-[12px]">
              <div className="flex gap-x-[8px]">
                <Controller
                  name="amenities.bathroomAmenities"
                  control={control}
                  defaultValue={[]}
                  // rules={{ required: "Please select at least one checkbox." }}
                  render={({ field }) => (
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="checkbox"
                        id="toiletries"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue(
                            "amenities.bathroomAmenities",
                            e.target.checked
                              ? [...field.value, "Toiletries"]
                              : field.value.filter(
                                  (amenity) => amenity !== "Toiletries"
                                )
                          );
                        }}
                      />
                      <label htmlFor="toiletries"> Toiletries</label>
                    </div>
                  )}
                />
              </div>
              <div className="flex gap-x-[8px]">
                <Controller
                  name="amenities.bathroomAmenities"
                  control={control}
                  defaultValue={[]}
                  // rules={{ required: "Please select at least one checkbox." }}
                  render={({ field }) => (
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="checkbox"
                        id="bathtub"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValue(
                            "amenities.bathroomAmenities",
                            e.target.checked
                              ? [...field.value, "Bathtub"]
                              : field.value.filter(
                                  (amenity) => amenity !== "Bathtub"
                                )
                          );
                        }}
                      />
                      <label htmlFor="bathtub"> Bathtub</label>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {errors.generalAmenities && (
            <span className="label-text-alt text-red-500">
              {errors.generalAmenities.message}
            </span>
          )}
          {errors.bathroomAmenities && (
            <span className="label-text-alt text-red-500">
              {errors.bathroomAmenities.message}
            </span>
          )}
        </div> */}
        {/* <div className="mt-[18px]">
          <h2 className="text-[16px] font-semibold mb-[15px]" htmlFor="address">
            Amenities
          </h2>

          <div className="mb-[15px]">
            <h2 className="property-input-title" htmlFor="address">
              General
            </h2>
            <div className="flex items-center gap-x-[8px] md:gap-x-[12px] lg:gap-x-[12px]">
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <input type="checkbox" name="hotel-type1" id="hotel-type1" />
                <label
                  className="text-[14px] md:text-[16px] lg:text-[16px]"
                  htmlFor="hotel-type1"
                >
                  Near from sea beach
                </label>
              </div>
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <input type="checkbox" name="hotel-type2" id="hotel-type2" />
                <label
                  className="text-[14px] md:text-[16px] lg:text-[16px]"
                  htmlFor="hotel-type2"
                >
                  Safety lockers
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="property-input-title" htmlFor="address">
              Bathrooms
            </h2>
            <div className="flex items-center gap-x-[12px]">
              <div className="flex gap-x-[8px]">
                <input type="checkbox" name="hotel-type1" id="hotel-type1" />
                <label htmlFor="hotel-type1">Toiletries</label>
              </div>
              <div className="flex gap-x-[8px]">
                <input type="checkbox" name="hotel-type2" id="hotel-type2" />
                <label htmlFor="hotel-type2">Bathtub</label>
              </div>
            </div>
          </div>
        </div> */}
        {/* Image */}
        <div className="mt-[18px] ">
          <div className="property-images-container">
            {/* Logo */}
            <div>
              <h2 className="mb-[12px]">Logo</h2>
              <div className=" ">
                {/* <div className="flex justify-end absolute top-[8px] right-[8px]">
                    <img
                      className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                      src={delteIcon}
                      alt=""
                    />
                  </div> */}

                <label htmlFor="logo" className="input-label">
                  <div className="w-full h-[148px]  flex justify-center items-center rounded-[8px] bg-[#F2F5F6] border-[1px] border-[#E6E7E6] mt-[0px]">
                    <div className="">
                      {logo ? (
                        <>
                          <div className="grid justify-center w-full relative">
                            <div
                            // className="flex items-center mb-[8px] md:block md:justify-center"
                            >
                              {/* <div className="flex md:justify-center">
                                <img
                                  src={logo.url}
                                  alt="Selected File"
                                  // className="w-8 mr-1"
                                  className="w-full absolute"
                                />
                              </div> */}
                              {/* <p className="text-[12px] text-center block z-10">
                                {logo?.name?.length > 16
                                  ? logo?.name.slice(0, 15) + "..."
                                  : logo?.name}
                              </p> */}
                            </div>
                            <p className="text-[14px] text-center absolute -bottom-6 left-4 z-10">
                              Update Photo
                            </p>
                            <img
                              src={logo.url}
                              alt="Selected File"
                              // className="w-8 mr-1"
                              className=" w-full h-[110px] mt-[-30px] "
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-center mb-[8px]">
                            <img className="w-[20px]" src={imgIcon} alt="" />
                          </div>
                          <p className="text-[14px] text-center">
                            Browse Photo
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept=".jpg, .jpeg, .png, .svg"
                    onChange={handleLogoSelect}
                    style={{ display: "none" }}
                    // {...register("logo", { required: "File is required" })}
                  />
                </label>
              </div>
              {logoError?.status === true && (
                <p className="label-text-alt text-red-500 mt-[2px]">
                  {logoError.message}
                </p>
              )}
              {validationErrors.logo && (
                <span className="label-text-alt text-red-500">
                  {validationErrors.logo}
                </span>
              )}
            </div>

            {/* Display Image */}
            <div>
              <h2 className="">Display Image</h2>
              <div className="property-display-images">
                {displayImages.map((image, index) => (
                  <div key={index}>
                    <label
                      htmlFor={`display-image-${index}`}
                      className="input-label"
                    >
                      <div className="w-full h-[148px] flex justify-center items-center rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                        {image ? (
                          <>
                            <div className="grid justify-center ">
                              <div className="flex items-center mb-[8px] justify-center">
                                <div className="">
                                  <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-12 mr-1"
                                  />
                                </div>
                                {/* <span className="text-[12px] block text-center">
                                  {image?.name?.length > 16
                                    ? image?.name?.slice(0, 15) + "..."
                                    : image?.name}
                                </span> */}
                              </div>
                              <p className="text-[14px] text-center">
                                Update Photo
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className="flex justify-center mb-[8px]">
                                <img
                                  className="w-[20px]"
                                  src={imgIcon}
                                  alt=""
                                />
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
                        handleDisplayImageSelect(index, event)
                      }
                      // {...register(`displayImages[${index}]`, {
                      //   required: "Image is required",
                      // })}
                    />
                    {
                      // validationErrors.images[0].image?.length &&
                      //   validationErrors?.images.index.image.map((err, index) => (
                      //     <div key={index}>
                      //       {err.map((value, i) => (
                      //         <p
                      //           className="label-text-alt text-rose-500 text-center mb-[2px]"
                      //           key={i}
                      //         >
                      //           {value}
                      //         </p>
                      //       ))}
                      //     </div>
                      //   ))
                      // validationErrors["images.0.image"] && (
                      //   <p className="label-text-alt text-red-500 mt-[4px]">
                      //     {validationErrors["images.1.image"]}
                      //   </p>
                      // )
                    }
                    {/* {Object.keys(validationErrors).map((key) => {
                      if (key.startsWith("images.") && key.endsWith(".image")) {
                        const errors = validationErrors[key];
                        return (
                          errors.length > 0 &&
                          errors.map((err, index) => (
                            <p
                              className="label-text-alt text-red-500 mt-[4px]"
                              key={`${key}-${index}`}
                            >
                              {err}
                            </p>
                          ))
                        );
                      }
                      return null;
                    })} */}
                    {renderSpecificImageErrors(validationErrors, index)}
                  </div>
                ))}
              </div>
              {displayImageError?.status === true && (
                <p className="label-text-alt text-red-500 mt-[4px]">
                  {displayImageError.message}
                </p>
              )}

              {/* <div>
                  <h2 className="">Display Image</h2>
                  <div className="relative">
                    <label htmlFor="fileInput" className="input-label">
                      <div className="w-full h-[148px] flex justify-center items-center rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                        <div className="">
                          {displayImage ? (
                            <>
                              <div className="grid justify-center ">
                                <div className="flex items-center mb-[8px]">
                                  <img
                                    src={URL.createObjectURL(displayImage)}
                                    alt="Selected File"
                                    className="w-8 mr-1"
                                  />
                                  <span className="">{displayImage.name}</span>
                                </div>
                                <p className="property-input-title text-center">
                                  Browse Photo
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-center mb-[8px]">
                                <img
                                  className="w-[20px]"
                                  src={imgIcon}
                                  alt=""
                                />
                              </div>
                              <p className="property-input-title text-center">
                                Browse Photo
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleDisplayImage}
                      style={{ display: "none" }}
                    />
                  </div>
                </div> */}
            </div>
          </div>
        </div>
        {/* Video */}
        {/* <div className="mt-[18px]">
          <h2> Property Video {`(Optional)`}</h2>
          <div className="relative">
            <div
              onClick={handleVideoDelete}
              className="flex justify-end absolute top-[8px] right-[8px]"
            >
              <img
                className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                src={delteIcon}
                alt=""
              />
            </div>
            <label htmlFor="video" className="input-label">
              <div className="w-full h-[120px] rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                <div className="mt-[30px]">
                  {video && !errors.video ? (
                    <div className="grid justify-center">
                      <div className="flex mb-[8px] items-center">
                        <img
                          src={video.url}
                          alt="Selected File"
                          className="w-10 mr-1"
                        />
                        <span className="">{video.name}</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-[8px]">
                        <img className="w-[20px]" src={videoIcon} alt="" />
                      </div>
                      <p className="property-input-title text-center">Upload</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <Controller
                  name="video"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) => {
                      if (value) {
                        const allowedTypes = ["video/mp4", "video/mkv"];
                        const fileType = value[0]?.type;
                        const fileSize = value[0]?.size / (1024 * 1024);

                        if (!allowedTypes.includes(fileType)) {
                          return "Please select mp4 or mkv file.";
                        }

                        if (fileSize > MAX_VIDEO_SIZE_MB) {
                          return `File size should be less than ${MAX_VIDEO_SIZE_MB} MB.`;
                        }
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="file"
                        id="video"
                        accept=".mkv, .mp4"
                        onChange={(e) => {
                          field.onChange(e);
                          handleVideoSelect(e);
                        }}
                        style={{ display: "none" }}
                      />
                      <label className="">
                        {errors.video && videoError && (
                          <span className="label-text-alt text-red-500">
                            {errors.video.message}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                />
              </div>
            </label>
          </div>
        </div> */}

        {/* Checkin */}
        <div className="mt-[18px]">
          <div className="flex items-center gap-2 lg:gap-4 mb-[12px]">
            <p className="flex w-[100px] justify-between">
              Check In{" "}
              <span className="mr-[4px] md:mr-[8px] lg:mr-[12px]">:</span>{" "}
            </p>

            <div className="w-[66px]">
              <div
              // className="border-[1px] rounded-[4px] relative"
              >
                <input
                  className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6] bg-white"
                  type="number"
                  name="checkin_hour"
                  id="checkin_hour"
                  placeholder="Hour"
                  {...register("checkin_hour", {
                    required: {
                      value: true,
                      message: "Check in time is required",
                    },
                    min: {
                      value: 1,
                      message: "Hour should be between 1 and 12",
                    },
                    max: {
                      value: 12,
                      message: "Hour should be between 1 and 12",
                    },
                  })}
                />
                {/* <label className="">
                  {errors.checkin_hour?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.checkin_hour?.message}
                    </span>
                  )}
                </label> */}
              </div>
            </div>

            <p>:</p>

            <div className="w-[76px]">
              {/* <p>Minute</p> */}
              <div>
                <input
                  className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6] bg-white"
                  type="number"
                  name="checkin_minute"
                  id="checkin_minute"
                  placeholder="Minute"
                  {...register("checkin_minute", {
                    required: {
                      value: true,
                      message: "Check in time is required",
                    },
                    min: {
                      value: 0,
                      message: "Minute should be between 0 and 59",
                    },
                    max: {
                      value: 59,
                      message: "Minute should be between 0 and 59",
                    },
                  })}
                />
                {/* <label className="">
                  {errors.checkin_minute?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.checkin_minute?.message}
                    </span>
                  )}
                </label> */}
              </div>
            </div>

            <div className="w-[56px]">
              <div className="border-[1px] rounded-[4px] relative h-[36px]">
                <select
                  className="flex items-center justify-center w-full h-full rounded-[4px] px-[4px] bg-white text-[14px]"
                  id="checkin_time_period"
                  name="checkin_time_period"
                  defaultValue="AM"
                  // onClick={(e) => setCountryId(e.target.value)}
                  {...register("checkin_time_period", {
                    // required: {
                    //   value: true,
                    //   message: "Please select an option",
                    // },
                  })}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                {/* <label className="">
                  {errors.division?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.division?.message}
                    </span>
                  )}
                </label> */}
                <img
                  className="absolute top-2 right-1"
                  src={arrowDownIcon}
                  alt=""
                />
              </div>
            </div>
            {/* <span className="text-[14px] md:text-[16px] lg:text-[16px] inline-block ml-[4px]">
              AM
            </span> */}
            {/* <label className="block">
              {errors.checkin && (
                <span className="label-text-alt text-red-500">
                  {errors.checkin?.message}
                </span>
              )}
            </label> */}
          </div>
          <div className="flex items-center gap-2 lg:gap-4 mb-[12px]">
            <p className="flex w-[104px] justify-between">
              Check Out{" "}
              <span className="mr-[4px] md:mr-[8px] lg:mr-[12px]">:</span>{" "}
            </p>

            <div className="w-[66px]">
              <div
              // className="border-[1px] rounded-[4px] relative"
              >
                <input
                  className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6] bg-white"
                  type="number"
                  name="checkout_hour"
                  id="checkout_hour"
                  placeholder="Hour"
                  {...register("checkout_hour", {
                    required: {
                      value: true,
                      message: "Check out time is required",
                    },
                    min: {
                      value: 1,
                      message: "Hour should be between 1 and 12",
                    },
                    max: {
                      value: 12,
                      message: "Hour should be between 1 and 12",
                    },
                  })}
                />
                {/* <label className="">
                  {errors.checkout_hour?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.checkout_hour?.message}
                    </span>
                  )}
                </label> */}
              </div>
            </div>

            <p>:</p>

            <div className="w-[76px]">
              {/* <p>Minute</p> */}
              <div>
                <input
                  className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6] bg-white"
                  type="number"
                  name="checkout_minute"
                  id="checkout_minute"
                  placeholder="Minute"
                  {...register("checkout_minute", {
                    required: {
                      value: true,
                      message: "Check in time is required",
                    },
                    min: {
                      value: 0,
                      message: "Minute should be between 0 and 59",
                    },
                    max: {
                      value: 59,
                      message: "Minute should be between 0 and 59",
                    },
                  })}
                />
                {/* <label className="">
                  {errors.checkout_minute?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.checkout_minute?.message}
                    </span>
                  )}
                </label> */}
              </div>
            </div>

            <div className="w-[56px]">
              <div className="border-[1px] rounded-[4px] relative h-[36px]">
                <select
                  className="flex items-center justify-center w-full h-full rounded-[4px] px-[4px] bg-white text-[14px]"
                  id="checkout_time_period"
                  name="checkout_time_period"
                  {...register("checkout_time_period", {
                    // required: {
                    //   value: true,
                    //   message: "Please select an option",
                    // },
                  })}
                >
                  <option defaultValue="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <label className="">
                  {errors.checkout_time_period?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.checkout_time_period?.message}
                    </span>
                  )}
                </label>
                <img
                  className="absolute top-2 right-1"
                  src={arrowDownIcon}
                  alt=""
                />
              </div>
            </div>
            {/* <span className="text-[14px] md:text-[16px] lg:text-[16px] inline-block ml-[4px]">
              AM
            </span> */}
            <label className="block">
              {errors.checkin && (
                <span className="label-text-alt text-red-500">
                  {errors.checkin?.message}
                </span>
              )}
            </label>
          </div>
        </div>
        {/* Cancellation Policy */}
        <div className="mt-[18px]">
          <CancellationPolicy
            cancellationData={cancellationData}
            setCancellationData={setCancellationData}
          ></CancellationPolicy>
        </div>
        {/* Child age limit */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="bin">
            Child Age Limit
          </label>
          <input
            className="input-box"
            id="child_age_limit"
            name="child_age_limit"
            type="number"
            {...register("child_age_limit", {
              required: {
                value: true,
                message: "Child Age Limit is required",
              },
            })}
          />
          <label className="">
            {errors.child_age_limit?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.child_age_limit?.message}
              </span>
            )}
          </label>
        </div>
        {/* Short Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="shortDescription">
            Short Description
          </label>
          <textarea
            className="property-description block input-box h-[120px]"
            name="shortDescription"
            id="shortDescription"
            placeholder=""
            {...register("shortDescription", {
              required: "Short description is required",
              maxLength: {
                value: 200,
                message: "Short description cannot exceed 200 characters",
              },
            })}
          ></textarea>
          <label className="">
            {errors.shortDescription && (
              <span className="label-text-alt text-red-500">
                {errors.shortDescription.message}
              </span>
            )}
          </label>
        </div>

        {/* Instruction */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="instruction">
            Instruction
          </label>
          <textarea
            className="input-box "
            name="instruction"
            id="instruction"
            placeholder=""
            {...register("instruction", {
              required: {
                value: true,
                message: "Instruction is required",
              },
            })}
          ></textarea>
          <label className="">
            {errors.instruction && (
              <span className="label-text-alt text-red-500">
                {errors.instruction.message}
              </span>
            )}
          </label>
        </div>

        {/* Pet policy */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="instruction">
            Pet Policy
          </label>
          <textarea
            className="input-box"
            name="pet_policy"
            id="pet_policy"
            placeholder=""
            {...register("pet_policy", {
              required: {
                value: true,
                message: "Pet policy is required",
              },
            })}
          ></textarea>
          <label className="">
            {errors.pet_policy && (
              <span className="label-text-alt text-red-500">
                {errors.pet_policy.message}
              </span>
            )}
          </label>
        </div>

        {/* Payment Method */}
        {/* <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="paymentMethod">
            Payment Method
          </label>
          <textarea
            className="input-box "
            name="paymentMethod"
            id="paymentMethod"
            placeholder=""
            {...register("paymentMethod", {
              required: {
                value: true,
                message: "Payment method is required",
              },
            })}
          ></textarea>
          <label className="">
            {errors.paymentMethod && (
              <span className="label-text-alt text-red-500">
                {errors.paymentMethod.message}
              </span>
            )}
          </label>
        </div> */}
        <div className="mt-[18px]">
          <h2 id="property-type-title" className="text-[14px]">
            Payment Method
          </h2>

          <div className="text-[14px] flex items-center gap-x-[10px] md:gap-x-[12px] lg:gap-x-[12px]">
            <div className="flex flex-wrap gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
              <Controller
                name="paymentMethods"
                control={control}
                defaultValue={[]}
                rules={{ required: "Please select at least one checkbox." }}
                render={({ field }) => (
                  <>
                    {propertyAdding?.data?.paymentMethods?.map(
                      (paymentMethod) => (
                        <div
                          key={paymentMethod.id}
                          className="flex items-center "
                        >
                          <input
                            type="checkbox"
                            id={`hotel-type${paymentMethod.id}`}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValue(
                                "paymentMethods",
                                e.target.checked
                                  ? [...field.value, paymentMethod.id]
                                  : field.value.filter(
                                      (type) => type.id !== paymentMethod.id
                                    )
                              );
                            }}
                          />
                          {/* <label htmlFor={`hotel-type${paymentMethod.id}`}>
                          {paymentMethod.name}
                        </label> */}
                          <img
                            className="w-12"
                            src={`${BASE_ASSET_API}/storage/images/payment/payment_methods/${paymentMethod.image}`}
                            alt="Payment-method"
                          />
                        </div>
                      )
                    )}
                  </>
                )}
              />
            </div>
          </div>
          {errors.propertyTypes && !selectedPropertyTypes?.length && (
            <span className="label-text-alt text-red-500">
              Please select at least one type
            </span>
          )}
        </div>

        {/* google map */}
        <div className="mt-[18px] mb-[20px]">
          <div className="flex justify-between relative z-10">
            <h2 className="property-input-title mt-[8px]">
              Locate Your Property
            </h2>
            <PlacesAutocomplete
              value={address}
              onChange={(value) => setAddress(value)}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="absolute right-0 h-[200px] overflow-auto">
                  <div className="relative w-[134px] md:w-[300px] lg:w-[300px] ">
                    <input
                      {...getInputProps({
                        placeholder: `Search Places`,
                        className:
                          "z-10 opacity-70 flex p-[8px] pl-[32px] text-[14px] items-center w-full border-[1px] rounded-[8px] border-[#c6c6c6] mb-[12px]",
                      })}
                    />
                    <img
                      className="w-4 absolute top-[11px] left-[12px]"
                      src={searchIcon}
                      alt=""
                    />
                    <div className="autocomplete-dropdown-container text-[12px] bg-white">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#159947"
                            : "#ffffff",
                          color: suggestion.active ? "white" : "black",
                        };
                        return (
                          <div
                            className="p-1"
                            key={index}
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <div className="mt-[20px] z-0">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              // center={center}
              center={mapCenter}
              // onLoad={onMapLoad}
              // onClick={(e) => {
              //   setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              //   setValue("map", { lat: e.latLng.lat(), lng: e.latLng.lng() });
              // }}
              // onClick={onMapClick}
              onClick={handleMapClick}
            >
              {rectangleBounds && (
                <Rectangle bounds={rectangleBounds} onLoad={onRectangleLoad} />
              )}
              {/* <Marker position={center} /> */}
              <Marker position={mapCenter} />
              {/* Additional marker at the search location */}
              {
                // address
                selectedLocation && (
                  <Marker
                    // clickable={true}
                    // className="pointer-events-none"
                    // position={mapCenter}
                    position={selectedLocation}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Customize the marker icon as needed
                      // url: {markLoaction}, // Customize the marker icon as needed
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                )
              }
            </GoogleMap>
            {/* Error messages */}
            <label className="">
              {/* Display message when location is selected */}
              {/* {selectedLocation && (
                <span className="label-text-alt text-green-500">
                  Location selected
                </span>
              )} */}
              {/* Display other errors */}

              {errors.map && (
                <span className="label-text-alt text-red-500">
                  {errors.map.message}
                </span>
              )}
            </label>
            {mapError.status && (
              <label className="mt-[4px]">
                <span
                  className={`label-text-alt ${
                    mapError.color ? "text-[#159947]" : "text-red-500"
                  }`}
                >
                  {/* Please select hotel location */}
                  {mapError.message}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Is active */}
        {/* <div className="mt-[18px] mb-[20px]">
          <label className="property-input-title" htmlFor="instruction">
            Active Status
          </label>
          <div className="property-input-div">
            <select
              className="property-input"
              id="is_active"
              name="is_active"
              {...register("is_active", {
                required: {
                  value: true,
                  message: "Please select an option",
                },
              })}
            >
              <option>Select option</option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            <label className="">
              {errors.is_active?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.is_active?.message}
                </span>
              )}
            </label>
            <img
              // className="absolute top-[14px] right-[12px] arrow-icon"
              className="arrow-icon"
              src={arrowDownIcon}
              alt=""
            />
          </div>
        </div> */}

        {allInputError.status && (
          <p className="label-text-alt text-red-500 text-right mb-[6px]">
            {allInputError.message}
          </p>
        )}

        <div className=" flex justify-end gap-x-[12px]">
          <button className="w-[80px] flex items-center justify-center md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px]">
            Cancel
          </button>
          <button
            // onClick={(e) => handleSave(e)}
            disabled={isLoading}
            type="submit"
            // disabled={!rectangleBounds}
            className="w-[80px] flex items-center justify-center md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAdd;
