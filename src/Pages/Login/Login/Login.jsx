import { Form } from "react-router-dom";
import selectBoxIcon from "../../../assets/icons/rectangle-select-box.svg";
import "./login.css"

const Login = () => {
    return (
      <div className="login-container">
        <h2 className="login-title">Sign In</h2>

        <Form>
          <div className="mb-4">
            <label className="input-title" htmlFor="phone">
              Phone/Email
            </label>
            <input
              className="input-box"
              type="text"
              placeholder="Enter your phone number or email"
            />
          </div>
          <div className="mb-4">
            <label className="input-title" htmlFor="phone">
              Password
            </label>
            <input
              className="input-box"
              type="password"
              placeholder="Enter a password"
            />
          </div>

          <div className="flex justify-between mt-3 text-[14px] mb-[20px]">
            <div className="flex items-center">
              <img className="w-[12px] mr-2" src={selectBoxIcon} alt="" />
              <span>Remember me?</span>
            </div>

            <p className="text-[#159947]">Forgot Password?</p>
          </div>

          <input type="submit" className="login-btn" value="Sign In" />
          {/* <button className="login-btn">Sign In</button> */}
        </Form>
      </div>
    );
};

export default Login;