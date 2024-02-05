import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import HomePage from "../Pages/Home/Home/HomePage/HomePage";
import Login from "../Pages/Auth/Login/Login";
import OwnerRegister from "../Pages/Auth/Owner/OwnerRegister/OwnerRegister";
import Register from "../Pages/Auth/User/Register/Register";
import PropertyAdd from "../Pages/Owner/PropertyAdd/PropertyAdd";
import NotFound from "../Pages/NotFound/NotFound";
import RoomAdd from "../Pages/Owner/RoomAdd/RoomAdd";
import OtpVerification from "../Pages/Auth/Verification/OtpVerification/OtpVerification";
import EmailVerification from "../Pages/Auth/Verification/EmailVerification/EmailVerification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/",
            element: <HomePage></HomePage>,
          },
          {
            path: "login",
            element: <Login></Login>,
          },
          {
            path: "register",
            element: <Register></Register>,
          },
          {
            path: "owner-register",
            element: <OwnerRegister></OwnerRegister>,
          },
          {
            path: "otp",
            element: <OtpVerification></OtpVerification>,
          },
          {
            path: "/email/verify/:user/:token",
            element: <EmailVerification></EmailVerification>,
          },
          {
            path: "property-add",
            element: <PropertyAdd></PropertyAdd>,
          },
          {
            path: "room-add",
            element: <RoomAdd></RoomAdd>,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome></DashboardHome>,
          },
          // {
          //   path: "/dashboard",
          //   element: <DashboardHome></DashboardHome>,
          // },
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
