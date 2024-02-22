import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../../Common/Includes/Loading/Loading";
import { useState } from "react";

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
    setLoading(true)
console.log(data)
fetch("http://127.0.0.1:8000/api/user/password/forget", {
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
      console.log("Otp sent!", data.data.code_expires_at);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: data.data.user.id,
          otpExpiresAt: data.data.code_expires_at,
        })
      );
      // navigate(`/otp`);
    }
    // if (data.status == 101) {
    //   console.log("Successfully registered!", data);
    //   sessionStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       id: data.data.id,
    //       otpExpiresAt: data.data.otp_expires_at,
    //     })
    //   );

    //   navigate(`/otp`);
    // }
    else {
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
