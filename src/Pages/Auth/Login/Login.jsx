// import selectBoxIcon from "../../../assets/icons/rectangle-select-box.svg";
import fbIcon from "../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../assets/icons/google-login.svg";
import showPasswordIcon from "../../../assets/icons/hide-password.svg";
import hidePasswordIcon from "../../../assets/icons/show-password.svg";
import "./login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
// import Loading from "../../Common/Includes/Loading/Loading";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/auth/authSlice";
import { BASE_API } from "../../../BaseApi/BaseApi";

const Login = () => {
  const toastId = useRef(null);
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
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);
  console.log("errorMessage", errorMessage);

  // const [loading, setLoading] = useState(false);

  const [login, { error }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const token = localStorage.getItem("accessToken");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

 

  useEffect(() => {
    if (token) {
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [token, navigate, location]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedUsername && storedRememberMe === "true") {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

   const togglePasswordVisibility = () => {
     setIsPasswordVisible(!isPasswordVisible);
   };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // if (loading) {
  //   return <Loading></Loading>;
  // }

  const onSubmit = async (data) => {
    setDisableButton(true);
    const toastId = toast.loading("Loading...");
    setErrorMessage({ status: false, message: "" });

    // If "Remember me" is checked, store username and password
    if (rememberMe) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      // Clear stored username and password if "Remember me" is unchecked
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }

    const user = {
      login: data.username,
      password: data.password,
    };

    try {
      const res = await login(user).unwrap();

      const userInfo = {
        user: {
          id: res.data?.id,
          name: res.data?.name,
          img: res.data?.image,
          role: "",
        },
        token: {
          accessToken: res.accessToken,
        },
      };
      console.log("info", userInfo);

      dispatch(setUser(userInfo));

      const response = await fetch(`${BASE_API}/user/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setDisableButton(false);
      toast.dismiss(toastId);

      if (data.status == 1) {
        console.log("Successfully logged in!", data);
        console.log(data.data.roles[0].role_code);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: data.data.id,
            accessToken: data.accessToken,
            name: data.data.name,
            img: data.data.image,
            role: data.data.roles[0],
          })
        );

        toast.success(data.message);

        if (data.data.roles[0].role_code === 345) {
          navigate("/");
        } else if (
          data.data.roles[0].role_code === 123 ||
          data.data.roles[0].role_code === 234
        ) {
          navigate("/dashboard");
        }
      } else {
        console.log("Login failed!", data);
        toast.dismiss(toastId);
        setErrorMessage({
          status: true,
          message: data?.message,
          // errors: [data?.errors],
        });
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setDisableButton(false);
      setErrorMessage({
        status: true,
        message: data?.message,
        errors: [error?.data?.errors],
      });
      toast.dismiss(toastId);
      toast.error("Login failed! Please try again.");
    }
  };

  const navigateToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Phone/Email */}
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
            // value={username || ""}
            onChange={handleUsernameChange}
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
        {/* Password */}
        {/* <div className="">
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
            // value={password || ""}
            onChange={handlePasswordChange}
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
        </div> */}
        <div className="relative">
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
        <div className="flex justify-between mt-3 text-[12px] lg:text-[14px] mb-[12px]">
          <div className="flex items-center">
            {/* <img className="w-[12px] mr-2" src={selectBoxIcon} alt="" /> */}
            <input
              className="w-[12px] mr-2"
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              // checked={rememberMe}
              onChange={handleRememberMeChange}
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe">Remember me?</label>
          </div>

          <a
            href=""
            onClick={(e) => (e.preventDefault(), navigate("/forget-password"))}
            className="text-[#008942] hover:text-[#016A29] transition-all"
          >
            Forgot Password?
          </a>
        </div>
        {errorMessage?.status && (
          <p className="label-text-alt text-red-500 text-center mb-[8px]">
            {errorMessage?.message}
          </p>
        )}
        {errorMessage?.errors?.length > 0 &&
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
          className={`login-btn hover:bg-[#016A29] ${
            disableButton ? "opacity-50" : "opacity-100"
          }`}
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
