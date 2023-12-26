import { useEffect, useState } from "react";
import "./OtpVerification.css";

const OtpVerification = () => {

  const [otp, setOtp] = useState(["", "", "", "","",""]);
 const [seconds, setSeconds] = useState(60);

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
    }
  };

  return (
    <div className="otp-container">
      <h2 className="text-[16px] lg:text-[18px] font-semibold text-center">
        A verification code send to your Phone or Email
      </h2>
      <div>
        <p className="rounded-[8px] bg-[#E8F5ED] text-[#159947] w-[88px] h-[48px] m-auto flex justify-center items-center my-[20px] text-[14px] lg:text-[16px] ">
          00: <span>{formatSeconds(seconds)}</span>
        </p>

        <div className="flex justify-center gap-4 mb-[20px]">
          {otp.map((digit, index) => (
            <input
              className={`w-[20px] h-[15px]  text-center text-[14x] lg:text-[16px] focus:outline-none border-b-[1px] border-black`}
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}

          {/* <input
            className="w-[20px] h-[15px] border-b-[1px] border-black text-center text-[16px]"
            type="text"
            value={6}
          />
          <input
            className="w-[20px] h-[15px] border-b-[1px] border-black text-center text-[16px]"
            type="text"
            value={6}
          />
          <input
            className="w-[20px] h-[15px] border-b-[1px] border-black text-center text-[16px]"
            type="text"
            value={6}
          />
          <input
            className="w-[20px] h-[15px] border-b-[1px] border-black text-center text-[16px]"
            type="text"
            value={6}
          />
          <input
            className="w-[20px] h-[15px] border-b-[1px] border-black text-center text-[16px]"
            type="text"
            value={6}
          />
          <input
            className="w-[20px] h-[15px] border-b-[1px] border-black text-center text-[16px]"
            type="text"
            value={6}
          /> */}
        </div>

        <button className="login-btn">Submit</button>

        <p className="text-[14px] lg:text-[16px] mt-[16px] text-center">
          Resend Code
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
