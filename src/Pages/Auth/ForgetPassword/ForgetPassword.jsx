import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   const [loading, setLoading] = useState(false);

//   if (loading) {
//     return <Loading></Loading>;
//   }

  const onSubmit = (data) => {
console.log(data)
navigate('/otp')
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

        <input type="submit" className="login-btn" value="Submit" />
      </form>
    </div>
  );
};

export default ForgetPassword;
