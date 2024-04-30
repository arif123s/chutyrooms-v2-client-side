import delteIcon from "../../../../assets/icons/delete.svg";
import imgIcon from "../../../../assets/icons/img.svg";
import videoIcon from "../../../../assets/icons/frame.svg";
import arrowDownIcon from "../../../../assets/icons/arrow-down.svg";
import searchIcon from "../../../../assets/icons/search-normal.svg";

import { json, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllActiveAreaQuery,
  useGetAllActiveDistrictQuery,
  useGetAllActiveDivisionQuery,
  useGetAllPropertyAddingPropertiesQuery,
  useGetSinglePropertyQuery,
  useUpdatePropertyMutation,
} from "../../../../redux/features/owner/propertyAdd/propertyAdd.api";
import Loading from "../../../Common/Includes/Loading/Loading";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  GoogleMap,
  Marker,
  Rectangle,
  useLoadScript,
} from "@react-google-maps/api";
import { Rating, duration } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_ASSET_API } from "../../../../BaseApi/AssetUrl";
import CancellationPolicyEdit from "./CancellationPolicyEdit/CancellationPolicyEdit";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "230px",
  borderRadius: "8px",
};

const OwnerPropertyEdit = () => {
  const { propertyId } = useParams();
  const {
    data: propertyData,
    isLoading,
    // refetch,
  } = useGetSinglePropertyQuery(propertyId);

  const [updateProperty, { isLoading: updatePropertyLoading }] =
    useUpdatePropertyMutation();

  const navigate = useNavigate();

  const {
    data: propertyAdding,
    isLoading: propertyLoading,
    // refetch,
  } = useGetAllPropertyAddingPropertiesQuery();

  // console.log("propertyAdding", propertyAdding?.data.property_types);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [center, setCenter] = useState({
    lat: 23.862725477930507,
    lng: 90.40080333547479,
  });

  const [mapCenter, setMapCenter] = useState(center);
  const [mapError, setMapError] = useState({
    status: false,
    message: "",
    color: false,
    count: 0,
  });

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
  const [logoFile, setLogoFile] = useState(null);
  const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [images, setImages] = useState([]);
  const [check_in_time, setCheck_in_time] = useState({});
  const [check_out_time, setCheck_out_time] = useState({});
  const [cancellationData, setCancellationData] = useState([]);
  const [logoError, setLogoError] = useState(null);
  const [displayImageError, setDisplayImageError] = useState(null);
  let displayImageCount = 0;
  console.log(logo);
  // const [video, setVideo] = useState(null);
  // const [videoError, setVideoError] = useState(true);

  // console.log("logo", logo);
  // console.log("displayImages", displayImages);
  // console.log("cancellationData", cancellationData);
  // console.log("check_in_time", check_in_time);
  // console.log("check_out_time", check_out_time);

  // const selectedPropertyTypes = useWatch({
  //   control,
  //   name: "propertyTypes",
  //   defaultValue: [],
  // });

  const [property, setProperty] = useState({
    name: "",
    subtitle: "",
    bin: "",
    tin: "",
    trade_license_number: "",
    area_id: null,
    address: "",
    description: "",
    hotel_class: null,
    property_types: [],
    amenities: [],
    check_in_time: "",
    check_in_time_period: "",
    check_out_time: "",
    check_out_time_period: "",
    latitude: null,
    longitude: null,
    cancellation: [],
    short_description: "",
    instruction: "",
    payment_methods: [],
    pet_policy: "",
    is_active:null,
  });

  console.log(property);

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(null);

  const [countryId, setCountryId] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [areaId, setAreaId] = useState(null);

  const { data: divisionData, refetch: refetchDivisions } =
    useGetAllActiveDivisionQuery(countryId);

  const { data: districtData, refetch: refetchDistricts } =
    useGetAllActiveDistrictQuery(divisionId);

  const { data: areaData, refetch: refetchAreas } =
    useGetAllActiveAreaQuery(districtId);

  // console.log("districtId", districtId);
  // console.log("divisionId", divisionId);
  // console.log("areaId", areaId);

  useEffect(() => {
    if (propertyData?.data) {
      setLogoFile({
        name: "",
        url: `${BASE_ASSET_API}/storage/images/property/property_logo/${propertyData?.data?.logo}`,
        logoFile: null,
      });

      setDisplayImages(
        propertyData?.data?.images?.map((image) => ({
          name: "",
          url: `${BASE_ASSET_API}/storage/images/property/property_image/${image?.image}`,
          displayImageFile: null,
        }))
      );

      setCheck_in_time({
        hour: property?.check_in_time.split(":")[0],
        min: property?.check_in_time.split(":")[1],
        check_in_time_period: property?.check_in_time_period,
      });

      setCheck_out_time({
        hour: property?.check_out_time.split(":")[0],
        min: property?.check_out_time.split(":")[1],
        check_out_time_period: property?.check_out_time_period,
      });

      if (propertyData?.data?.cancellation_policies) {
        const cancellation = propertyData.data.cancellation_policies?.map(
          (c) => {
            const parsedDuration = JSON.parse(c.duration);
            return {
              duration: parsedDuration,
              refund_percentage: c.refund_percentage,
            };
          }
        );
        setCancellationData(cancellation);
      }

      setCountryId(propertyData?.data.area.district.division.country.id);
      setDivisionId(propertyData?.data.area.district.division.id);
      setDistrictId(propertyData?.data.area.district.id);
      setAreaId(propertyData?.data.area.id);

      setSelectedLocation(mapCenter);
      setProperty(propertyData?.data);
    }
  }, [
    propertyData?.data,
    property?.check_in_time,
    property?.check_in_time_period,
    property?.check_out_time,
    property?.check_out_time_period,
    mapCenter,
  ]);

  useEffect(() => {
    // Fetch data only if Id is not null
    if (countryId !== null) {
      refetchDivisions();
    }
  }, [countryId, refetchDivisions]);

  useEffect(() => {
    // Fetch data only if Id is not null
    if (divisionId !== null) {
      refetchDistricts();
    }
  }, [divisionId, refetchDistricts]);

  useEffect(() => {
    // Fetch data only if Id is not null
    if (districtId !== null) {
      refetchAreas();
    }
  }, [districtId, refetchAreas]);

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
      console.log("latLng", latLng);
      setMapCenter(latLng);
      setRectangleBounds(/* calculate your bounds if needed */);

      // Set the selected location
      setSelectedLocation(latLng);
      // setMapError(false);
      setMapError({
        status: false,
      }); // Reset map error if a valid location is selected
    } catch (error) {
      console.error("Error selecting address", error);
    }
  };

  const onRectangleLoad = (rectangle) => {
    // Access rectangle object here
    console.log("Rectangle Loaded:", rectangle);
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setCountryId(countryId);
    // refetchDivisions();
  };

  const handleDivisionChange = (e) => {
    const divisionId = e.target.value;
    setDivisionId(divisionId);
    // refetchDistricts();
  };

  const handleDistrictChange = (e) => {
    const distritId = e.target.value;
    setDistrictId(distritId);
    // refetchAreas();
  };

  const handleAreaChange = (e) => {
    const areaId = e.target.value;
    setAreaId(areaId);
    // refetchAreas();
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
      setLogoFile(null);
      setLogoError({
        status: true,
        message: "Image size can't be more than 100KB",
      });
      return;
    }

    if (fileInput?.files?.length > 0) {
      setLogoFile({
        name: fileInput?.files[0].name,
        url: URL.createObjectURL(fileInput?.files[0]),
        logoFile: fileInput.files[0],
      });
      setLogo(fileInput.files[0]);
      // setLogoError("");
      setLogoError(null);
    } else {
      setLogoFile(null);
      // setLogoError("Logo is required");
      setLogoError({
        status: true,
        message: "Logo is required",
      });
    }
  };

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
      // Update the 'images' array
      setImages(
        newImages
          .filter((image) => image !== null)
          .map((image) => image.displayImageFile)
      );
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

  const onSubmit = async () => {
    displayImages?.map((i) => {
      if (i === null) {
        displayImageCount++;
      }
    });

    if (!logoFile) {
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

    // if (!mapError.count) {
    //   console.log("Map error");
    //   setMapError({
    //     status: true,
    //     message: "Please select hotel location",
    //   });
    //   return;
    // }

    const displayImageFiles = displayImages?.map(
      (image) => image.displayImageFile
    );

    const propertyTypesId = property?.property_types?.map((type) => type.id);
    const paymentMethodsId = property?.payment_methods?.map(
      (method) => method.id
    );
    console.log("paymentMethodsId", paymentMethodsId);
    const amenitiesId = property.amenities.map((amenity) => amenity.id);
    console.log("amenitiesId", amenitiesId);

    const propertyEditData = {
      id: property.id,
      name: property.name,
      bin: property.bin,
      tin: property.tin,
      trade_license_number: "123456",
      area_id: areaId,
      address: property.address,
      description: property.description,
      hotel_class: property.hotel_class,
      property_types: propertyTypesId,
      amenities: amenitiesId,
      images: images,
      check_in_time: `${check_in_time.hour}:${check_in_time.min}`,
      check_in_time_period: check_in_time.check_in_time_period,
      check_out_time: `${check_out_time.hour}:${check_out_time.min}`,
      check_out_time_period: check_out_time.check_out_time_period,
      latitude: parseFloat(mapCenter.lat),
      longitude: parseFloat(mapCenter.lng),
      cancellation: cancellationData,
      logo: logo,
      short_description: property.short_description,
      instruction: property.instruction,
      payment_methods: paymentMethodsId,
      pet_policy: property.pet_policy,
      is_active:property.is_active,
    };

    console.log("propertyData", propertyData?.data);
    console.log("propertyEditData", propertyEditData);

    const propertyEditFormData = new FormData();

    Object.entries(propertyEditData).forEach(([key, value]) => {
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
            propertyEditFormData.append(`${key}[${index}]`, item);
          });
        } else if (key === "cancellation") {
          // Handle cancellation data
          value.forEach((cancelData, index) => {
            // Append duration object with hours and minutes
            propertyEditFormData.append(
              `cancellation_policies[${index}][duration]`,
              `{"hour":${cancelData.duration.hour},"min":${cancelData.duration.min}}`
            );

            // Append other cancellation properties
            Object.entries(cancelData).forEach(([cancelKey, cancelValue]) => {
              if (cancelKey !== "duration") {
                propertyEditFormData.append(
                  `cancellation_policies[${index}][${cancelKey}]`,
                  cancelValue
                );
              }
            });
          });
        } else {
          propertyEditFormData.append(key, value);
        }
      }
    });

    propertyEditFormData.append("latitude", parseFloat(mapCenter.lat));
    propertyEditFormData.append("longitude", parseFloat(mapCenter.lng));

    // Append image files to FormData
    if (Array.isArray(propertyData.images)) {
      propertyEditData.images.forEach((imageFile, index) => {
        if (imageFile != null) {
          propertyEditFormData.append(`images[${index}][image]`, imageFile);
        }
      });
    }

    // Append logo file to FormData
    if (propertyEditData.logo) {
      propertyEditFormData.append("logo", propertyData.logo);
    }

    propertyEditFormData.append("_method", "PUT");

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(propertyEditFormData));

    const updatePropertyInfo = {
      id: property.id,
      formData: propertyEditFormData,
    };

    try {
      const result = await updateProperty(updatePropertyInfo);
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("updatePropertyInfo", result);
        toast.success("Property updated successfully");
        navigate(`/dashboard/property/${property.id}/edit`);
        // reset();
      } else {
        console.log("Failed", result?.error?.data?.errors);
        // setValidationErrors(result?.error?.data?.errors);
        // console.log("Failed", result);
      }
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
      // setValidationErrors(err.response.data.errors);
    }
  };
  return (
    <div className="p-[12px] md:p-[24px] lg:p-[24px]">
      <div className=" ">
        <form
          className="property-add-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="property-add-title">Edit Property</h2>
          {/* General info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
            {/* Property Name */}
            <div className="">
              <label className="property-input-title" htmlFor="name">
                Property Name
              </label>
              <input
                className="input-box"
                id="name"
                name="name"
                type="text"
                placeholder="Sea View"
                value={property?.name}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    name: e.target.value,
                  })
                }
              />
              <label className=""></label>
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
                value={property?.subtitle}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    subtitle: e.target.value,
                  })
                }
              />
              <label className=""></label>
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
                value={property?.bin}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    bin: e.target.value,
                  })
                }
              />
              <label className=""></label>
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
                value={property?.tin}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    tin: e.target.value,
                  })
                }
              />
              <label className=""></label>
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
                  onChange={(e) => handleCountryChange(e)}
                  // defaultValue={
                  //   propertyAdding?.data?.countries?.length > 0
                  //     ? propertyAdding.data.countries[0].id
                  //     : ""
                  // }
                  value={countryId || ""}
                  disabled={propertyAdding?.data?.countries?.length <= 0}
                >
                  <option value={0}>Select Country</option>
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
                  onChange={(e) => handleDivisionChange(e)}
                  value={divisionId || ""}
                  disabled={divisionData?.data?.length <= 0}
                >
                  <option value={0}>Select Division</option>
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
                  onChange={(e) => handleDistrictChange(e)}
                  disabled={districtData?.data?.length <= 0}
                  value={districtId || ""}
                >
                  <option value={0}>Select District</option>
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
                  disabled={!areaData || areaData.data.length === 0}
                  value={propertyData?.data.area.id || ""}
                  onChange={(e) => handleAreaChange(e)}
                >
                  <option value={0}>Select Area</option>
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
              value={property?.address}
              onChange={(e) =>
                setProperty({
                  ...property,
                  address: e.target.value,
                })
              }
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
              placeholder="ChutyRooms is a trusted, largest, and fastest-growing hospitality partner in Bangladesh. Investing in technology takes the country to a higher status of travel."
              value={property?.description}
              onChange={(e) =>
                setProperty({
                  ...property,
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
                  className="flex items-center gap-1.5"
                  onClick={(e) => {
                    field.onChange(e.target.value),
                      setProperty({
                        ...property,
                        hotel_class: e.target.value,
                      });
                  }}
                >
                  <Rating
                    name="half-rating"
                    precision={0.5}
                    value={parseFloat(property?.hotel_class)}
                  />
                  {property?.hotel_class && (
                    <p>
                      {"("}
                      {property?.hotel_class}
                      {")"}
                    </p>
                  )}
                </div>
              )}
              // rules={{
              //   validate: (value) => {
              //     if (value < 1 || value > 5) {
              //       return "Rating must be between 1 and 5";
              //     }
              //     return true;
              //   },
              // }}
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
                  // rules={{ required: "Please select at least one checkbox." }}
                  render={({ field }) => (
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
                              checked={property?.property_types.some(
                                (pt) => pt.id === propertyType.id
                              )}
                              {...field}
                              // onChange={(e) => {
                              //   field.onChange(e);
                              //   setValue(
                              //     "propertyTypes",
                              //     e.target.checked
                              //       ? [...field.value, propertyType.id]
                              //       : field.value.filter(
                              //           (type) => type !== propertyType.id
                              //         )
                              //   );
                              // }}
                              onChange={(e) => {
                                // Logic to update property types
                                const isChecked = e.target.checked;
                                const typeId = propertyType.id;
                                const updatedPropertyTypes = isChecked
                                  ? [...property.property_types, propertyType]
                                  : property.property_types.filter(
                                      (pt) => pt.id !== typeId
                                    );
                                // Update state with the updated property types
                                setProperty((prevState) => ({
                                  ...prevState,
                                  property_types: updatedPropertyTypes,
                                }));
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
            </div>
            {errors.propertyTypes && !selectedPropertyTypes?.length && (
              <span className="label-text-alt text-red-500">
                Please select at least one type
              </span>
            )}
          </div>
          {/* Amenities */}
          <div className="mt-[18px] text-[14px]">
            <h2
              className="text-[16px] font-semibold mb-[15px]"
              htmlFor="address"
            >
              Amenities
            </h2>

            {propertyAdding?.data.amenitiesCategory?.map((category) => (
              <div key={category.id} className="mb-[15px]">
                <h2 className="property-input-title" htmlFor="address">
                  {category?.name}
                </h2>
                <div className="flex items-center gap-x-[8px] md:gap-x-[12px] lg:gap-x-[12px]">
                  {category?.amenities?.map((amenity) => (
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
                              checked={property?.amenities.some(
                                (am) => am.id === amenity.id
                              )}
                              {...field}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const typeId = amenity.id;
                                const updatedAmenities = isChecked
                                  ? [...property.amenities, amenity]
                                  : property.amenities.filter(
                                      (am) => am.id !== typeId
                                    );
                                // Update state with the updated property types
                                setProperty((prevState) => ({
                                  ...prevState,
                                  amenities: updatedAmenities,
                                }));
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
          {/* Image */}
          <div className="mt-[18px] ">
            <div className="property-images-container">
              {/* Logo */}
              <div>
                <h2 className="mb-[12px]">Logo</h2>
                <div className=" ">
                  <label htmlFor="logo" className="input-label">
                    <div className="w-full h-[148px]  flex justify-center items-center rounded-[8px] bg-[#F2F5F6] border-[1px] border-[#E6E7E6] mt-[0px]">
                      <div className="">
                        {/* {logo ? ( */}
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
                              Browse Photo
                            </p>
                            <img
                              src={logoFile?.url}
                              // src={logo?.url}
                              alt="Selected File"
                              // className="w-8 mr-1"
                              className=" w-full h-[110px] mt-[-30px] "
                            />
                          </div>
                        </>
                        {/* // ) : (
                        //   <>
                        //     <div className="flex justify-center mb-[8px]">
                        //       <img className="w-[20px]" src={imgIcon} alt="" />
                        //     </div>
                        //     <p className="property-input-title text-center">
                        //       Browse Photo
                        //     </p>
                        //   </>
                        // )} */}
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
              </div>

              {/* Display Image */}
              <div>
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
                                      className="w-8 mr-1"
                                    />
                                  </div>
                                  <span className="text-[12px] block text-center">
                                    {image?.name?.length > 16
                                      ? image?.name?.slice(0, 15) + "..."
                                      : image?.name}
                                  </span>
                                </div>
                                <p className="property-input-title text-center">
                                  Browse Photo
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
                    </div>
                  ))}
                </div>
                {displayImageError?.status === true && (
                  <p className="label-text-alt text-red-500 mt-[4px]">
                    {displayImageError.message}
                  </p>
                )}
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
                        <p className="property-input-title text-center">
                          Upload
                        </p>
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
            {/* Check In */}
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
                    className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6]"
                    type="number"
                    name="checkin_hour"
                    id="checkin_hour"
                    placeholder="Hour"
                    value={check_in_time.hour}
                    onChange={(e) =>
                      setCheck_in_time({
                        ...check_in_time,
                        hour: e.target.value,
                      })
                    }
                    // {...register("checkin_hour", {
                    //   required: {
                    //     value: true,
                    //     message: "Check in time is required",
                    //   },
                    //   min: {
                    //     value: 1,
                    //     message: "Hour should be between 1 and 12",
                    //   },
                    //   max: {
                    //     value: 12,
                    //     message: "Hour should be between 1 and 12",
                    //   },
                    // })}
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
                    className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6]"
                    type="number"
                    name="checkin_minute"
                    id="checkin_minute"
                    placeholder="Minute"
                    value={check_in_time.min}
                    onChange={(e) =>
                      setCheck_in_time({
                        ...check_in_time,
                        min: e.target.value,
                      })
                    }
                    // {...register("checkin_minute", {
                    //   required: {
                    //     value: true,
                    //     message: "Check in time is required",
                    //   },
                    //   min: {
                    //     value: 0,
                    //     message: "Minute should be between 0 and 59",
                    //   },
                    //   max: {
                    //     value: 59,
                    //     message: "Minute should be between 0 and 59",
                    //   },
                    // })}
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
                    className="flex items-center justify-center w-full h-full rounded-[4px] px-[4px]"
                    id="check_in_time_period"
                    name="check_in_time_period"
                    // {...register("checkout_time_period")}
                    value={check_in_time.check_in_time_period}
                    onChange={(e) =>
                      setCheck_in_time({
                        ...check_in_time,
                        check_in_time_period: e.target.value,
                      })
                    }
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
            {/* Check Out */}
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
                    className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6]"
                    type="number"
                    name="checkout_hour"
                    id="checkout_hour"
                    placeholder="Hour"
                    value={check_out_time.hour}
                    onChange={(e) =>
                      setCheck_out_time({
                        ...check_out_time,
                        hour: e.target.value,
                      })
                    }
                    // {...register("checkout_hour", {
                    //   required: {
                    //     value: true,
                    //     message: "Check out time is required",
                    //   },
                    //   min: {
                    //     value: 1,
                    //     message: "Hour should be between 1 and 12",
                    //   },
                    //   max: {
                    //     value: 12,
                    //     message: "Hour should be between 1 and 12",
                    //   },
                    // })}
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
                    className="rounded-[4px] h-[36px] w-full p-[8px] border-[1px] border-[#E6E7E6]"
                    type="number"
                    name="checkout_minute"
                    id="checkout_minute"
                    placeholder="Minute"
                    value={check_out_time.min}
                    onChange={(e) =>
                      setCheck_out_time({
                        ...check_out_time,
                        min: e.target.value,
                      })
                    }
                    // {...register("checkout_minute", {
                    //   required: {
                    //     value: true,
                    //     message: "Check in time is required",
                    //   },
                    //   min: {
                    //     value: 0,
                    //     message: "Minute should be between 0 and 59",
                    //   },
                    //   max: {
                    //     value: 59,
                    //     message: "Minute should be between 0 and 59",
                    //   },
                    // })}
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
                    className="flex items-center justify-center w-full h-full rounded-[4px] px-[4px]"
                    id="checkout_time_period"
                    name="checkout_time_period"
                    // {...register("checkout_time_period")}
                    value={check_out_time.check_out_time_period}
                    onChange={(e) =>
                      setCheck_out_time({
                        ...check_out_time,
                        check_out_time_period: e.target.value,
                      })
                    }
                    // onChange={(e) => setCheck_out_time_period(e.target.value)}
                  >
                    <option value="AM">AM</option>
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
            <CancellationPolicyEdit
              cancellationData={cancellationData}
              setCancellationData={setCancellationData}
            ></CancellationPolicyEdit>
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
              value={property?.short_description}
              onChange={(e) =>
                setProperty({
                  ...property,
                  short_description: e.target.value,
                })
              }
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
              className="input-box"
              name="instruction"
              id="instruction"
              placeholder=""
              value={property?.instruction}
              onChange={(e) =>
                setProperty({
                  ...property,
                  instruction: e.target.value,
                })
              }
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
              value={property?.pet_policy}
              onChange={(e) =>
                setProperty({
                  ...property,
                  pet_policy: e.target.value,
                })
              }
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
          <div className="mt-[18px]">
            <h2 id="property-type-title" className="text-[14px]">
              Payment Method
            </h2>

            <div className="text-[14px] flex items-center gap-x-[10px] md:gap-x-[12px] lg:gap-x-[12px]">
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <Controller
                  name="paymentMethods"
                  control={control}
                  defaultValue={[]}
                  // rules={{ required: "Please select at least one checkbox." }}
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
                              id={`payment-method${paymentMethod.id}`}
                              checked={property?.payment_methods.some(
                                (pm) => pm.id === paymentMethod.id
                              )}
                              {...field}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const paymentId = paymentMethod.id;
                                const updatedPaymentMethods = isChecked
                                  ? [...property.payment_methods, paymentMethod]
                                  : property.payment_methods.filter(
                                      (pm) => pm.id !== paymentId
                                    );
                                setProperty((prevState) => ({
                                  ...prevState,
                                  payment_methods: updatedPaymentMethods,
                                }));
                              }}
                              // onChange={(e) => {
                              //   field.onChange(e);
                              //   setValue(
                              //     "paymentMethods",
                              //     e.target.checked
                              //       ? [...field.value, paymentMethod.id]
                              //       : field.value.filter(
                              //           (type) => type.id !== paymentMethod.id
                              //         )
                              //   );
                              // }}
                            />
                            {/* <label htmlFor={`hotel-type${paymentMethod.id}`}>
                          {paymentMethod.name}
                        </label> */}
                            <img
                              className="w-14 "
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
            {/* {errors.propertyTypes && !selectedPropertyTypes?.length && (
              <span className="label-text-alt text-red-500">
                Please select at least one type
              </span>
            )} */}
          </div>
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
                  checked={property?.is_active}
                  onChange={(e) =>
                    setProperty({
                      ...property,
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
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      is_active: e.target.value,
                    })
                  }
                  
                />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
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
                        {suggestions?.map((suggestion, index) => {
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
                  <Rectangle
                    bounds={rectangleBounds}
                    onLoad={onRectangleLoad}
                  />
                )}
                {/* <Marker position={center} /> */}
                <Marker position={mapCenter} />
                {/* Additional marker at the search location */}
                {selectedLocation && (
                  <Marker
                    position={selectedLocation}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                )}
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
          {/* 
            {allInputError.status && (
              <p className="label-text-alt text-red-500 text-right mb-[6px]">
                {allInputError.message}
              </p>
            )} */}
          <div className=" flex justify-end gap-x-[12px]">
            <button className="w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px]">
              Cancel
            </button>
            <button
              // onClick={(e) => handleSave(e)}
              type="submit"
              // disabled={!rectangleBounds}
              className="w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerPropertyEdit;
