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
  MarkerF,
  Rectangle,
  useLoadScript,
} from "@react-google-maps/api";
import { Rating } from "@mui/material";
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
    refetch,
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
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mapCenter, setMapCenter] = useState({});
  const [mapError, setMapError] = useState({
    status: false,
    message: "",
    color: false,
    count: 0,
  });

  const [address, setAddress] = useState("");
  const [rectangleBounds, setRectangleBounds] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: propertyData?.data?.latitude,
    lng: propertyData?.data?.longitude,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY",
    libraries: ["places"],
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (propertyData) {
      setSelectedLocation({
        lat: propertyData.data.latitude,
        lng: propertyData.data.longitude,
      });
      setMapCenter({
        lat: propertyData.data.latitude,
        lng: propertyData.data.longitude,
      });
      setMapLoaded(true);
    }
  }, [propertyData]);

  const [allInputError, setAllInputError] = useState({
    status: false,
    message: "",
  });

  const [logo, setLogo] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [images, setImages] = useState([]);
  const [check_in_time, setCheck_in_time] = useState({});
  const [check_out_time, setCheck_out_time] = useState({});
  const [cancellationData, setCancellationData] = useState([]);
  const [logoError, setLogoError] = useState(null);
  const [displayImageError, setDisplayImageError] = useState(null);
  // const selectedPropertyTypes = useWatch({
  //   control,
  //   name: "propertyTypes",
  //   defaultValue: [],
  // });
  // const selectedPaymentMethods = useWatch({
  //   control,
  //   name: "paymentMethods",
  //   defaultValue: [],
  // });
  let displayImageCount = 0;

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
    is_active: null,
    view_order: null,
  });

  console.log(property);

  const [loading, setLoading] = useState(false);

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

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    refetch();

    if (propertyData?.data) {
      setLogoFile({
        name: "",
        url: `${BASE_ASSET_API}/storage/images/property/property_logo/${propertyData?.data?.logo}`,
        logoFile: null,
      });

      setDisplayImages(
        propertyData?.data?.images?.map((image) => ({
          id: image.id,
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

      setCountryId(propertyData?.data?.area?.district?.division?.country?.id);
      setDivisionId(propertyData?.data?.area?.district?.division?.id);
      setDistrictId(propertyData?.data?.area?.district?.id);
      setAreaId(propertyData?.data?.area?.id);

      // setSelectedLocation(mapCenter);
      setProperty(propertyData?.data);
    }
  }, [
    propertyData?.data,
    property?.check_in_time,
    property?.check_in_time_period,
    property?.check_out_time,
    property?.check_out_time_period,
    // mapCenter,
    refetch,
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
    setMapCenter({ lat: latitude, lng: longitude });
    setSelectedLocation({ lat: latitude, lng: longitude });
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

  if (!isLoaded || loading || propertyLoading || isLoading) {
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

  const handleDisplayImageSelect = (index, event, id) => {
    console.log("index", index);
    console.log("id", id);
    const fileInput = event.target;
    if (fileInput?.files?.length > 0) {
      const newImages = [...displayImages];
      newImages[index] = {
        id: id,
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
        displayImageFile: fileInput.files[0],
      };
      setDisplayImages(newImages);
      // Update the 'images' array
      const updatedImages = newImages.map((image) => ({
        id: image?.id, // Assuming you have the ID in the displayImages array
        file: image?.displayImageFile,
      }));

      setImages(updatedImages);
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

    const propertyTypesId = property?.property_types?.map((type) => type.id);
    const paymentMethodsId = property?.payment_methods?.map(
      (method) => method.id
    );
    const amenitiesId = property.amenities.map((amenity) => amenity.id);

    const propertyEditData = {
      id: property.id,
      name: property.name,
      subtitle: property.subtitle,
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
      is_active: property.is_active,
      // view_order: property.view_order,
    };

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
    if (Array.isArray(propertyEditData.images)) {
      propertyEditData.images.forEach((image) => {
        if (image && image.file) {
          propertyEditFormData.append(`images[${image.id}][image]`, image.file);
        }
      });
    }

    // Append logo file to FormData
    if (propertyEditData.logo) {
      propertyEditFormData.append("logo", propertyEditData.logo);
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
        navigate(`/dashboard/property-list`);
      } else {
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
              {validationErrors?.name && (
                <span className="label-text-alt text-red-500">
                  {validationErrors?.name}
                </span>
              )}
            </div>
            {/* Subtitle */}
            <div className="">
              <label className="property-input-title" htmlFor="subtitle">
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
              {validationErrors?.subtitle && (
                <span className="label-text-alt text-red-500">
                  {validationErrors?.subtitle}
                </span>
              )}
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
              {validationErrors?.bin && (
                <span className="label-text-alt text-red-500">
                  {validationErrors?.bin}
                </span>
              )}
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
              {validationErrors?.tin && (
                <span className="label-text-alt text-red-500">
                  {validationErrors?.tin}
                </span>
              )}
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
                  <option value="">Select Country</option>
                  {propertyAdding?.data?.countries?.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>

                <img
                  // className="absolute top-[14px] right-[12px] arrow-icon"
                  className="arrow-icon"
                  src={arrowDownIcon}
                  alt=""
                />

                {validationErrors?.country && (
                  <span className="label-text-alt text-red-500">
                    {validationErrors?.country}
                  </span>
                )}
              </div>
            </div>
            {/* Division */}
            <div className="">
              <label className="property-input-title block" htmlFor="division">
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
                  <option value="">Select Division</option>
                  {divisionData?.data?.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>

                <img className="arrow-icon" src={arrowDownIcon} alt="" />

                {validationErrors?.division && (
                  <span className="label-text-alt text-red-500">
                    {validationErrors?.division}
                  </span>
                )}
              </div>
            </div>
            {/* State/District */}
            <div className="">
              <label className="property-input-title block" htmlFor="district">
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
                  <option value="">Select District</option>
                  {districtData?.data?.map((district) => (
                    <option key={district?.id} value={district?.id}>
                      {district?.name}
                    </option>
                  ))}
                </select>

                <img
                  className="arrow-icon"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />

                {validationErrors?.district && (
                  <span className="label-text-alt text-red-500">
                    {validationErrors?.district}
                  </span>
                )}
              </div>
            </div>
            {/* Area */}
            <div className="">
              <label className="property-input-title block" htmlFor="area_id">
                Area
              </label>
              <div className="property-input-div">
                <select
                  className="property-input"
                  name="area_id"
                  id="area_id"
                  onChange={(e) => handleAreaChange(e)}
                  disabled={areaData?.data?.length <= 0}
                  value={areaId || ""}
                >
                  <option value="">Select Area</option>
                  {areaData?.data?.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>

                <img className="arrow-icon" src={arrowDownIcon} alt="" />

                {validationErrors?.area_id && (
                  <span className="label-text-alt text-red-500">
                    {validationErrors?.area_id}
                  </span>
                )}
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
            {validationErrors?.address && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.address}
              </span>
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
              value={property?.description}
              onChange={(e) =>
                setProperty({
                  ...property,
                  description: e.target.value,
                })
              }
            ></textarea>
            {validationErrors.description && (
              <span className="label-text-alt text-red-500">
                {validationErrors.description}
              </span>
            )}
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
              //     if (value < "1" || value > "5" || value == null) {
              //       return "Rating must be between 1 and 5";
              //     }
              //     return true;
              //   },
              // }}
            />
            {/* {errors?.rating && (
              <span className="label-text-alt text-red-500">
                {errors?.rating.message}
              </span>
            )} */}
            {validationErrors?.rating && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.rating}
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
                  name="property_types"
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
            {/* {errors.propertyTypes && !property?.property_types?.length && (
              <span className="label-text-alt text-red-500">
                Please select at least one type
              </span>
            )} */}
            {validationErrors?.property_types && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.property_types}
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
                        // rules={{
                        //   required: "Please select at least one checkbox.",
                        // }}
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
            {validationErrors?.amenities && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.amenities}
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
                            <p className="text-[12px] text-center absolute -bottom-6 left-4 z-10">
                              Update Photo
                            </p>
                            <img
                              src={logoFile?.url}
                              // src={logo?.url}
                              alt="Logo"
                              // className="w-8 mr-1"
                              className=" w-full h-[100px] mt-[-30px] "
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
            </div>
          </div>

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
            <label className="property-input-title" htmlFor="short_description">
              Short Description
            </label>
            <textarea
              className="property-description block input-box h-[120px]"
              name="short_description"
              id="short_description"
              placeholder=""
              value={property?.short_description}
              onChange={(e) =>
                setProperty({
                  ...property,
                  short_description: e.target.value,
                })
              }
            ></textarea>
            {validationErrors?.short_description && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.short_description}
              </span>
            )}
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
            {validationErrors?.instruction && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.instruction}
              </span>
            )}
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
            {validationErrors?.pet_policy && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.pet_policy}
              </span>
            )}
          </div>
          {/* Payment Method */}
          <div className="mt-[18px]">
            <h2 id="property-type-title" className="text-[14px]">
              Payment Method
            </h2>

            <div className="text-[14px] flex items-center gap-x-[10px] md:gap-x-[12px] lg:gap-x-[12px]">
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <Controller
                  name="payment_methods"
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
            {/* {errors?.paymentMethods && !selectedPaymentMethods?.length && (
              <span className="label-text-alt text-red-500">
                Please select at least one payment method
              </span>
            )} */}
            {validationErrors?.payment_methods && (
              <span className="label-text-alt text-red-500">
                {validationErrors?.payment_methods}
              </span>
            )}
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
                  checked={property?.is_active == 1}
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
                  checked={property?.is_active == 0}
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
              {propertyData && selectedLocation && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={selectedLocation}
                  onClick={handleMapClick}
                >
                  {mapLoaded && rectangleBounds && (
                    <Rectangle
                      bounds={rectangleBounds}
                      onLoad={onRectangleLoad}
                    />
                  )}

                  {/* Additional marker at the search location */}
                  {mapLoaded && selectedLocation && (
                    <MarkerF
                      position={
                        selectedLocation || {
                          lat: 22.347534723042624,
                          lng: 91.82298022754775,
                        }
                      }
                      icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        scaledSize: new window.google.maps.Size(30, 30),
                      }}
                    />
                  )}
                </GoogleMap>
              )}
              {/* Error messages */}
              <label className="">
                {mapError.status && (
                  <span
                    className={`label-text-alt ${
                      mapError.color ? "text-[#159947]" : "text-red-500"
                    }`}
                  >
                    {mapError.message}
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* View Order */}
          {/* <div className="mt-[18px] mb-[20px]">
            <label className="property-input-title" htmlFor="view_order">
              View Order
            </label>
            <input
              className="input-box"
              id="view_order"
              name="view_order"
              type="text"
              value={property?.view_order}
              onChange={(e) =>
                setProperty({
                  ...property,
                  view_order: e.target.value,
                })
              }
            />
            <label className=""></label>
          </div> */}

          {allInputError.status && (
            <p className="label-text-alt text-red-500 text-right mb-[6px]">
              {allInputError.message}
            </p>
          )}
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
