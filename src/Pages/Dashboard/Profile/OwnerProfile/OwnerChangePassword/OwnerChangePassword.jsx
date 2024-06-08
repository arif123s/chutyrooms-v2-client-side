import { useState } from "react";
import { useForm } from "react-hook-form";

const OwnerChangePassword = () => {
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();
     const [passErrorMessage, setPassErrorMessage] = useState(false);

      const onSubmit = () => {}; 

    return (
      <div className="m-[12px] md:m-[24px] lg:m-[24px]">
         <form
          className="lg:w-8/12 p-[12px] md:p-[20px] lg:p-[20px] rounded-[8px] bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="login-title">Change Password</h2>
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
          <div className=" flex justify-end gap-x-[12px]">
            <button
              // onClick={(e) => {
              //   e.preventDefault(), setChangePassword(false);
              // }}
              className="w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px] flex items-center justify-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
};

export default OwnerChangePassword;