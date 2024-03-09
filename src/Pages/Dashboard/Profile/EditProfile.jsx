import { useForm } from "react-hook-form";
import userImg from "../../../assets/icons/user.svg";
import { useState } from "react";

const EditProfile = () => {
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm();
 const [changePassword,setChangePassword]=useState(false);
  const [passErrorMessage, setPassErrorMessage] = useState(false);

 const  onSubmit = () =>{
 
 }

  return (
    <div className="m-[24px] bg-white rounded-[8px]">
      <form
        className="w-8/12 p-[20px] rounded-[8px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <img className="w-[70px] mr-[12px]" src={userImg} alt="Profile" />
          <p className="text-[#159947] text-[14px]">Change Photo</p>
        </div>

        <div className="h-[1px] bg-[#E6E7E6] my-[24px]" />

        <div>
          <div className="mb-[14px]">
            <label className="input-title" htmlFor="name">
              Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is Required",
                },
              })}
            />
            <label className="">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-4">
            <label className="input-title" htmlFor="email">
              Email
            </label>
            <input
              className="input-box"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <label className="">
              {errors.email && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-[14px]">
            <label className="input-title" htmlFor="country">
              Country
            </label>
            <input
              className="input-box"
              id="country"
              name="country"
              type="text"
              placeholder="Enter country name"
              {...register("country", {
                required: {
                  value: true,
                  message: "Country is Required",
                },
              })}
            />
            <label className="">
              {errors.country?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.country.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-[14px]">
            <label className="input-title" htmlFor="city">
              City
            </label>
            <input
              className="input-box"
              id="city"
              name="city"
              type="text"
              placeholder="Enter city name"
              {...register("city", {
                required: {
                  value: true,
                  message: "City is Required",
                },
              })}
            />
            <label className="">
              {errors.city?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.city.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-[14px]">
            <label className="input-title" htmlFor="postal">
              Postal Code
            </label>
            <input
              className="input-box"
              id="postal"
              name="postal"
              type="text"
              placeholder="Enter postal code"
              {...register("postal", {
                required: {
                  value: true,
                  message: "Postal code is Required",
                },
              })}
            />
            <label className="">
              {errors.city?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.city.message}
                </span>
              )}
            </label>
          </div>
        </div>

        {!changePassword && <button
          onClick={(e) => {e.preventDefault(),setChangePassword(true)}}
          className="mb-[18px] w-full h-[48px] text-[#159947] font-[Gilroy-semibold] rounded-[8px] border-[1px] border-[#159947] flex justify-center items-center hover:text-[#FFFFFF] hover:bg-[#159947]"
        >
          Change Password
        </button>}

       {changePassword && <div>
          <div className="mb-[14px]">
            <label className="input-title" htmlFor="password">
              Password
            </label>
            <input
              className="input-box"
              id="password"
              name="password"
              type="password"
              placeholder="Enter current password"
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
            <label className="input-title" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="input-box"
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter a new password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "New Password is Required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters or longer",
                },
              })}
            />
            <label className=" mb-0 pb-0">
              {errors.newPassword?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
              {errors.newPassword?.type === "minLength" && (
                <span className="label-text-alt text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </label>
          </div>

          <div className="mb-[14px]">
            <label className="input-title" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="input-box"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
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
        </div>}

        <div className=" flex justify-end gap-x-[12px]">
          <button onClick={(e)=>{
            e.preventDefault(), setChangePassword(false);
          }} className="w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px]">
            Cancel
          </button>
          <button
            type="submit"
            className="w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
