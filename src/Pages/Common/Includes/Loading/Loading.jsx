// import { CircularProgress } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
    return (
      <div className="min-h-screen flex mt-[200px] justify-center">
        {/* <CircularProgress color="success" /> */}
        {/* <div className="w-16 h-16 border-b-2  border-gray-900 rounded-full animate-spin"></div> */}
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
};

export default Loading;