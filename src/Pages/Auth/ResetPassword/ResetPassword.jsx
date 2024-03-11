import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../../Common/Includes/Loading/Loading";
import { toast } from "react-toastify";
import { BASE_API } from "../../../BaseApi/BaseApi";

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
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
    errors: [],
  });
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);

    if (loading) {
      return <Loading></Loading>;
    }

  const onSubmit = (data) => {
     setLoading(true);
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password === confirmPassword) {
      // Passwords match, you can proceed with the registration logic
      setPassErrorMessage(false);

      // send user data to database
      fetch(`${BASE_API}/user/password/reset?token=${user.id}`, {
      // fetch(`http://127.0.0.1:8000/api/user/password/reset?token=${user.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          password_confirmation: data.confirmPassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          if (data.status == 1) {
            console.log("Success!", data);

            toast.success(data.message);
            navigate("/login");
          } else {
            console.log("failed!", data);
              setErrorMessage({
                status: true,
                message: data.message,
                errors: [data.errors],
              });
            toast.error(data.message);
          }
        });
    } else {
      setLoading(false)
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

        {errorMessage.status && (
          <p className="label-text-alt text-rose-500 text-center mb-[4px]">
            {errorMessage.message}
          </p>
        )}

        <input type="submit" className="login-btn" value="Reset Password" />
      </form>
    </div>
  );
};

export default ResetPassword;
