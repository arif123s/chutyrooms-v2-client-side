import "./BookingPreview.css";
import arrowRight from "../../../assets/icons/arrow-right-black.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import countryIcon from "../../../assets/bd.svg";
import arrowIcon from "../../../assets/icons/arrow-down.svg";
import hotel1 from "../../../assets/hotel-img/hotel1.png";
import starFill from "../../../assets/icons/star-fill.svg";
import starBlank from "../../../assets/icons/star-blank.svg";
import location from "../../../assets/icons/map-pin.svg";
import helpline from "../../../assets/icons/helpline.svg";
import plus from "../../../assets/icons/plus.svg";
import minus from "../../../assets/icons/minus.svg";

const BookingPreview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+880",
    name: "Bangladesh",
    image: countryIcon,
  });

  const countryData = [
    { code: "+880", name: "Bangladesh", image: countryIcon },
    { code: "+990", name: "India", image: countryIcon },
    { code: "+220", name: "USA", image: countryIcon },
    { code: "+750", name: "Australia", image: countryIcon },
    { code: "+320", name: "Germany", image: countryIcon },
    { code: "+160", name: "UK", image: countryIcon },
    { code: "+960", name: "Argentina", image: countryIcon },
    { code: "+960", name: "Argentina", image: countryIcon },
    { code: "+960", name: "Argentina", image: countryIcon },
    { code: "+960", name: "Argentina", image: countryIcon },
    { code: "+960", name: "Argentina", image: countryIcon },
    { code: "+960", name: "Argentina", image: countryIcon },
    // Add more countries as needed
  ];

  const handleOptionSelect = (option) => {
    setSelectedCountry(option);
    setShowOptions(false); // Close the dropdown after selecting an option
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="custom-container pt-[24px] md:pt-[30px] lg:pt-[34px] pb-[24px] md:pb-[60px] lg:pb-[100px]">
      <div className="flex items-center gap-[8px]">
        <img className="w-[20]" src={arrowRight} alt="" />
        <h2>Edit your booking</h2>
      </div>

      <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-[14px] personal-hotel-details-container">
          {/* Persopnal details */}

          <div className="personal-details-container">
            <p className="cancellation-message ">
              Cancellation of this booking time limit is up to 30 minutes
            </p>

            <div className="mt-[18px]">
              <h2 className="booking-title">Your Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[14px] mt-[18px]">
                {/* Name */}
                <div className="mb-[0px] md:mb-[14px] lg:mb-[14px]">
                  <label className="input-title" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="input-box"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                </div>
                {/* Email */}
                <div className="mb-4">
                  <label className="input-title" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="input-box"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <label className=" mb-0 pb-0">
                    {errors.email && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              {/* Phone */}
              <div className="mb-[18px] ">
                <label className="input-title" htmlFor="phone">
                  Phone
                </label>
                <div className="relative w-full">
                  <div className="phone-input-box  ">
                    <div className="flex w-[104px]">
                      <div className="relative mr-[4px]">
                        <div className="custom-select-container">
                          <div
                            className="selected-option flex items-center "
                            onClick={() => setShowOptions(!showOptions)}
                          >
                            {selectedCountry ? (
                              <div className="flex items-center mr-[6px]">
                                <img
                                  src={selectedCountry.image}
                                  alt={selectedCountry.name}
                                  className="w-[20px] h-[14px] mr-[2px]"
                                />
                                <span className="cursor-default">
                                  {selectedCountry.code}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center mr-[6px]">
                                <img
                                  src={selectedCountry.image}
                                  alt=""
                                  className="w-[20px] h-[14px] mr-[2px]"
                                />
                                <span className="country-code">
                                  {selectedCountry.code}
                                </span>
                              </div>
                            )}
                            <img className="ml-[14px]" src={arrowIcon} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] h-[16px] bg-[#E6E7E6] mr-[4px]"></div>
                    <input
                      className="w-full block mb-[4px]"
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Enter your phone number"
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Phone number is Required",
                        },
                      })}
                    />
                  </div>
                  {showOptions && (
                    <div className="options-container">
                      <div className="options-list">
                        {countryData.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[6px] p-[2px] hover:bg-[#159947] hover:text-white"
                            onClick={() => handleOptionSelect(option)}
                          >
                            <img
                              src={option.image}
                              alt={option.name}
                              className="w-[26px] h-[20px]"
                            />
                            <span className="country-name">{option.name}</span>
                            <span className="country-code">{option.code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <label className="">
                  {errors.phone?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
              </div>

              <div>
                <h2 className=" text-[20px] mb-[18px]">
                  <span className="booking-title">Contact Details</span>{" "}
                  <span className="text-[14px]">(Optional)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-[14px]">
                  <div className="mb-[0px] md:mb-[14px] lg:mb-[14px]">
                    <label className="input-title" htmlFor="country">
                      Country
                    </label>
                    <input
                      className="input-box"
                      id="country"
                      name="country"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="mb-[0px] md:mb-[14px] lg:mb-[14px]">
                    <label className="input-title" htmlFor="city">
                      City
                    </label>
                    <input
                      className="input-box"
                      id="city"
                      name="city"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="mb-[14px]">
                    <label className="input-title" htmlFor="postal">
                      Postal Code
                    </label>
                    <input
                      className="input-box"
                      id="postal"
                      name="postal"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="mb-[14px]">
                  <label className="input-title" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="input-box"
                    id="address"
                    name="address"
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hotel details */}
          <div className="booking-details-container">
            <div>
              <div className="flex gap-[12px] lg:gap-[18px]">
                <div className="booked-hotel-img relative">
                  <img className="booked-hotel-img" src={hotel1} alt="" />
                  <div className="absolute top-[6px] md:top-[10px] lg:top-[10px] z-10 px-[6px] md:px-[10px] lg:px-[10px]">
                    <div className="flex h-6 md:h-8 lg:h-8 p-1.5 md:p-2 lg:p-2 bg-zinc-500 rounded-[5px] border border-white justify-center items-center gap-[4px]">
                      <div className="">
                        <img className="w-[12px]" src={starFill} alt="" />
                      </div>
                      <p className="text-white text-[10px] md:text-[12px] lg:text-[12px]">
                        <span className="mr-[2px]">4</span>Star
                      </p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <p className="flex justify-center items-center text-[14px] lg:text-[16px] h-[28px] lg:h-[32px] p-[10px] border-[1px] border-[#808783] w-fit rounded-[4px]">
                    Hotels
                  </p>
                  <div className="flex justify-between mt-[2px] gap-[0px]">
                    <div>
                      <div className="flex items-center">
                        <h2 className="hotel-name mr-[8px]">Hotel Sea View</h2>
                      </div>
                      <div className="flex items-center mt-[0px] gap-[6px]">
                        <img src={location} alt="" />
                        <span className="hotel-info">Cox’s Bazar</span>
                      </div>
                      <div className="flex items-center mt-[8px] gap-[6px]">
                        <img src={helpline} alt="" />
                        <span className="hotel-info">01800-000000</span>
                      </div>
                      <div className="flex my-[4px]">
                        <div className="ratings">
                          <img
                            className="mr-[2px]"
                            src={starFill}
                            alt="rating"
                          />
                          <img
                            className="mr-[2px]"
                            src={starFill}
                            alt="rating"
                          />
                          <img
                            className="mr-[2px]"
                            src={starFill}
                            alt="rating"
                          />
                          <img
                            className="mr-[2px]"
                            src={starFill}
                            alt="rating"
                          />
                          <img className="" src={starBlank} alt="rating" />
                        </div>
                        <p className="text-[12px] md:text-[14px] lg:text-[14px]">
                          4.8 (21 Reviews){" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-[24px] mt-[18px] text-[14px]">
                  <div>
                    <h2 className="text-[12px] font-['Gilroy-semibold']">
                      CHECK IN
                    </h2>
                    <p>09 Oct 2023</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-[12px] font-['Gilroy-semibold']">
                      CHECK OUT
                    </h2>
                    <p>11 Oct 2023</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-[12px] font-['Gilroy-semibold']">
                      DURATION
                    </h2>
                    <p>1 Night</p>
                  </div>
                </div>
                <div className="flex justify-between mt-[18px] text-[14px] md:text-[16px] lg:text-[16px]">
                  <p>Premium Suite</p>
                  <p>2 Adults 0 Child Per Room</p>
                </div>

                <div className="h-[1px] bg-[#808783] my-[18px]" />

                <div className="text-[14px] md:text-[16px] lg:text-[16px]">
                  <div className="grid grid-cols-3 justify-between">
                    <p className="">
                      Hotel Price{" "}
                      <span className="text-[12px]">(2 Adults 0 Child)</span>
                    </p>
                    <p className="text-center">1X</p>
                    <p className="text-right">BDT 2300</p>
                  </div>
                  <div className="flex justify-between mt-[18px]">
                    <p>ChutyRooms Offer</p>
                    <p className="flex items-center ml-auto gap-[4px]">
                      <img src={minus} alt="" />
                      BDT 0
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-[#808783] my-[18px]" />

                <div className="text-[14px] md:text-[16px] lg:text-[16px]">
                  <div className="grid grid-cols-3 justify-between">
                    <p className=" text-left">Room Rate</p>
                    <p className="text-center">1X</p>
                    <p className="text-right">BDT 2300</p>
                  </div>
                  <div className="grid grid-cols-3 justify-between mt-[18px]">
                    <p className=" text-left">Extra Bed</p>
                    <p className="text-center">0X</p>
                    <p className="flex items-center ml-auto gap-[4px]">
                      <img src={plus} alt="" />
                      BDT 0
                    </p>
                  </div>

                  <div className="flex justify-between mt-[18px]">
                    <div className="flex gap-[8px] md:gap-[24px] lg:gap-[24px]">
                      <p>Promo Code</p>
                      <div className="flex gap-[8px] md:gap-[12px] lg:gap-[12px]">
                        <input
                          className="w-[70px] border-[1px] rounded-[4px] py-[2px] px-[4px]"
                          type="text"
                          name=""
                          id=""
                        />
                        <button className="border-[1px] rounded-[4px] py-[2px] px-[8px]">
                          Apply
                        </button>
                      </div>
                    </div>
                    <p className="flex items-center ml-auto gap-[4px]">
                      <img src={minus} alt="" />
                      BDT 0
                    </p>
                  </div>
                  <div className="flex justify-between mt-[18px]">
                    <p>Tax & Fees</p>
                    <p className="flex items-center ml-auto gap-[4px]">
                      <img src={minus} alt="" />
                      BDT 0
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-[#808783] mt-[18px]" />

                <div className="flex justify-between mt-[12px] text-[14px] lg:text-[16px] font-['Gilroy-semibold']">
                  <h2 className="">Total Payable Amount</h2>
                  <h2 className="">BDT 2300</h2>
                </div>
              </div>

              {/* <div className="payment-amount">
                <div className="flex items-center gap-[6px]">
                  <input
                    className="border border-[#159947] checked:bg-[#159947] hover:bg-[#159947] focus:bg-[#159947] focus:ring-[#159947] text-[#159947]  focus:border-[#159947]"
                    type="radio"
                    name="payment"
                    id="payment10"
                  />
                  <label htmlFor="payment10">Advance Payment 10%</label>
                </div>
                <div className="flex items-center gap-[6px]">
                  <input type="radio" name="payment" id="paymentfull" />
                  <label htmlFor="paymentfull">Full Payment</label>
                </div>
              </div> */}

              <div className="payment-amount">
                <div className="flex items-center gap-[6px]">
                  <input
                    type="radio"
                    name="payment"
                    id="payment10"
                    {...register("payment", { required: true })} // Adding validation rule for required
                  />
                  <label htmlFor="payment10">Advance Payment 10%</label>
                </div>
                <div className="flex items-center gap-[6px]">
                  <input
                    type="radio"
                    name="payment"
                    id="paymentfull"
                    {...register("payment", { required: true })} // Adding validation rule for required
                  />
                  <label htmlFor="paymentfull">Full Payment</label>
                </div>
              </div>
              <label className=" mb-0 pb-0">
                {errors.payment?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    Please select one option.
                  </span>
                )}
              </label>

              <div className=" mt-3 text-[12px] lg:text-[14px] mb-[12px]">
                <div className="flex items-center">
                  <input
                    className="w-[12px] mr-2"
                    type="checkbox"
                    name="terms"
                    id="terms"
                    {...register("terms", {
                      required: {
                        value: true,
                        message: "Please accept the Terms & Conditions",
                      },
                    })}
                  />

                  <p className="mr-[2px]">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    I agree to Chutyrooms's{" "}
                  </p>
                  <a className="text-[#159947]">Terms and conditions</a>
                </div>
                <label className=" mb-0 pb-0">
                  {errors.terms?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.terms.message}
                    </span>
                  )}
                </label>
              </div>

              <button type="submit" className="login-btn mt-[20px]">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingPreview;
