import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const token = useSelector(useCurrentToken);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
