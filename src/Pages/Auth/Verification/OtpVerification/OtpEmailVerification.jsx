import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Common/Includes/Loading/Loading";
import { toast } from "react-toastify";
import { BASE_API } from "../../../../BaseApi/BaseApi";

const OtpEmailVerification = () => {

     const navigate = useNavigate();
     const [otp, setOtp] = useState(["", "", "", ""]);
     const [seconds, setSeconds] = useState(119); // Initial seconds set to 1 minute and 59 seconds
     const [expired, setExpired] = useState(false); // Initialize expired state
     const {
       handleSubmit,
       formState: { errors },
       reset,
     } = useForm();
    //  const userInfo = useSelector((state) => state.user.otpInfo);
     const [otpError, setOtpError] = useState({
       status: false,
       message: "",
     });
     const [loading, setLoading] = useState(false);
     // const [otpExpiresAt, setOtpExpiresAt] = useState("");

     const user = JSON.parse(sessionStorage.getItem("user"));
     // console.log(user);

     useEffect(() => {
       // const otpExpiresAt = userInfo?.data?.otp_expires_at;
       const otpExpiresAt = user?.otpExpiresAt;
       // setOtpExpiresAt(user.otpExpiresAt);
       // console.log("otpExpiresAt", otpExpiresAt);

       if (otpExpiresAt) {
         const expirationTime = new Date(otpExpiresAt); // Convert otp_expires_at to Date object

         const timer = setInterval(() => {
           const currentTime = new Date(); // Get current time
           const remainingSeconds = Math.floor(
             (expirationTime - currentTime) / 1000
           ); // Calculate remaining seconds

           // Check if the timer has expired
           if (remainingSeconds <= 0) {
             setExpired(true);
             clearInterval(timer);
             setSeconds(0); // Ensure seconds are set to 0 when expired
           } else {
             setSeconds(remainingSeconds); // Update seconds every second
           }
         }, 1000);

         // Clear timer on unmount
         return () => clearInterval(timer);
       } else {
         setSeconds(0);
       }
       // }, [userInfo]);
     }, [user]);

     // Helper function to format seconds as "mm:ss"
     const formatSeconds = (sec) => {
       const minutes = Math.floor(sec / 60);
       const remainingSeconds = sec % 60;
       return `${minutes < 10 ? "0" + minutes : minutes}:${
         remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
       }`;
     };

     if (loading) {
       return <Loading></Loading>;
     }

     // Helper function to format seconds as double digits
     // const formatSeconds = (sec) => (sec < 10 ? `0${sec}` : sec);

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

     // console.log(userInfo?.data);

     const handleResendCode = () => {
       setLoading(true);

       // get data
       fetch(`${BASE_API}/user/otp/verify/resend?user=${user.id}`)
      //  fetch(`http://127.0.0.1:8000/api/user/otp/verify/resend?user=${user.id}`)
         .then((res) => res.json())
         .then((data) => {
           setLoading(false);
           reset();
           console.log("data", data.data);
           // setOtpExpiresAt(data.data.otp_expires_at);
           // setSeconds[122];
           sessionStorage.setItem(
             "user",
             JSON.stringify({
               id: data.data.id,
               otpExpiresAt: data.data.otp_expires_at,
             })
           );
           window.location.reload();
         });
     };

     const onSubmit = () => {
       const concatOtp = parseInt(otp.join(""));
       setLoading(true);

       // setOtpError({ status: false, message: "" });

       // get data
       fetch( `${BASE_API}/user/email/verify?user=${user.id}&token=${concatOtp}`)
      //  fetch( `http://127.0.0.1:8000/api/user/email/verify?user=${user.id}&token=${concatOtp}`)
         .then((res) => res.json())
         .then((data) => {
           setLoading(false);
           if (data?.status === true) {
             console.log("data", data);
             localStorage.setItem("accessToken", data.accessToken);
             localStorage.setItem(
               "userInfo",
               JSON.stringify({
                 id: data?.data?.id,
                 accessToken: data?.accessToken,
                 name: data?.data?.name,
                 img: data?.data?.image,
                 role: data.data.roles[0],
               })
             );
             toast.success("Successfully registered!");
              if (data?.data?.roles[0]?.role_code == 345) {
                navigate("/");
              } else navigate("/dashboard");
              if (data?.data?.roles[0]?.role_code == 234) {
                // navigate("/dashboard/property-list");
                navigate("/property-add");
              }
           } else {
             setOtpError({ status: true, message: data.message });
             console.log(data);
           }
         });


     };

    return (
      <div className="otp-container">
        <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] text-center">
          A verification code send to your Phone or Email
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="rounded-[8px] bg-[#E8F5ED] text-[#159947] w-[88px] h-[48px] m-auto flex justify-center items-center my-[20px] text-[14px] lg:text-[16px] ">
            {expired ? "00:00" : formatSeconds(seconds)}
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

          {otpError.status && ( // Checking if all fields are empty
            <p className="label-text-alt text-red-500 text-center mb-2">
              {otpError.message}
            </p>
          )}

          <div className="w-[104px] mx-auto">
            <button
              // disabled={seconds === 0}
              type="submit"
              className="login-btn"
            >
              Submit
            </button>
          </div>

          <a
            onClick={handleResendCode}
            className="text-[13px] block mt-[8px] text-center cursor-default hover:text-[#159947]"
          >
            Resend Code
          </a>
        </form>
      </div>
    );
};

export default OtpEmailVerification;