import starFill from "../../../assets/icons/star-fill.svg";
import starBlank from "../../../assets/icons/star-blank.svg";
import delteIcon from "../../../assets/icons/delete.svg";
import imgIcon from "../../../assets/icons/img.svg";
import videoIcon from "../../../assets/icons/frame.svg";
import arrowDownIcon from "../../../assets/icons/arrow-down.svg";

import "./PropertyAdd.css";
import { useState } from "react";
import EditableRow from "./CancellationPolicy/CancellationPolicy";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "230px",
  borderRadius: "8px",
};
const center = {
  lat: 23.862725477930507, // default latitude ,
  lng: 90.40080333547479, // default longitude
};

const PropertyAdd = () => {
  const [logo, setLogo] = useState(null);
  const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [video, setVideo] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY",
    libraries,
  });

  if (loadError) {
    return <div className="text-center py-[60px]">Error loading maps!</div>;
  }

  if (!isLoaded) {
    return <div className="text-center py-[60px]">Loading maps...</div>;
  }

  // console.log(policies);

  const handleLogoSelect = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      setLogo({
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
        logoFile: fileInput.files[0],
      });
    } else {
      setLogo(null);
    }
  };

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

  const handleVideoSelect = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      setVideo({
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
      });
    } else {
      setVideo(null);
    }
  };

  const handleVideoDelete = () => {
    setVideo(null);
  };

  return (
    <div className="custom-container ">
      <div className="property-add-container">
        <h2 className="property-add-title">Property Adding</h2>

        <form className="mt-[20px] text-[14px]" action="">
          {/* General info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px]">
            <div className="">
              <label className="property-input-title" htmlFor="property-name">
                Property Name
              </label>
              <input
                className="input-box"
                id="property-name"
                name="property-name"
                type="text"
                placeholder="Sea View"
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="bin">
                Bin
              </label>
              <input className="input-box" id="bin" name="bin" type="text" />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="tin">
                Tin
              </label>
              <input className="input-box" id="tin" name="tin" type="text" />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="country">
                Country
              </label>
              <div className="property-input-div">
                <select id="country" className=" property-input" name="country">
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                </select>
                <img
                  // className="absolute top-[14px] right-[12px] arrow-icon"
                  className="arrow-icon"
                  src={arrowDownIcon}
                  alt=""
                />
              </div>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="">
                Division
              </label>
              <div className="property-input-div">
                <select className="property-input" name="" id="">
                  <option value="Chittagong">Chittagong</option>
                  <option value="Dhaka">Dhaka</option>
                </select>
                <img className="arrow-icon" src={arrowDownIcon} alt="" />
              </div>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="">
                State/District
              </label>
              <div className="property-input-div">
                <select className="property-input" name="" id="">
                  <option value="Chittagong">Chittagong</option>
                  <option value="Cox's Bazar">Cox{`'`}s Bazar</option>
                </select>
                <img className="arrow-icon" src={arrowDownIcon} alt="" />
              </div>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="">
                Area
              </label>
              <div className="property-input-div">
                <select className="property-input" name="" id="">
                  <option value="GEC">GEC</option>
                  <option value="Cox's Bazar">Muradpur</option>
                </select>
                <img className="arrow-icon" src={arrowDownIcon} alt="" />
              </div>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="address">
                Address
              </label>
              <input
                className="input-box"
                id="address"
                name="address"
                type="text"
              />
            </div>
          </div>
          <div className="mt-[18px]">
            <label className="property-input-title" htmlFor="description">
              Description
            </label>
            <textarea
              className="property-description block input-box h-[120px]"
              name="description"
              id="description"
              placeholder="ChutyRooms is a trusted, largest, and fastest-growing hospitality partner in Bangladesh. Investing in technology takes the country to a higher status of travel."
            ></textarea>
          </div>
          <div className="mt-[18px]">
            <label className="property-input-title" htmlFor="address">
              Property Rating
            </label>
            <div className="flex gap-x-[4px] mt-[12px]">
              <img className="w-[20px]" src={starFill} alt="" />
              <img className="w-[20px]" src={starFill} alt="" />
              <img className="w-[20px]" src={starFill} alt="" />
              <img className="w-[20px]" src={starBlank} alt="" />
              <img className="w-[20px]" src={starBlank} alt="" />
            </div>
          </div>
          <div className="mt-[18px]">
            <h2 className="property-input-title" htmlFor="address">
              Property Type
            </h2>

            <div className="flex items-center gap-x-[10px] md:gap-x-[12px] lg:gap-x-[12px]">
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <input type="checkbox" name="hotel-type1" id="hotel-type1" />
                <label htmlFor="hotel-type1"> Hotel</label>
              </div>
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <input type="checkbox" name="hotel-type2" id="hotel-type2" />
                <label htmlFor="hotel-type2"> Resort</label>
              </div>
              <div className="flex gap-x-[4px] md:gap-x-[8px] lg:gap-x-[8px]">
                <input type="checkbox" name="hotel-type3" id="hotel-type3" />
                <label htmlFor="hotel-type3"> Cottage</label>
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div className="mt-[18px]">
            <h2
              className="text-[16px] font-semibold mb-[15px]"
              htmlFor="address"
            >
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
          </div>
          {/* Image */}
          <div className="mt-[18px] ">
            {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-[18px]"> */}
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
                    <div className="w-full h-[148px] p-[55px] flex justify-center items-center rounded-[8px] bg-[#F2F5F6] border-[1px] border-[#E6E7E6] mt-[12px]">
                      <div className="">
                        {logo ? (
                          <>
                            <div className="grid justify-center ">
                              <div className="flex items-center mb-[8px] md:block md:justify-center">
                                <div className="flex md:justify-center">
                                  <img
                                    // src={URL.createObjectURL(logoImage)}
                                    src={logo.url}
                                    alt="Selected File"
                                    className="w-8 mr-1"
                                  />
                                </div>
                                <span className="">{logo.name}</span>
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
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    // accept="image/*"
                    onChange={handleLogoSelect}
                    style={{ display: "none" }}
                  />
                </div>
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
                            // </label>
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
                      />
                    </div>
                  ))}
                </div>

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

                {/* <div className="relative mt-[22px]">
              
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
                              <img className="w-[20px]" src={imgIcon} alt="" />
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

                <div className="relative mt-[22px]">
              
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
                              <img className="w-[20px]" src={imgIcon} alt="" />
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

                <div className="relative mt-[22px]">
               
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
                              <img className="w-[20px]" src={imgIcon} alt="" />
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
                </div> */}
              </div>
            </div>
          </div>
          {/* Video */}
          <div className="mt-[18px] ">
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
                    {video ? (
                      <>
                        <div className="grid justify-center ">
                          <div className="flex mb-[8px] items-center">
                            <img
                              src={video.url}
                              alt="Selected File"
                              className="w-10 mr-1"
                            />
                            <span className="">{video.name}</span>
                          </div>
                        </div>
                      </>
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
              </label>
              <input
                type="file"
                id="video"
                accept="image/*"
                onChange={handleVideoSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* Checkin */}
          <div className="mt-[18px]">
            <p className="mb-[12px]">
              Check In <span className="ml-[26px] mr-[12px]">:</span>{" "}
              <input
                className="rounded-[8px] h-[36px] w-[60px] p-[8px] border-[1px] border-[#E6E7E6]"
                type="number"
                name=""
                id=""
              />
              <span className="text-[14px] md:text-[16px] lg:text-[16px] inline-block ml-[4px]">
                AM
              </span>
            </p>
            <p>
              Check Out <span className="ml-[12px] mr-[12px]">:</span>{" "}
              <input
                className="rounded-[8px] h-[36px] w-[60px] p-[8px] border-[1px] border-[#E6E7E6]"
                type="number"
                name=""
                id=""
              />
              <span className="text-[14px] md:text-[16px] lg:text-[16px] inline-block ml-[4px]">
                AM
              </span>
            </p>
          </div>
          {/* Cancellation Policy */}
          <div className="mt-[18px]">
            <EditableRow></EditableRow>
          </div>
          {/* Short Description */}
          <div className="mt-[18px]">
            <label className="property-input-title" htmlFor="short-description">
              Short Description
            </label>
            <textarea
              className="property-description block input-box h-[120px]"
              name="short-description"
              id="short-description"
              placeholder=""
            ></textarea>
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
            ></textarea>
          </div>
          {/* Payment Method */}
          <div className="mt-[18px]">
            <label className="property-input-title" htmlFor="payment-method">
              Payment Method
            </label>
            <textarea
              className="input-box "
              name="payment-method"
              id="payment-method"
              placeholder=""
            ></textarea>
          </div>
          {/* google map */}
          <div className="mt-[18px]">
            <h2 className="property-input-title">Locate Your Property</h2>

            <div className="">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
              >
                <Marker position={center} />
              </GoogleMap>
            </div>

            <div className="mt-[20px] flex justify-end gap-x-[12px]">
              <button className="w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px]">
                Cancel
              </button>
              <button className="w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyAdd;
