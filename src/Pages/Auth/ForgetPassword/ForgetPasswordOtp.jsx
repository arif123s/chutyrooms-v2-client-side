import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../../Common/Includes/Loading/Loading";
// import { toast } from "react-toastify";

const ForgetPasswordOtp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
    const [errorMessage, setErrorMessage] = useState({
      status: false,
      message: "",
      errors: [],
    });

  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log('user',user);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading></Loading>;
  }

  const handleResendCode = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/user/password/forget", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ reset_pass_user: user.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data.status == 1029) {
          console.log("Otp sent!", data);
          console.log("Otp sent!", data.data.user, data.data.code_expires_at);
          setLoading(false);
          reset();
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              id: data.data.user,
              otpExpiresAt: data.data.code_expires_at,
            })
          );
          window.location.reload();
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
  };

  const onSubmit = (data) => {
    // You can implement your authentication logic here
    // console.log(data);

    setLoading(true);

    // send user data to database
    fetch("http://127.0.0.1:8000/api/user/password/change/pass/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_name: user.id, otp: data.otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data.status == 1) {
          console.log("Success!", data);
          // toast.success(data.message);
          navigate("/reset-password");
        } else {
          console.log("failed!", data);
            setErrorMessage({
              status: true,
              message: data.message,
              errors: [data.errors],
            });
        }
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">OTP Validate</h2>

      <div className="mb-[24px] bg-[#E8F5ED] rounded-[8px] h-[44px] md:h-[48px] lg:h-[48px] flex justify-center items-center">
        <p className="text-[#159947] text-[16px]">
          OTP is already sent to your phone number. Submit within 2 minutes!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[14px]">
          <label className="input-title" htmlFor="username">
            OTP
          </label>
          <input
            // className="input-box"
            className={` ${
              errors.username?.type === "required"
                ? "input-box input-error"
                : "input-box"
            }`}
            id="otp"
            name="otp"
            type="number"
            placeholder="Enter a OTP"
            {...register("otp", {
              required: {
                value: true,
                message: "OTP code is Required",
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

        {errorMessage.status && (
          <p className="label-text-alt text-rose-500 text-center mb-[4px]">
            {errorMessage.message}
          </p>
        )}

        {/* {errorMessage.errors?.length > 0 &&
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
            ))} */}

        <input type="submit" className="login-btn" value="Submit" />

        <a
          onClick={handleResendCode}
          className="text-[13px] block mt-[8px] text-center cursor-default hover:text-[#159947]"
        >
          Resend Code
        </a>
      </form>
    </div>
  );
};

export default ForgetPasswordOtp;
