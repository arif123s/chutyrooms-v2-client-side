import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import fbIcon from "../../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../../assets/icons/google-login.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";

const OwnerRegister = () => {
    //  const [inputValue, setInputValue] = useState("");
       const navigate = useNavigate();
       const {
         register,
         handleSubmit,
         formState: { errors },
       } = useForm();
  
       const [passErrorMessage, setPassErrorMessage] = useState(false);

       const isPasswordMatch = (password, confirmPassword) => {
         return password === confirmPassword;
       };

       const onSubmit = (data) => {
        
         const password = data.password;
         const confirmPassword = data.confirmPassword;

         if (!isPasswordMatch(password, confirmPassword)) {
           // Passwords do not match
           setPassErrorMessage(true);
         } else {
           // Passwords match, you can proceed with the registration logic
           setPassErrorMessage(false);
           console.log("Successfully registered!", data);
           handleNavigate('otp')
         }
       };

       const handleNavigate = (route) => {
         navigate(`/${route}`);
       };

    //  const handleInput = (event) => {

    //    const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
    //    setInputValue(sanitizedValue);
    //  };

  return (
    <div className="login-container">
      <h2 className="login-title">Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="mb-[14px]">
          <label className="input-title" htmlFor="phone">
            Phone/Email
          </label>
          <input
            className="input-box mb-[4px]"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number or email"
            {...register("phone", {
              required: {
                value: true,
                message: "Phone or email is Required",
              },
            })}
          />
          <label className="">
            {errors.phone?.type === "required" && (
              <span className="label-text-alt text-red-500 block ">
                {errors.phone?.message}
              </span>
            )}
          </label>
        </div>

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

        <div className=" mt-3 text-[12px] lg:text-[14px] mb-[20px]">
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

        <input
          // onClick={() => {
          //   handleNavigate("otp");
          // }}
          type="submit"
          className="login-btn"
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
