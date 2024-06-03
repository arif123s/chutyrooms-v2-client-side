import "./MembershipCards.css";
import platinumCard from "../../assets/membership/platinum-card.png";
import goldCard from "../../assets/membership/gold-card.png";
import silverCard from "../../assets/membership/silver-card.png";
import alert from "../../assets/icons/alert-circle.svg";
import { useState } from "react";
// import { styled } from "@mui/material/styles";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
import { useMembershipCardQuery } from "../../redux/features/membershipCard/membershipCard.api";
import Loading from "../Common/Includes/Loading/Loading";
// import countryIcon from "../../../../assets/bd.svg";
// import arrowIcon from "../../../../assets/icons/arrow-down.svg";
import { BASE_ASSET_API } from "../../BaseApi/AssetUrl";

const MembershipCards = () => {
  const [purchasedCards, setPurchasedCards] = useState([
    // {
    //   id: 1,
    //   img: platinumCard,
    //   name: "Platinum",
    //   title: "Flat 8% discount on every purchase",
    //   validation: "Validation: 1 year",
    //   price: " Tk 1500",
    //   isActive: true,
    // },
    // {
    //   id: 2,
    //   img: goldCard,
    //   name: "Gold",
    //   title: "Flat 4.5% discount on every purchase",
    //   validation: "Validation: 1 year",
    //   price: " Tk 1000 tk",
    //   isActive: false,
    // },
    // {
    //   id: 3,
    //   img: silverCard,
    //   name: "Silver",
    //   title: " Flat 2% discount on every purchase",
    //   validation: "Validation: 1 year",
    //   price: " Tk 500 tk",
    //   isActive: false,
    // },
  ]);

  // const membershipCards = [
  //   {
  //     id: 1,
  //     img: platinumCard,
  //     name: "Platinum",
  //     title: "Flat 8% discount on every purchase",
  //     validation: "Validation: 1 year",
  //     price: " Tk 1500",
  //   },
  //   {
  //     id: 2,
  //     img: goldCard,
  //     name: "Gold",
  //     title: "Flat 4.5% discount on every purchase",
  //     validation: "Validation: 1 year",
  //     price: " Tk 1000",
  //   },
  //   {
  //     id: 3,
  //     img: silverCard,
  //     name: "Silver",
  //     title: "Flat 2% discount on every purchase",
  //     validation: "Validation: 1 year",
  //     price: " Tk 500",
  //   },
  // ];

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [activatedCardId, setActivatedCardId] = useState(null);

  const [checked, setChecked] = useState(false);
  const [newActivatedCardId, setNewActivatedCardId] = useState(null);
  const { data: membershipCard, isLoading } = useMembershipCardQuery();

  console.log(membershipCard?.data);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const notPurchasedMembershipCards = membershipCard?.data?.filter(
    (card) =>
      !purchasedCards.some((purchasedCard) => purchasedCard.id === card.id)
  );

  // const IOSSwitch = styled((props) => (
  //   <Switch
  //     focusVisibleClassName=".Mui-focusVisible"
  //     disableRipple
  //     {...props}
  //   />
  // ))(({ theme }) => ({
  //   width: 42,
  //   height: 24,
  //   padding: 0,
  //   "& .MuiSwitch-switchBase": {
  //     padding: 0,
  //     margin: 2,
  //     transitionDuration: "300ms",
  //     "&.Mui-checked": {
  //       transform: "translateX(16px)",
  //       color: "#fff",
  //       "& + .MuiSwitch-track": {
  //         backgroundColor:
  //           theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
  //         opacity: 1,
  //         border: 0,
  //       },
  //       "&.Mui-disabled + .MuiSwitch-track": {
  //         opacity: 0.5,
  //       },
  //     },
  //     "&.Mui-focusVisible .MuiSwitch-thumb": {
  //       color: "#33cf4d",
  //       border: "6px solid #fff",
  //     },
  //     "&.Mui-disabled .MuiSwitch-thumb": {
  //       color:
  //         theme.palette.mode === "light"
  //           ? theme.palette.grey[100]
  //           : theme.palette.grey[600],
  //     },
  //     "&.Mui-disabled + .MuiSwitch-track": {
  //       opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxSizing: "border-box",
  //     width: 19,
  //     height: 19,
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 26 / 2,
  //     backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
  //     opacity: 1,
  //     transition: theme.transitions.create(["background-color"], {
  //       duration: 1000,
  //     }),
  //   },
  // }));

  // console.log(checked);
  // console.log(purchasedCards);

  const handleActivateCard = (cardId) => {
    const cardToActivate = purchasedCards.find((card) => card.id === cardId);

    //  if (!cardToActivate.isActive) {
    const updatedCards = purchasedCards.map((card) =>
      card.id === cardId ? { ...card, isActive: !card.isActive } : card
    );
    setNewActivatedCardId(cardId);
    setPurchasedCards(updatedCards);
    setChecked(true);
    // setActivatedCardId(cardId)
    //  }
    // setPurchasedCards(updatedCards);
    // setNewActivatedCardId(cardId);
    // setShowModal(true);
    //  else {
    //    setNewActivatedCardId(null);
    //    setActivatedCardId(cardId);
    //  }
  };

  const handleNotActivateCard = (id) => {
    let count = 0;
    purchasedCards.map((card) => (card.isActive === true ? count++ : count));

    if (count > 0) {
      document.getElementById("activate-card-modal").showModal();
      setActivatedCardId(id);
    } else {
      const updatedCards = purchasedCards.map((card) =>
        card.id === id
          ? { ...card, isActive: true }
          : { ...card, isActive: false }
      );
      setPurchasedCards(updatedCards);
      // setActivatedCardId(id);
    }
  };

  const handleConfirmActivationChange = () => {
    const updatedCards = purchasedCards.map((card) =>
      card.id === activatedCardId
        ? { ...card, isActive: true }
        : { ...card, isActive: false }
    );
    setPurchasedCards(updatedCards);
    setChecked(true);
  };

  //    const handleOptionSelect = (option) => {
  //      setSelectedCountry(option);
  //      setShowOptions(false); // Close the dropdown after selecting an option
  //    };

  //  const onSubmit = () => {

  //  }

  return (
    <div className="custom-container membership-card-container">
      <h2 className="text-center text-[18px] md:text-[24px] lg:text-[32px] font-['Gilroy-semibold']">
        Membership Card
      </h2>

      {user && purchasedCards?.length > 0 && (
        <div className="cards-container">
          {/* <FormControlLabel
            onChange={(e) => handleTogggole(e)}
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="iOS style"
          /> */}
          {purchasedCards?.length > 0 && (
            <h2 className="text-[16px] md:text-[18px] lg:text-[24px] font-['Gilroy-semibold'] mb-[12px]">
              Purchased Membership Card
            </h2>
          )}
          <div className="cards">
            {purchasedCards?.map((card) => (
              <div key={card.id} className="card-container">
                <div className="flex justify-between items-center mb-[8px]">
                  <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold']">
                    {card.name}
                  </h2>
                  {/* <FormControlLabel
                    onChange={() => {
                      !card.isActive
                        ? handleNotActivateCard(card.id)
                        : handleActivateCard(card.id);
                    }}
                    control={
                      <IOSSwitch sx={{ m: 1 }} defaultChecked={card.isActive} />
                    }
                  /> */}
                  <input
                    type="checkbox"
                    className="toggle toggle-success w-[44px] h-[20px] lg:w-[46px] lg:h-[23px]"
                    checked={card.isActive}
                    onClick={() => setChecked(!checked)}
                    onChange={() => {
                      !card.isActive
                        ? handleNotActivateCard(card.id)
                        : handleActivateCard(card.id);
                    }}
                  />
                </div>
                <img className="card-img" src={card.img} alt="Platinum Card" />
                <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                  {card.title}
                </h2>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  {card.validation}
                </p>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] ">
                  {card.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* card confirmation modal */}
      <dialog id="activate-card-modal" className="modal">
        <div className="modal-box ">
          <h2>Confirmation Card</h2>
          <div className="h-[1px] bg-[#C0C3C1] my-[18px]" />
          <form method="dialog">
            <div className="modal-content">
              <div className="flex items-start gap-[18px]">
                <img className="mt-[8px]" src={alert} alt="" />
                <div className="text-[#159947]">
                  <p className="">
                    The previous card will become inactive if it is being
                    activated.
                  </p>
                  <span className="font-[Gilroy-semibold] text-[14px]">
                    If you agree, then press yes.
                  </span>
                </div>
              </div>

              <div className="h-[1px] bg-[#C0C3C1] my-[18px]" />

              <div className="modal-buttons flex justify-end gap-[8px]">
                <button className="h-[36px] w-[70px] text-[14px] bg-red-500 rounded-[8px] text-white">
                  Cancel
                </button>
                <button
                  className="h-[36px] text-[14px] w-[70px] bg-[#159947] rounded-[8px] text-white"
                  onClick={() => handleConfirmActivationChange()}
                >
                  Yes
                </button>
              </div>
            </div>
            <div>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="cards-container">
        {purchasedCards?.length > 0 && purchasedCards?.length < 3 && user && (
          <h2 className="text-[16px] md:text-[18px] lg:text-[24px] font-['Gilroy-semibold'] mb-[12px]">
            Add Another Membership Plan?
          </h2>
        )}

        <div className="cards">
          {/* {notPurchasedMembershipCards?.map((card) => (
            <div key={card.id} className="card-container">
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
                onClick={(e) => (e.preventDefault())}
                className="w-full font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
              >
                Purchase
              </button>
            </div>
          ))} */}
          {user ? (
            <>
              {notPurchasedMembershipCards?.map((card) => (
                <div key={card.id} className="card-container">
                  <img
                    className="card-img"
                    src={`${BASE_ASSET_API}/storage/images/Membership/${card.image}`}
                    alt="Platinum Card"
                  />
                  <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                    {card.description}
                  </h2>
                  <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                    {card.validation}
                  </p>
                  <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
                    TK {card.price}
                  </p>
                  <button
                    // onClick={(e) => (e.preventDefault(), setPurchase(true))}
                    className="w-full font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
                  >
                    Purchase
                  </button>
                </div>
              ))}
            </>
          ) : (
            <>
              {membershipCard?.data?.map((card) => (
                <div key={card.id} className="card-container">
                  <img
                    className="card-img"
                    src={`${BASE_ASSET_API}/storage/images/Membership/${card.image}`}
                    alt="Platinum Card"
                  />
                  <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                    {card.description}
                  </h2>
                  <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                    {card.validation}
                  </p>
                  <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
                    TK {card.price}
                  </p>
                  <button
                    // onClick={(e) => (e.preventDefault(), setPurchase(true))}
                    className="w-full font-['Gilroy-semibold'] bg-[#159947] cursor-pointer text-white px-[16px] py-[10px] rounded-[8px] border-0"
                  >
                    Purchase
                  </button>
                </div>
              ))}
            </>
          )}
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
                  name="card-container"
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
