import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../../Common/Includes/Loading/Loading";
import { useState } from "react";
import { BASE_API } from "../../../BaseApi/BaseApi";

const ForgetPassword = () => {
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
    const username = data.username;
    setLoading(true)
console.log(data)
fetch(`${BASE_API}/user/password/forget`, {
  // fetch("http://127.0.0.1:8000/api/user/password/forget", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  body: JSON.stringify({ reset_pass_user: data.username }),
})
  .then((res) => res.json())
  .then((data) => {
    setLoading(false);
    console.log(data);
    if (data.status == 1029) {
      console.log("Otp sent!", data);
      console.log("Otp sent!", data.data.user, data.data.code_expires_at);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: data.data.user,
          otpExpiresAt: data.data.code_expires_at,
          username: username,
        })
      );
      navigate(`/forget-password-otp`);
    } else {
      console.log("Registration failed!", data);
      setErrorMessage({
        status: true,
        message: data.message,
        errors: [data.errors],
      });
      console.log("errormessage", errorMessage.errors.length);
    }
  });
  }

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">Reset Password</h2>

      {/* <div className="mb-[24px] bg-[#E8F5ED] rounded-[8px] h-[44px] md:h-[48px] lg:h-[48px] flex justify-center items-center">
        <p className="text-[#159947] text-[16px]">OTP validation successful</p>
      </div> */}

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

        {errorMessage.errors?.length > 0 &&
          errorMessage?.errors?.map((err, index) => (
            <div key={index}>
              {Object.values(err).map((value, i) => (
                <p
                  className="label-text-alt text-rose-500 text-center mb-[4px]"
                  key={i}
                >
                  {value}
                </p>
              ))}
            </div>
          ))}

        <input type="submit" className="login-btn" value="Submit" />
      </form>
    </div>
  );
};

export default ForgetPassword;
