
const ResetPassword = () => {
    return (
      <div className="login-container">
        <h2 className="login-title font-['Gilroy-semibold']">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label className="input-title" htmlFor="password">
              New Password
            </label>
            <input
              // className="input-box"
              className={` ${
                errors.password?.type === "required"
                  ? "input-box input-error"
                  : "input-box"
              }`}
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

          <input type="submit" className="login-btn" value="Reset Password" />
        </form>
      </div>
    );
};

export default ResetPassword;