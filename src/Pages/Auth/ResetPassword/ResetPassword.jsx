import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
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
//   const [errorMessage, setErrorMessage] = useState({
//     status: false,
//     message: "",
//     errors: [],
//   });
  //   const [loading, setLoading] = useState(false);

  //   if (loading) {
  //     return <Loading></Loading>;
  //   }

  const onSubmit = (data) => {
    console.log(data);
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password === confirmPassword) {
      // Passwords match, you can proceed with the registration logic
      setPassErrorMessage(false);
      navigate("/login");
    } else {
      setPassErrorMessage(true);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title font-['Gilroy-semibold']">
        Set a new password
      </h2>

      <div className="mb-[24px] bg-[#E8F5ED] rounded-[8px] h-[44px] md:h-[48px] lg:h-[48px] flex justify-center items-center">
        <p className="text-[#159947] text-[16px]">OTP validation successful</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[14px]">
          <label className="input-title" htmlFor="password">
            New Password
          </label>
          <input
            className="input-box input-error"
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

        <div className="mb-[14px]">
          <label className="input-title" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="input-box input-error"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Enter a confirm password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is Required",
              },
            })}
          />
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

        <input type="submit" className="login-btn" value="Reset Password" />
      </form>
    </div>
  );
};

export default ResetPassword;
