import starFill from "../../../assets/icons/star-fill.svg";
import starBlank from "../../../assets/icons/star-blank.svg";
import delteIcon from "../../../assets/icons/delete.svg";
import imgIcon from "../../../assets/icons/img.svg";
import "./PropertyAdd.css";
import { useState } from "react";

const PropertyAdd = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="custom-container property-add-container">
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
          <label className="property-input-title" htmlFor="address">
            Description
          </label>
          <textarea
            className="property-description block input-box h-[96px]"
            name=""
            id=""
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
          <h2 className="text-[16px] font-semibold mb-[15px]" htmlFor="address">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-[18px]">
            {/* Logo */}

            <div>
              <h2 className="mb-[12px]">Logo</h2>
              <div className="relative mt-[12px]">
                <div className="flex justify-end absolute top-[8px] right-[8px]">
                  <img
                    className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                    src={delteIcon}
                    alt=""
                  />
                </div>
                <label htmlFor="fileInput" className="input-label">
                  <div className="w-full h-[148px] rounded-[8px] p-[8px] bg-[#F2F5F6] border-[1px] border-[#E6E7E6] mt-[12px]">
                    <div className="mt-[48px]">
                      {selectedFile ? (
                        <>
                          <div className="grid justify-center ">
                            <div className="flex items-center mb-[8px]">
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected File"
                                className="w-8 mr-1"
                              />
                              <span className="">{selectedFile.name}</span>
                            </div>
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
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Display Image */}

            <div>
              <h2 className="mb-[0px]">Display Image</h2>
              <div className="relative">
                <div className="flex justify-end absolute top-[8px] right-[8px]">
                  <img
                    className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                    src={delteIcon}
                    alt=""
                  />
                </div>
                <label htmlFor="fileInput" className="input-label">
                  <div className="w-full h-[148px] rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                    <div className="mt-[48px]">
                      {selectedFile ? (
                        <>
                          <div className="grid justify-center ">
                            <div className="flex items-center mb-[8px]">
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected File"
                                className="w-8 mr-1"
                              />
                              <span className="">{selectedFile.name}</span>
                            </div>
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
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="relative mt-[22px]">
              <div className="flex justify-end absolute top-[19px] right-[8px]">
                <img
                  className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                  src={delteIcon}
                  alt=""
                />
              </div>
              <label htmlFor="fileInput" className="input-label">
                <div className="w-full h-[148px] rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                  <div className="mt-[48px]">
                    {selectedFile ? (
                      <>
                        <div className="grid justify-center ">
                          <div className="flex items-center mb-[8px]">
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Selected File"
                              className="w-8 mr-1"
                            />
                            <span className="">{selectedFile.name}</span>
                          </div>
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
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="relative mt-[22px]">
              <div className="flex justify-end absolute top-[19px] right-[8px]">
                <img
                  className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                  src={delteIcon}
                  alt=""
                />
              </div>
              <label htmlFor="fileInput" className="input-label">
                <div className="w-full h-[148px] rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                  <div className="mt-[48px]">
                    {selectedFile ? (
                      <>
                        <div className="grid justify-center ">
                          <div className="flex items-center mb-[8px]">
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Selected File"
                              className="w-8 mr-1"
                            />
                            <span className="">{selectedFile.name}</span>
                          </div>
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
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="relative mt-[22px]">
              <div className="flex justify-end absolute top-[19px] right-[8px]">
                <img
                  className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                  src={delteIcon}
                  alt=""
                />
              </div>
              <label htmlFor="fileInput" className="input-label">
                <div className="w-full h-[148px] rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                  <div className="mt-[48px]">
                    {selectedFile ? (
                      <>
                        <div className="grid justify-center ">
                          <div className="flex items-center mb-[8px]">
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Selected File"
                              className="w-8 mr-1"
                            />
                            <span className="">{selectedFile.name}</span>
                          </div>
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
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        {/* Video */}
        <div className="mt-[18px]">
          <h2> Property Video {`(Optional)`}</h2>
          <div className="relative">
            <div className="flex justify-end absolute top-[8px] right-[8px]">
              <img
                className="px-[10px] py-[8px] bg-[#E6E7E6] rounded-[4px]"
                src={delteIcon}
                alt=""
              />
            </div>
            <label htmlFor="fileInput" className="input-label">
              <div className="w-full h-[110px] rounded-[8px] p-[8px] border-[1px] border-[#E6E7E6] mt-[12px]">
                <div className="mt-[38px]">
                  {selectedFile ? (
                    <>
                      <div className="grid justify-center ">
                        <div className="flex mb-[8px]">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected File"
                            className=""
                          />
                          <span className="">{selectedFile.name}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mb-[8px]">
                        <img className="w-[20px]" src={imgIcon} alt="" />
                      </div>
                      <p className="property-input-title text-center">Upload</p>
                    </>
                  )}
                </div>
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyAdd;
