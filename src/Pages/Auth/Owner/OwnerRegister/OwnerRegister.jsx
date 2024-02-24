import { useNavigate } from "react-router-dom";
import fbIcon from "../../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../../assets/icons/google-login.svg";
import arrowIcon from "../../../../assets/icons/arrow-down.svg";
import countryIcon from "../../../../assets/bd.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../Common/Includes/Loading/Loading";
import { useDispatch } from "react-redux";
import { otpInfo, registerUser } from "../../../../features/user/userSlice";

const OwnerRegister = () => {
  //  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passErrorMessage, setPassErrorMessage] = useState(false);
   const [errorMessage, setErrorMessage] = useState({
     status: false,
     message: "",
     errors: [],
   });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState("phone");
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

  if (loading) {
    return <Loading></Loading>;
  }

    const handleLoginMethod = (type) => {
      setLoginMethod(type);
    };

  // const isPasswordMatch = (password, confirmPassword) => {
  //   return password === confirmPassword;
  // };

  const handleNavigate = (route) => {
    navigate(`/${route}`);
  };

  const onSubmit = (data) => {
    setErrorMessage({ status: false, message: "" });
    setLoading(true);

    const password = data.password;
    const confirmPassword = data.confirmPassword;

   

    if (password === confirmPassword) {
      // Passwords match, you can proceed with the registration logic
      setPassErrorMessage(false);

      const owner = {
        name: data.name,
        username: loginMethod === "phone" ? data.phone : data.email,
        role_code: 234,
        password,
        countryCode: selectedCountry.code,
      };

      // send user data to database
      fetch("http://127.0.0.1:8000/api/user/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(owner),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.status === 102) {
            console.log("Successfully registered!", data);
             sessionStorage.setItem(
               "user",
               JSON.stringify({
                 id: data.data.id,
                 otpExpiresAt: data.data.otp_expires_at,
                //  registration_code: data.status,
               })
             );
            dispatch(registerUser(data));
            dispatch(otpInfo(data));
            navigate(`/otp-phone`);
          } else if (data.status === 101) {
             console.log("Successfully registered!", data);
             sessionStorage.setItem(
               "user",
               JSON.stringify({
                 id: data.data.id,
                 otpExpiresAt: data.data.email_verification_token_expires_at,
                //  registration_code: data.status,
               })
             );
             dispatch(registerUser(data));
             dispatch(otpInfo(data));
             navigate(`/otp-email`);
          } else {
            console.log("Registration failed!", data)
          setErrorMessage({
            status: true,
            message: data.message,
            errors: [data.errors],
          });
          }
        });
    } else {
      setLoading(false)
      // Passwords do not match
      setPassErrorMessage(true);
    }
  };

  //  const handleInput = (event) => {

  //    const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
  //    setInputValue(sanitizedValue);
  //  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">
        Owner Registration
      </h2>

      <div className="flex gap-[12px]">
        <button
          onClick={() => handleLoginMethod("phone")}
          className={`login-method ${
            loginMethod === "phone"
              ? "selected-login-method"
              : "login-method-btn"
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => handleLoginMethod("email")}
          className={`login-method ${
            loginMethod === "email"
              ? "selected-login-method"
              : "login-method-btn"
          }`}
        >
          Email
        </button>
      </div>

      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[14px]">
          <label className="input-title" htmlFor="name">
            Owner Name
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

        {/* <div className="mb-[14px]">
          <label className="input-title" htmlFor="username">
            Phone/Email
          </label>
          <input
            className="input-box mb-[4px]"
            id="username"
            name="username"
            type="text"
            placeholder="Enter your phone number or email"
            {...register("username", {
              required: {
                value: true,
                message: "Phone or email is Required",
              },
            })}
          />
          <label className="">
            {errors.username?.type === "required" && (
              <span className="label-text-alt text-red-500 block ">
                {errors.username?.message}
              </span>
            )}
          </label>
        </div> */}

        {loginMethod === "phone" ? (
          <div className="mb-[14px]">
            <label className="input-title" htmlFor="phone">
              Phone
            </label>
            <div className="relative w-full">
              <div className="phone-input-box">
                <div className="flex">
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
                            {/* <span className="country-name">
                            {selectedCountry.name}
                          </span> */}
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
                  type="number"
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
                <span className="label-text-alt text-red-500 block ">
                  {errors.phone?.message}
                </span>
              )}
            </label>
          </div>
        ) : (
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
        )}

        {/* <div className="mb-4">
          <label className="input-title" htmlFor="phone">
            Phone Number
          </label>
        
          <input
            type="text"
            pattern="[0-9]*"
            className="input-box"
            id="phone"
            value={inputValue}
            onInput={handleInput}
            placeholder="Enter your phone number"
          />
        </div> */}

        <div className="mb-[14px]">
          <label className="input-title" htmlFor="password">
            Password
          </label>
          <input
            className="input-box "
            id="password"
            name="password"
            type="password"
            placeholder="Enter a password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
              minLength: {
                value: 8,
                message: "Password must be 8 characters or longer",
              },
            })}
          />
          <label className="">
            {errors.password?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>

        <div className="mb-[14px]">
          <label className="input-title" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="input-box"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is Required",
              },
            })}
          />
          <label className="">
            {errors.confirmPassword?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
            {passErrorMessage && (
              <span className="label-text-alt text-red-500">
                Passwords Not Matched
              </span>
            )}
          </label>
        </div>

        <div className=" mt-3 text-[12px] lg:text-[14px] mb-[12px]">
          {/* <img className="w-[12px] mr-2" src={selectBoxIcon} alt="" /> */}
          <div className="flex items-center">
            <input
              className="w-[12px] mr-2 text-[]"
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

            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}I
              agree to Chutyrooms's{" "}
              <a className="text-[#159947]">Terms and conditions</a>
            </p>
          </div>
          <label className=" mb-0 pb-0">
            {errors.terms?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.terms.message}
              </span>
            )}
          </label>
        </div>

        {errorMessage.status && (
          <p className="label-text-alt text-red-500 text-center">
            {errorMessage.message}
          </p>
        )}

        {errorMessage.errors?.length > 0 &&
          errorMessage?.errors?.map((err, index) => (
            <div key={index}>
              {Object.values(err).map((value, i) => (
                <p
                  className="label-text-alt text-rose-500 text-center mb-[2px]"
                  key={i}
                >
                  {value}
                </p>
              ))}
            </div>
          ))}

        <input type="submit" className="login-btn mt-[8px]" value="Register" />
      </form>

      <div className="flex mt-[20px] items-center mx-0 md:mx-8 lg:mx-8">
        <hr className="w-full bg-[#C6C6C6] h-[1px]" />
        <span className="mx-4 text[14px]">Or</span>
        <hr className="w-full bg-[#C6C6C6] h-[1px]" />
      </div>

      <div className="flex my-[20px] justify-center gap-4">
        <img className="social-login-icon" src={fbIcon} alt="" />
        <img className="social-login-icon" src={googleIcon} alt="" />
      </div>

      <div className="text-center">
        <p className="text-[16px]">
          Already registered?{" "}
          <a
            onClick={() => {
              handleNavigate("login");
            }}
            className="sign-up-btn"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default OwnerRegister;
