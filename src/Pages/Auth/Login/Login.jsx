// import selectBoxIcon from "../../../assets/icons/rectangle-select-box.svg";
import fbIcon from "../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../assets/icons/google-login.svg";
import "./login.css"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };
    return (
      <div className="login-container">
        <h2 className="login-title">Sign In</h2>

        <form>
          <div className="mb-4">
            <label className="input-title" htmlFor="phone">
              Phone/Email
            </label>
            <input
              className="input-box"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number or email"
            />
          </div>

          <div className="">
            <label className="input-title" htmlFor="password">
              Password
            </label>
            <input
              className="input-box"
              id="password"
              name="password"
              type="password"
              placeholder="Enter a password"
            />
          </div>

          <div className="flex justify-between mt-3 text-[12px] lg:text-[14px] mb-[20px]">
            <div className="flex items-center">
              {/* <img className="w-[12px] mr-2" src={selectBoxIcon} alt="" /> */}
              <input
                className="w-[12px] mr-2 text-[]"
                type="checkbox"
                name="remember"
                id="remember"
              />
              <span>Remember me?</span>
            </div>

            <a className="text-[#159947]">Forgot Password?</a>
          </div>

          <input type="submit" className="login-btn" value="Sign In" />
          {/* <button className="login-btn">Sign In</button> */}
        </form>

        <div className="flex mt-[20px] items-center mx-0 md:mx-8 lg:mx-8">
          <hr className="w-full bg-[#C6C6C6] h-[1px]" />
          <span className="mx-4 text[14px]">Or</span>
          <hr className="w-full bg-[#C6C6C6] h-[1px]" />
        </div>

        <div className="flex my-[20px] justify-center gap-4">
          <img className="w-[30px]" src={fbIcon} alt="" />
          <img className="w-[30px]" src={googleIcon} alt="" />
        </div>

        <div className="text-center">
          <p className="text-[16px]">
            Don’t have an account?{" "}
            <a
              onClick={navigateToRegister}
              className="text-[#159947] hover:cursor-pointer"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    );
};

export default Login;                            