import { useEffect, useState } from "react";
import "./OtpVerification.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  // const [otp, setOtp] = useState([]);
  const [seconds, setSeconds] = useState(60);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue from useForm
  } = useForm();
  const userInfo = useSelector((state) => state.user.otpInfo);
  const [otpError,setOtpError]=useState(false)


  useEffect(() => {
    // Exit the useEffect if the timer reaches 0
    if (seconds === 0) return;

    // Decrease the timer every second
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds - 1 >= 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [seconds]);

  // Helper function to format seconds as double digits
  const formatSeconds = (sec) => (sec < 10 ? `0${sec}` : sec);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    // Move to the next input field automatically
    if (e.target.value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
    // setValue(`otp${index}`, e.target.value); // Update value using setValue
  };

  const handleBackspace = (e, index) => {
    const newOtp = [...otp];

    // Move to the previous input field if backspacing in an empty field
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }

    // Clear the current input field on backspace
    if (e.key === "Backspace") {
      newOtp[index] = "";
      setOtp(newOtp);
      // setValue(`otp${index}`, ""); // Update value using setValue
    }
  };
 console.log(userInfo);
  const onSubmit = () => {
    const concatOtp = otp.join("");
   
    const userOtp = userInfo?.data?.otp;
    console.log(userOtp);
    if (userOtp == concatOtp) {
      console.log("matched");
      setOtpError(false)
      navigate("/property-add");
    } else setOtpError(true);
  };

  return (
    <div className="otp-container">
      <h2 className="text-[16px] lg:text-[18px] font-semibold text-center">
        A verification code send to your Phone or Email
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="rounded-[8px] bg-[#E8F5ED] text-[#159947] w-[88px] h-[48px] m-auto flex justify-center items-center my-[20px] text-[14px] lg:text-[16px] ">
          00: <span>{formatSeconds(seconds)}</span>
        </p>

        <div className="flex justify-center gap-4 mb-[20px]">
          {otp.map((digit, index) => (
          // {[0,1,2,3].map((digit, index) => (
            <input
              className={`w-[20px] h-[15px]  text-center text-[14x] lg:text-[16px] focus:outline-none border-b-[1px] border-black`}
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              required
              // {...register('otp', { required: true })}
            />
          ))}
        </div>

        {errors.otp0 && ( // Checking if all fields are empty
            <p className="label-text-alt text-red-500 text-center mb-2">
              All fields are required.
            </p>
          )}

        {otpError && ( // Checking if all fields are empty
          <p className="label-text-alt text-red-500 text-center mb-2">
            Invalid otp code
          </p>
        )}

        <button disabled={seconds === 0} type="submit" className="login-btn">
          Submit
        </button>

        <p className="text-[14px] lg:text-[14px] mt-[16px] text-center cursor-default hover:text-[#159947]">
          Resend Code
        </p>
      </form>
    </div>
  );
};

export default OtpVerification;
