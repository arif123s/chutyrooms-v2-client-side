// import selectBoxIcon from "../../../assets/icons/rectangle-select-box.svg";
import fbIcon from "../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../assets/icons/google-login.svg";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "../../Common/Includes/Loading/Loading";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const [errorMessage, setErrorMessage] = useState({
     status: false,
     message: "",
     errors: [],
   });

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => {
    // You can implement your authentication logic here
    // console.log(data);

     setErrorMessage({ status: false, message: "" });

    // If "Remember Me" is checked, you can save the user's information (e.g., token) to localStorage
    if (data.rememberMe) {
      localStorage.setItem("userToken", "yourUserToken"); // Replace with the actual user token
    }

    setLoading(true);

    const user = {
      login: data.username,
      password: data.password,
    };

    // send user data to database
    fetch("http://127.0.0.1:8000/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status===true) {
          console.log("Successfully logged in!", data);
           localStorage.setItem("accessToken", data.accessToken);
           localStorage.setItem(
             "userInfo",
             JSON.stringify({
               id: data.data.id,
               accessToken: data.accessToken,
               name:data.data.name,
               img:data.data.image,
               role:""
             })
           );
          toast.success(data.message);
          navigate("/");
        } else {
          console.log("Login failed!", data);
          // setErrorMessage({ status: true, message: data.errors.username[0] });
          // toast.error(data.message);
            setErrorMessage({
              status: true,
              message: data.message,
              errors: [data.errors],
            });
        }
      });
  };

  const navigateToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[14px]">
          <label className="input-title" htmlFor="username">
            Phone/Email
          </label>
          <input
            // className="input-box"
            className={` ${
              errors.username?.type === "required"
                ? "input-box input-error"
                : "input-box"
            }`}
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
              <span className="label-text-alt text-red-500">
                {errors.username?.message}
              </span>
            )}
          </label>
        </div>

        <div className="">
          <label className="input-title" htmlFor="password">
            Password
          </label>
          <input
            // className="input-box"
            className={` ${
              errors.password?.type === "required"
                ? "input-box input-error"
                : "input-box"
            }`}
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
          <label className=" mb-0 pb-0">
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

        <div className="flex justify-between mt-3 text-[12px] lg:text-[14px] mb-[12px]">
          <div className="flex items-center">
            {/* <img className="w-[12px] mr-2" src={selectBoxIcon} alt="" /> */}
            <input
              className="w-[12px] mr-2 text-[]"
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              {...register("rememberMe")}
            />
            <span>Remember me?</span>
          </div>

          <a
            href=""
            onClick={(e) => (e.preventDefault(), navigate("/forget-password"))}
            className="text-[#159947]"
          >
            Forgot Password?
          </a>
        </div>

        {errorMessage.status && (
          <p className="label-text-alt text-red-500 text-center mb-[8px]">
            {errorMessage.message}
          </p>
        )}

        {/* {errorMessage.errors?.length > 0 &&
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
          ))} */}

        <input
          type="submit"
          className="login-btn hover:bg-[#016A29]"
          value="Sign In"
        />
        {/* <button className="login-btn">Sign In</button> */}
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
        <p className="text-[16px] ">
          Don’t have an account?{" "}
          <a
            href="/register"
            onClick={(e) => navigateToRegister(e)}
            className="sign-up-btn"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
