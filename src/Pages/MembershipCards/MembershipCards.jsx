import "./MembershipCards.css";
import platinumCard from "../../assets/membership/platinum-card.png";
import goldCard from "../../assets/membership/gold-card.png";
import silverCard from "../../assets/membership/silver-card.png";
import { useState } from "react";
// import countryIcon from "../../../../assets/bd.svg";
// import arrowIcon from "../../../../assets/icons/arrow-down.svg";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

const MembershipCards = () => {

  const [purchasedCards, setPurchasedCards] = useState([
    {
      id: 1,
      img: platinumCard,
      name: "Platinum",
      title: "Flat 8% discount on every purchase",
      validation: "Validation: 1 year",
      price: " Tk 1500 tk",
    },
    {
      id: 2,
      img: goldCard,
      name: "Gold",
      title: "Flat 4.5% discount on every purchase",
      validation: "Validation: 1 year",
      price: " Tk 1000 tk",
    },
  ]);

  const membershipCards = [
    {
      id: 1,
      img: platinumCard,
      name: "Platinum",
      title: "Flat 8% discount on every purchase",
      validation: "Validation: 1 year",
      price: " Tk 1500 tk",
    },
    {
      id: 2,
      img: goldCard,
      name: "Gold",
      title: "Flat 4.5% discount on every purchase",
      validation: "Validation: 1 year",
      price: " Tk 1000 tk",
    },
    {
      id: 3,
      img: silverCard,
      name: "Silver",
      title: " Flat 2% discount on every purchase",
      validation: "Validation: 1 year",
      price: " Tk 500 tk",
    },
  ];

  const notPurchasedMembershipCards = membershipCards.filter(
    (card) =>
      !purchasedCards.some((purchasedCard) => purchasedCard.id === card.id)
  );

  console.log(notPurchasedMembershipCards)


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

      {purchasedCards?.length && (
        <div className="cards-container">
          <div className="cards">
            {purchasedCards.map((card) => (
              <div key={card.id} className="card">
                <div className="flex justify-between items-center mb-[8px]">
                  <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold']">
                    {card.name}
                  </h2>
                 
                    <input
                      type="checkbox"
                      className="toggle toggle-success w-[44px] h-[20px] lg:w-[46px] lg:h-[23px]"
                    />
                </div>
                <img className="card-img" src={card.img} alt="Platinum Card" />
                <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                  {card.title}
                </h2>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  {card.validation}
                </p>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
                  {card.price}
                </p>
              </div>
            ))}
            <div></div>
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
      )}
      <div className="cards-container">
        <div className="cards">
          {notPurchasedMembershipCards.map((card) => (
            <div key={card.id} className="card">
              <img className="card-img" src={card.img} alt="Platinum Card" />
              <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                {card.title}
              </h2>
              <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                {card.validation}
              </p>
              <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
                {card.price}
              </p>
              <button
                // onClick={(e) => (e.preventDefault(), setPurchase(true))}
                className="font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
              >
                Purchase
              </button>
            </div>
          ))}
          <div>
            {/* <img className="card-img" src={platinumCard} alt="Platinum Card" />
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
            </button> */}
            {/* <div className="text-center ">
                <input
                  className="inline-block"
                  type="radio"
                  name="card"
                  id="platinum"
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
