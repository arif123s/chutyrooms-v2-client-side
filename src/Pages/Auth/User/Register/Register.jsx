import { useNavigate } from "react-router-dom";
// import selectBoxIcon from "../../../assets/icons/rectangle-select-box.svg";
import fbIcon from "../../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../../assets/icons/google-login.svg";
import arrowIcon from "../../../../assets/icons/arrow-down.svg";
import countryIcon from "../../../../assets/bd.svg";
import showPasswordIcon from "../../../../assets/icons/hide-password.svg";
import hidePasswordIcon from "../../../../assets/icons/show-password.svg";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import Loading from "../../../Common/Includes/Loading/Loading";
import "./Register.css";
import { registerUser } from "../../../../redux/features/user/userSlice";
import { BASE_API } from "../../../../BaseApi/BaseApi";
import { toast } from "react-toastify";

const Register = () => {
  const toastId = useRef(null);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passErrorMessage, setPassErrorMessage] = useState(false);
  // const [errorMessage, setErrorMessage] = useState({
  //   status: false,
  //   message: "",
  // });
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
    errors: [],
  });
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState("phone");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
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
  ];

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedCountry(option);
    setShowOptions(false); // Close the dropdown after selecting an option
  };

  // if(errorMessage.errors.length>0){
  //    errorMessage?.errors?.map((a) => console.log(a));
  // }

  //  const createUserMutation = useMutation((userData) => {
  //    return fetch("http://127.0.0.1:8000/api/user/register", {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify(userData),
  //    }).then((response) => {
  //      if (!response.ok) {
  //        throw new Error("Registration failed");
  //      }
  //      return response.json();
  //    });
  //  });
  // const isEmailValid = (email) => {
  //   Regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const isPhoneValid = (phone) => {
  //   Regular expression for basic phone number validation
  //   This example assumes a simple 10-digit phone number without dashes or spaces
  //   const phoneRegex = /^\d{10,}$/;
  //   return phoneRegex.test(phone);
  // };

  // if (loading) {
  //   return <Loading></Loading>;
  // }

  // const isPasswordMatch = (password, confirmPassword) => {
  //   return password === confirmPassword;
  // };

  const handleLoginMethod = (type) => {
    setLoginMethod(type);
  };

  const onSubmit = (data) => {
    // console.log(data)
    // if (isEmailValid(data.phone)) {
    //   It's a valid email
    //   console.log("Valid email:", data.phone);
    //   setErrorMessage(false);
    // } else if (isPhoneValid(data.phone)) {
    //   It's a valid phone number
    //   console.log("Valid phone number:", data.phone);
    //   setErrorMessage(false);
    // } else {
    //   Invalid email or phone number
    //   console.log("Invalid input:", data.phone);
    //   setErrorMessage(true);
    // }
    toast.loading("Loading...");
    setDisableButton(true);
    setErrorMessage({ status: false, message: "" });
    // setLoading(true);

    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password === confirmPassword) {
      // Passwords match, you can proceed with the registration logic
      setPassErrorMessage(false);
      const user = {
        name: data.name,
        username: loginMethod === "phone" ? data.phone : data.email,
        role_code: 345,
        password,
        country_code: selectedCountry.code,
      };
      // console.log('user',user)
      // send user data to database
      try {
        fetch(`${BASE_API}/user/register`, {
          // fetch("http://127.0.0.1:8000/api/user/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            // setLoading(false);
            console.log("data", data);
            toast.dismiss(toastId.current);
            setDisableButton(false);
            if (data.status == 102) {
              console.log("Successfully registered phone!", data);
              sessionStorage.setItem(
                "user",
                JSON.stringify({
                  id: data.data.id,
                  otpExpiresAt: data.data.otp_expires_at,
                  // registration_code: data.status,
                })
              );
              dispatch(registerUser(data));
              // dispatch(otpInfo(data));
              navigate(`/otp-phone`);
            }
            if (data.status == 101) {
              console.log("Successfully registered email!", data);
              sessionStorage.setItem(
                "user",
                JSON.stringify({
                  id: data.data.id,
                  otpExpiresAt: data.data.email_verification_token_expires_at,
                  // registration_code: data.status,
                })
              );
              dispatch(registerUser(data));
              // dispatch(otpInfo(data));
              navigate(`/otp-email`);
            } else {
              // console.log("Registration failed!", data?.errors?.username[0]);
              setErrorMessage({
                status: true,
                message: data?.message,
                errors: [data?.errors],
              });
            }
          });
      } catch (err) {
        console.log("Error during registration:", err);
      }
    } else {
      // Passwords do not match
      toast.dismiss(toastId.current);
      setDisableButton(false);
      // setLoading(false);
      setPassErrorMessage(true);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">Register</h2>

      <div className="flex gap-[12px]">
        <button
          onClick={() => handleLoginMethod("phone")}
          className={`login-method ${
            loginMethod === "phone"
              ? "selected-login-method font-['Gilroy-semibold']"
              : "login-method-btn"
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => handleLoginMethod("email")}
          className={`login-method ${
            loginMethod === "email"
              ? "selected-login-method font-['Gilroy-semibold']"
              : "login-method-btn"
          }`}
        >
          Email
        </button>
      </div>

      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="mb-4">
            <label className="input-title" htmlFor="userId">
              User ID
            </label>
            <input
              className="input-box"
              id="userId"
              name="userId"
              type="text"
              placeholder="Enter your user id"
            />
          </div> */}

        {/* Name */}
        <div className="mb-[14px]">
          <label className="input-title" htmlFor="name">
            Name
          </label>
          <input
            className="input-box"
            // className={` ${
            //   errors.name?.type === "required"
            //     ? "input-box input-error"
            //     : "input-box"
            // }`}
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
              <div
                className="phone-input-box"
                // className={` ${
                //   errors.phone?.type === "required"
                //     ? "phone-input-box input-error"
                //     : "phone-input-box"
                // }`}
              >
                <div className="flex w-[104px]">
                  <div className="relative mr-[4px]">
                    <div className="custom-select-container">
                      <div
                        className="selected-option flex items-center"
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
                  className="w-full block mb-[4px] bg-white"
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
            <label className="mt-[3px]">
              {errors.phone?.type === "required" && (
                <span className="label-text-alt text-red-500 block ">
                  {errors.phone?.message}
                </span>
              )}
            </label>
          </div>
        ) : (
          // Email
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
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <label className="">
              {errors.email && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
        )}

        <div className="relative mb-[14px]">
          <label className="input-title" htmlFor="password">
            Password
          </label>
          <input
            className={`${
              errors.password ? "input-box input-error" : "input-box"
            }`}
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter a password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
              // minLength: {
              //   value: 8,
              //   message: "Password must be 8 characters or longer",
              // },
            })}
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <img className="h-6 w-6 mt-[30px]" src={hidePasswordIcon} />
            ) : (
              // Eye icon for showing password
              <img className="h-6 w-6 mt-[30px]" src={showPasswordIcon} />
            )}
          </span>
          <label className="mb-0 pb-0">
            {errors.password && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>

        <div className="mb-[14px] relative">
          <label className="input-title" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="input-box"
            id="confirmPassword"
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is Required",
              },
            })}
          />
          <span  
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? (
              <img className="h-5 w-5 mt-[30px]" src={hidePasswordIcon} />
            ) : (
              // Eye icon for showing password
              <img className="h-5 w-5 mt-[30px]" src={showPasswordIcon} />
            )}
          </span>
          <label className=" mb-0 pb-0">
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
              {/* eslint-disable-next-line react/no-unescaped-entities */}I
              agree to Chutyrooms's{" "}
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

        {errorMessage.status && (
          <p className="label-text-alt text-rose-500 text-center mb-[2px]">
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

        <input
          type="submit"
          disabled={disableButton}
          className={`login-btn mt-[8px] hover:bg-[#016A29] ${
            disableButton ? "opacity-50" : "opacity-100"
          }`}
          value="Register"
        />
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
          <a onClick={navigateToLogin} className="sign-up-btn">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
