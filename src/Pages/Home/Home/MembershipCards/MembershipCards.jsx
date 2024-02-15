import "./MembershipCards.css";
import platinumCard from "../../../../assets/membership/platinum-card.png";
import goldCard from "../../../../assets/membership/gold-card.png";
import silverCard from "../../../../assets/membership/silver-card.png";
// import countryIcon from "../../../../assets/bd.svg";
// import arrowIcon from "../../../../assets/icons/arrow-down.svg";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

const MembershipCards = () => {
  // const [purchase,setPurchase]=useState(false)
  // const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  //   const [showOptions, setShowOptions] = useState(false);
  //   const [selectedCountry, setSelectedCountry] = useState({
  //     code: "+880",
  //     name: "Bangladesh",
  //     image: countryIcon,
  //   });

  //   const countryData = [
  //     { code: "+880", name: "Bangladesh", image: countryIcon },
  //     { code: "+990", name: "India", image: countryIcon },
  //     { code: "+220", name: "USA", image: countryIcon },
  //     { code: "+750", name: "Australia", image: countryIcon },
  //     { code: "+320", name: "Germany", image: countryIcon },
  //     { code: "+160", name: "UK", image: countryIcon },
  //     { code: "+960", name: "Argentina", image: countryIcon },
  //     { code: "+960", name: "Argentina", image: countryIcon },
  //     { code: "+960", name: "Argentina", image: countryIcon },
  //     { code: "+960", name: "Argentina", image: countryIcon },
  //     { code: "+960", name: "Argentina", image: countryIcon },
  //     { code: "+960", name: "Argentina", image: countryIcon },
  //     // Add more countries as needed
  //   ];

  //    const handleOptionSelect = (option) => {
  //      setSelectedCountry(option);
  //      setShowOptions(false); // Close the dropdown after selecting an option
  //    };

  //  const onSubmit = () => {

  //  }

  return (
    <div className="custom-container membership-card-container">
      <h2 className="text-center text-[18px] md:text-[24px] lg:text-[32px] font-['Gilroy-semibold']">
        Select Your Membership Card
      </h2>

      <div className="cards-container">
        <div className="cards">
          <div className="card">
            <img className="card-img" src={platinumCard} alt="Platinum Card" />
            <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
              Flat 8% discount on every purchase
            </h2>
            <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
              Validation: 1 year
            </p>
            <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
              Tk 1500 tk
            </p>
            <button
              // onClick={(e) => (e.preventDefault(), setPurchase(true))}
              className="font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
            >
              Purchase
            </button>
            {/* <div className="text-center ">
                <input
                  className="inline-block"
                  type="radio"
                  name="card"
                  id="platinum"
                />
              </div> */}
          </div>

          <div className="card">
            <img className="card-img" src={goldCard} alt="Gold Card" />
            <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
              Flat 4.5% discount on every purchase
            </h2>
            <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
              Validation: 1 year
            </p>
            <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
              Tk 1000 tk
            </p>
            <button
              // onClick={(e) => (e.preventDefault(), setPurchase(true))}
              className="font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
            >
              Purchase
            </button>
            {/* <div className="text-center ">
                <input
                  className="inline-block"
                  type="radio"
                  name="card"
                  id="gold"
                />
              </div> */}
          </div>

          <div className="card">
            <img className="card-img" src={silverCard} alt="Silver Card" />
            <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
              Flat 2% discount on every purchase
            </h2>
            <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
              Validation: 1 year
            </p>
            <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
              Tk 500 tk
            </p>
            <button
              // onClick={(e) => (e.preventDefault(), setPurchase(true))}
              className="font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
            >
              Purchase
            </button>
            {/* <div className="text-center ">
                <input
                  className="inline-block"
                  type="radio"
                  name="card"
                  id="silver"
                />
              </div> */}
          </div>
        </div>
        {/* <div className="text-center">
            <button
              onClick={(e) => (e.preventDefault(), setPurchase(true))}
              className="font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
            >
              Purchase
            </button>
          </div> */}
      </div>

      {/* {purchase && (
          <div className=" customer-details-container">
            <h2 className="login-title font-['Gilroy-semibold']">
              Customer Details
            </h2>

            <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-[14px]">
                <label className="input-title" htmlFor="name">
                  Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

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
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                  })}
                />
                <label className="">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="mb-[14px]">
                <label className="input-title" htmlFor="phone">
                  Phone
                </label>
                <div className="relative w-full">
                  <div className="phone-input-box">
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
                <label className="mt-[3px] block">
                  {errors.phone?.type === "required" && (
                    <span className="label-text-alt text-red-500 block ">
                      {errors.phone?.message}
                    </span>
                  )}
                </label>
              </div>

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

              <input
                type="submit"
                className="login-btn mt-[8px]"
                value="Pay Now"
              />
            </form>
          </div>
        )} */}
    </div>
  );
};

export default MembershipCards;
