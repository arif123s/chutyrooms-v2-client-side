import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
      <div className="min-h-screen flex mt-[250px] justify-center">
        <CircularProgress color="success" />
      </div>
    );
};

export default Loading;