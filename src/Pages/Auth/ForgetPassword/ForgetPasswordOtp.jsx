import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../../Common/Includes/Loading/Loading";
import { toast } from "react-toastify";

const ForgetPasswordOtp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading></Loading>;
  }

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
      body: JSON.stringify({user_name:user.id,otp:data.otp}),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data)
        if (data.status==1) {
          console.log("Success!", data);
        
          // toast.success(data.message);
          navigate("/reset-password");
        } else {
          console.log("failed!", data);
          // setErrorMessage({ status: true, message: data.errors.username[0] });
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">OTP Validate</h2>

      <div className="mb-[24px] bg-[#E8F5ED] rounded-[8px] h-[44px] md:h-[48px] lg:h-[48px] flex justify-center items-center">
        <p className="text-[#159947] text-[16px]">
          OTP is already sent to your phone number
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
      </form>
    </div>
  );
};

export default ForgetPasswordOtp;