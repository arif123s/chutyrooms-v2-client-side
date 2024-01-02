import starFill from "../../../assets/icons/star-fill.svg";
import starBlank from "../../../assets/icons/star-blank.svg";
import delteIcon from "../../../assets/icons/delete.svg";
import imgIcon from "../../../assets/icons/img.svg";
import videoIcon from "../../../assets/icons/frame.svg";
import minusIcon from "../../../assets/icons/minus.svg";
import plusIcon from "../../../assets/icons/plus.svg";
import starIcon from "../../../assets/icons/star.svg";
import "./PropertyAdd.css";
import { useState } from "react";

const PropertyAdd = () => {
  const [logo, setLogo] = useState(null);
 const [displayImages, setDisplayImages] = useState([null, null, null, null]);
  const [video, setVideo] = useState(null);


  const handleLogoSelect = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      setLogo({
        name: fileInput.files[0].name,
        url: URL.createObjectURL(fileInput.files[0]),
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

     const handleVideoDelete =()=>{
      setVideo(null)
     }


  return (
    <div className="custom-container ">
      <div className="property-add-container">
        <h2 className="property-add-title">Property Adding</h2>

        <form className="mt-[24px] text-[14px]" action="">
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
              <select className="input-box" name="country" id="country">
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
              </select>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="">
                Division
              </label>
              <select className="input-box" name="" id="">
                <option value="Chittagong">Chittagong</option>
                <option value="Dhaka">Dhaka</option>
              </select>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="">
                State/District
              </label>
              <select className="input-box" name="" id="">
                <option value="Chittagong">Chittagong</option>
                <option value="Cox's Bazar">Cox{`'`}s Bazar</option>
              </select>
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="">
                Area
              </label>
              <select className="input-box" name="" id="">
                <option value="GEC">GEC</option>
                <option value="Cox's Bazar">Muradpur</option>
              </select>
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

            <div className="flex items-center gap-x-[12px]">
              <div className="flex gap-x-[8px]">
                <input type="checkbox" name="hotel-type1" id="hotel-type1" />
                <label htmlFor="hotel-type1"> Hotel</label>
              </div>
              <div className="flex gap-x-[8px]">
                <input type="checkbox" name="hotel-type2" id="hotel-type2" />
                <label htmlFor="hotel-type2"> Resort</label>
              </div>
              <div className="flex gap-x-[8px]">
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
              <div className="flex items-center gap-x-[12px]">
                <div className="flex gap-x-[8px]">
                  <input type="checkbox" name="hotel-type1" id="hotel-type1" />
                  <label className="text-[16px]" htmlFor="hotel-type1">
                    Near from sea beach
                  </label>
                </div>
                <div className="flex gap-x-[8px]">
                  <input type="checkbox" name="hotel-type2" id="hotel-type2" />
                  <label className="text-[16px]" htmlFor="hotel-type2">
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
                              <div className="flex items-center mb-[8px]">
                                <img
                                  // src={URL.createObjectURL(logoImage)}
                                  src={logo.url}
                                  alt="Selected File"
                                  className="w-8 mr-1"
                                />
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
                                <div className="flex items-center mb-[8px]">
                                  <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-8 mr-1"
                                  />
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
              <div onClick={handleVideoDelete} className="flex justify-end absolute top-[8px] right-[8px]">
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
              <span className="text-[16px] font-semibold">12 AM</span>
            </p>
            <p>
              Check Out <span className="ml-[12px] mr-[12px]">:</span>{" "}
              <span className="text-[16px] font-semibold">12 AM</span>
            </p>
          </div>

          {/* Cancellation Policy */}
          <div className="mt-[18px]">
            <h2 className="property-input-title">Cancellation Policy</h2>

            <div className="py-[10px] px-[14px] border-[1px] rounded-[8px] border-[#E6E7E6] md:flex lg:flex gap-x-[120px]">
              <div className="md:flex lg:flex gap-x-[24px] items-center">
                <div className="flex gap-x-[24px] items-center justify-between ">
                  <div>
                    <h2 className="property-input-title">Duration</h2>
                    <p className="flex gap-x-[15px] text-[16px] mb-[12px]">
                      <span>23 hours</span>
                      <span>45 minute</span>
                    </p>
                    <p className="flex gap-x-[15px] text-[16px]">
                      <span>23 hours</span>
                      <span>45 minute</span>
                    </p>
                  </div>

                  <div>
                    <h2 className="property-input-title">Refund</h2>
                    <div className="flex gap-x-[4px] mb-[12px]">
                      <img src={minusIcon} alt="" />
                      <p className="text-[16px]">
                        <span>10</span>%
                      </p>
                      <img src={plusIcon} alt="" />
                    </div>
                    <div className="flex gap-x-[4px]">
                      <img src={minusIcon} alt="" />
                      <p className="text-[16px]">
                        <span>10</span>%
                      </p>
                      <img src={plusIcon} alt="" />
                    </div>
                  </div>
                </div>

                <div className="text-[16px] mt-3 md:mt-3 lg:mt-3 flex justify-end md:justify-start lg:justify-start gap-x-2 md:block lg:block">
                  <button className="border-[1px] border-[#E6E7E6] px-[12px] py-[10px] rounded-[4px] w-[88px] h-[34px] flex items-center justify-center mb-[8px]">
                    Add
                  </button>
                  <button className="border-[1px] border-[#E6E7E6] px-[12px] py-[10px] rounded-[4px] w-[88px] h-[34px] flex items-center justify-center">
                    Remove
                  </button>
                </div>
              </div>

              <h2 className="flex justify-center lg:justify-start items-center text-[16px] text-[#159947] mt-3 lg:mt-0">
                <img className="w-[16px]" src={starIcon} alt="" />
                Lorem ipsum Lorem ipsum
              </h2>
            </div>
          </div>

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

          <div className="mt-[18px]">
            <label className="property-input-title" htmlFor="instruction">
              Instruction
            </label>
            <textarea
              className="property-description block input-box h-[120px]"
              name="instruction"
              id="instruction"
              placeholder=""
            ></textarea>
          </div>

          <div className="mt-[18px]">
            <label className="property-input-title" htmlFor="payment-method">
              Payment Method
            </label>
            <textarea
              className="property-description block input-box h-[120px]"
              name="payment-method"
              id="payment-method"
              placeholder=""
            ></textarea>
          </div>

          <div className="mt-[18px]">
            <h2 className="property-input-title">Locate Your Property</h2>

            <script
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY&libraries=geometry&callback=initMap&v=weekly&channel=2"
              defer
            ></script>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyAdd;
