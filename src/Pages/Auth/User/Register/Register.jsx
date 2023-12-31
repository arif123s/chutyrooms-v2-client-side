import { useNavigate } from "react-router-dom";
// import selectBoxIcon from "../../../assets/icons/rectangle-select-box.svg";
import fbIcon from "../../../../assets/icons/facebook-login.svg";
import googleIcon from "../../../../assets/icons/google-login.svg";

const Register = () => {

const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

    return (
      <div className="login-container">
        <h2 className="login-title">Registration</h2>

        <form>
          {/* <div className="mb-4">
            <label className="input-title" htmlFor="userId">
              User ID
            </label>
            <input
              className="input-box"
              id="userId"
              name="userId"
              type="text"
              placeholder="Enter your user id"
            />
          </div> */}

          <div className="mb-4">
            <label className="input-title" htmlFor="name">
              Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
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
              placeholder="Enter your valid email"
            />
          </div>

          <div className="mb-4">
            <label className="input-title" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="input-box"
              id="phone"
              name="phone"
              type="number"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="input-title" htmlFor="confirmPassword">
             Confirm Password
            </label>
            <input
              className="input-box"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <div className="flex items-center mt-3 text-[12px] lg:text-[14px] mb-[20px]">
            {/* <img className="w-[12px] mr-2" src={selectBoxIcon} alt="" /> */}
            <input
              className="w-[12px] mr-2 text-[]"
              type="checkbox"
              name="terms"
              id="terms"
            />

            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}I
              agree to Chutyrooms's{" "}
              <a className="text-[#159947]">Terms and conditions</a>
            </p>
          </div>

          <input type="submit" className="login-btn" value="Register" />
        </form>

        <div className="flex mt-[20px] items-center mx-0 md:mx-8 lg:mx-8">
          <hr className="w-full bg-[#C6C6C6] h-[1px]" />
          <span className="mx-4 text[14px]">Or</span>
          <hr className="w-full bg-[#C6C6C6] h-[1px]" />
        </div>

        <div className="flex my-[20px] justify-center gap-4">
          <img className="social-login-icon" src={fbIcon} alt="" />
          <img className="social-login-icon" src={googleIcon} alt="" />
        </div>

        <div className="text-center">
          <p className="text-[16px]">
            Already registered?{" "}
            <a
              onClick={navigateToLogin}
              className="text-[#159947] hover:cursor-pointer"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    );
};

export default Register;