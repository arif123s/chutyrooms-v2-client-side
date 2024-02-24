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

    const [loading, setLoading] = useState(false);

    if (loading) {
      return <Loading></Loading>;
    }

    const onSubmit = (data) => {
      // You can implement your authentication logic here
      // console.log(data);

      setLoading(true);

      const user = {
        login: data.username,
        password: data.password,
      };

      // send user data to database
      fetch("", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.status === true) {
            console.log("Successfully logged in!", data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: data.data.id,
                accessToken: data.accessToken,
                name: data.data.name,
                img: data.data.image,
                role: "",
              })
            );
            toast.success(data.message);
            navigate("/");
          } else {
            console.log("Login failed!", data);
            // setErrorMessage({ status: true, message: data.errors.username[0] });
            toast.error(data.message);
          }
        });
        navigate('/reset-password')
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