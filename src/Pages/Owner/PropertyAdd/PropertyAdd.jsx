// import starFill from "../../../assets/icons/star-fill.svg";
// import starBlank from "../../../assets/icons/star-blank.svg";
import delteIcon from "../../../assets/icons/delete.svg";
import imgIcon from "../../../assets/icons/img.svg";
import videoIcon from "../../../assets/icons/frame.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";
import searchIcon from "../../../assets/icons/search-normal.svg";
import Rating from "@mui/material/Rating";
// import Stack from "@mui/material/Stack";
import "./PropertyAdd.css";
import { useState } from "react";
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

  const [cancellationData, setCancellationData] = useState([
    { duration: { hours: 47, minutes: 59 }, refundPercentage: 100 },
    { duration: { hours: 23, minutes: 59 }, refundPercentage: 50 },
  ]);

  const [center, setCenter] = useState({
    lat: 23.862725477930507,
    lng: 90.40080333547479,
  });
  const [mapCenter, setMapCenter] = useState(center);
  const [mapError, setMapError] = useState(false);
  const [address, setAddress] = useState("");
  const [rectangleBounds, setRectangleBounds] = useState(null);

  const [logo, setLogo] = useState(null);
  // const [logoError, setLogoError] = useState("");
  const [logoError, setLogoError] = useState(null);
  const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [displayImageError, setDisplayImageError] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoError, setVideoError] = useState(true);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedPropertyTypes = useWatch({
    control,
    name: "propertyTypes",
    defaultValue: [], // Provide a default value if needed
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY",
    libraries,
  });

  const [loading, setLoading] = useState(false);

  // const createPropertyMutation = useMutation((propertyData) => {
  //   return fetch("http://127.0.0.1:8000/api/user/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(propertyData),
  //   }).then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Registration failed");
  //     }
  //     return response.json();
  //   });
  // });

  let displayImageCount = 0;

  const handleMapClick = (e) => {
    const { latLng } = e;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setCenter({ lat: latitude, lng: longitude });
    setMapError(false);
  };

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setMapCenter(latLng);
      setRectangleBounds(/* calculate your bounds if needed */);

      // Optionally, you can update rectangleBounds or perform other actions based on the selected location
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

  if (!isLoaded || loading) {
    return <Loading></Loading>;
  }

  const handleLogoSelect = (event) => {
    const fileInput = event.target;

    if (fileInput.files[0].size > 100 * 1024) {
      setLogo(null);
      setLogoError({
        status: true,
        message: "Image size can't be more than 100KB",
      });
      return;
    }

    if (fileInput.files.length > 0) {
      setLogo({
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
        logoFile: fileInput.files[0],
      });
      // setLogoError("");
      setLogoError(null);
    } else {
      setLogo(null);
      // setLogoError("Logo is required");
      setLogoError({
        status: true,
        message: "Logo is required",
      });
    }
  };

  // console.log(displayImages)

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
    } else {
      const newImages = [...displayImages];
      newImages[index] = null;
      setDisplayImages(newImages);

      displayImages.map((i) => {
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

  const handleVideoSelect = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      setVideo({
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
      });
    } else {
      setVideo(null);
      setVideoError(true);
    }
  };

  const handleVideoDelete = () => {
    setVideo(null);
    setVideoError(false);
  };

  const onSubmit = (data) => {
    displayImages.map((i) => {
      if (i === null) {
        displayImageCount++;
      }
    });

    if (!logo) {
      // setLogoError("Logo is required");
      setLogoError({
        status: true,
        message: "Logo is required",
      });
      return;
    }

    if (displayImageCount) {
      setDisplayImageError({
        status: true,
        message: "Please select all four display images.",
      });
      return;
    }

    if (
      center.lat == 23.862725477930507 &&
      center.lng == 90.40080333547479 &&
      mapError === false
    ) {
      return setMapError(true);
    }

    setLoading(true);

    // console.log(center);

    const propertyData = {
      data,
      map: center,
      cancellation: cancellationData,
      logo,
      displayImages,
      video,
    };

    console.log(propertyData);
    // createPropertyMutation.mutate(propertyData);
    setLoading(false);
    navigate("/room-add");
  };

  //   const handleSave = (e)=>{
  // e.preventDefault()
  //     navigate("/room-add")
  //   }

  return (
    <div className="custom-container ">
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
                {...register("country", {
                  required: {
                    value: true,
                    message: "Please select a country",
                  },
                })}
              >
                <option value="">Select Country</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
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
                name=""
                id=""
                {...register("division", {
                  required: {
                    value: true,
                    message: "Please select a division",
                  },
                })}
              >
                <option value="">Select Division</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Dhaka">Dhaka</option>
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
                {...register("district", {
                  required: {
                    value: true,
                    message: "Please select a district",
                  },
                })}
              >
                <option value="">Select District</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Cox's Bazar">Cox{`'`}s Bazar</option>
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
                {...register("area", {
                  required: {
                    value: true,
                    message: "Please select an area",
                  },
                })}
              >
                <option value="">Select Area</option>
                <option value="GEC">GEC</option>
                <option value="Cox's Bazar">Muradpur</option>
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
          {/* Address */}
          <div className="">
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
        </div>
        {/* Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="description">
            Description
          </label>
          <textarea
            className="property-description block input-box h-[120px]"
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
        {/* Property Rating */}
        <div className="mt-[18px]">
          <label className="property-input-title block" htmlFor="address">
            Property Rating
          </label>
          {/* <div className="flex gap-x-[4px] mt-[12px]">
            <img className="w-[20px]" src={starFill} alt="" />
            <img className="w-[20px]" src={starFill} alt="" />
            <img className="w-[20px]" src={starFill} alt="" />
            <img className="w-[20px]" src={starBlank} alt="" />
            <img className="w-[20px]" src={starBlank} alt="" />
            <Controller
              name="rating"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <img
                      key={index}
                      className="w-[20px]"
                      src={index <= field.value ? starFill : starBlank}
                      alt=""
                      onClick={() => field.onChange(index)}
                    />
                  ))}
                </>
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
          </div> */}
          {/* <Stack spacing={1} className="mt-[1px]">
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              disabled={false}
              className="w-[130px] "
            />
          </Stack> */}

          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <div onClick={(e) => field.onChange(e.target.value)}>
                <Rating
                  name="half-rating"
                  precision={0.5}
                  value={parseFloat(field.value)}
                />
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
                  </div>
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
        <div className="mt-[18px]">
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
        </div>
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
                  <div className="w-full h-[148px]  flex justify-center items-center rounded-[8px] bg-[#F2F5F6] border-[1px] border-[#E6E7E6] mt-[12px]">
                    <div className="">
                      {logo ? (
                        <>
                          <div className="grid justify-center w-full">
                            <div className="flex items-center mb-[8px] md:block md:justify-center">
                              <div className="flex md:justify-center">
                                <img
                                  // src={URL.createObjectURL(logoImage)}
                                  src={logo.url}
                                  alt="Selected File"
                                  className="w-8 mr-1"
                                />
                              </div>
                              <span className="text-[12px] text-center block">
                                {logo.name.length > 16
                                  ? logo.name.slice(0, 15) + "..."
                                  : logo.name}
                              </span>
                            </div>
                            <p className="property-input-title text-center">
                              Browse Photo
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-center mb-[8px]">
                            <img className="w-[20px]" src={imgIcon} alt="" />
                          </div>
                          <p className="property-input-title text-center">
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
                              <div className="flex items-center mb-[8px] md:block md:justify-center">
                                <div className="flex md:justify-center">
                                  <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-8 mr-1"
                                  />
                                </div>
                                <span className="text-[12px] block text-center">
                                  {image.name.length > 16
                                    ? image.name.slice(0, 15) + "..."
                                    : image.name}
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
                <p className="label-text-alt text-red-500">
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
        <div className="mt-[18px]">
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
        </div>

        {/* Checkin */}
        <div className="mt-[18px]">
          <p className="mb-[12px]">
            Check In <span className="ml-[26px] mr-[12px]">:</span>{" "}
            <input
              className="rounded-[4px] h-[36px] w-[60px] p-[8px] border-[1px] border-[#E6E7E6]"
              type="number"
              name="checkin"
              id="checkin"
              {...register("checkin", {
                required: {
                  value: true,
                  message: "Check in time is required",
                },
              })}
            />
            <span className="text-[14px] md:text-[16px] lg:text-[16px] inline-block ml-[4px]">
              AM
            </span>
            <label className="block">
              {errors.checkin?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.checkin?.message}
                </span>
              )}
            </label>
          </p>
          <p>
            Check Out <span className="ml-[12px] mr-[12px]">:</span>{" "}
            <input
              className="rounded-[4px] h-[36px] w-[60px] p-[8px] border-[1px] border-[#E6E7E6]"
              type="number"
              name="checkout"
              id="checkout"
              {...register("checkout", {
                required: {
                  value: true,
                  message: "Check out time is required",
                },
              })}
            />
            <span className="text-[14px] md:text-[16px] lg:text-[16px] inline-block ml-[4px]">
              AM
            </span>
            <label className="block">
              {errors.checkout?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.checkout?.message}
                </span>
              )}
            </label>
          </p>
        </div>
        {/* Cancellation Policy */}
        <div className="mt-[18px]">
          <CancellationPolicy
            cancellationData={cancellationData}
            setCancellationData={setCancellationData}
          ></CancellationPolicy>
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
        {/* Payment Method */}
        <div className="mt-[18px]">
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
        </div>
        {/* google map */}
        <div className="mt-[18px]">
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
                  <div className="relative w-[300px] ">
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
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#159947"
                            : "#ffffff",
                          color: suggestion.active ? "white" : "black",
                        };
                        return (
                          <div
                            className="p-1"
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
              {address && (
                <Marker
                  clickable={true}
                  className="pointer-events-none"
                  position={mapCenter}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Customize the marker icon as needed
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              )}
            </GoogleMap>
            <label className="">
              {errors.map && (
                <span className="label-text-alt text-red-500">
                  {errors.map.message}
                </span>
              )}
            </label>
            {mapError && (
              <label className="">
                <span className="label-text-alt text-red-500">
                  Please select hotel location
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="mt-[20px] flex justify-end gap-x-[12px]">
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
  );
};

export default PropertyAdd;
