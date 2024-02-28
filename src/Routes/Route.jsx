import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import HomePage from "../Pages/Home/Home/HomePage/HomePage";
import Login from "../Pages/Auth/Login/Login";
import OwnerRegister from "../Pages/Auth/Owner/OwnerRegister/OwnerRegister";
import Register from "../Pages/Auth/User/Register/Register";
import MembershipCards from "../Pages/Home/Home/MembershipCards/MembershipCards";
import ForgetPassword from "../Pages/Auth/ForgetPassword/ForgetPassword";
import ForgetPasswordOtp from "../Pages/Auth/ForgetPassword/ForgetPasswordOtp";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";

import SearchResultHotel from "../Pages/Home/SearchResultHotel/SearchResultHotel";
import BookingPreview from "../Pages/Home/BookingPreview/BookingPreview";
import PropertyAdd from "../Pages/Owner/PropertyAdd/PropertyAdd";
import NotFound from "../Pages/NotFound/NotFound";
import RoomAdd from "../Pages/Owner/RoomAdd/RoomAdd";
import Country from "../Pages/Dashboard/SoftwareSetup/Country/Country";
import CountryList from "../Pages/Dashboard/SoftwareSetup/Country/countrylist";
import CountryAdd from "../Pages/Dashboard/SoftwareSetup/Country/CountryAdd";

import OtpPhoneVerification from "../Pages/Auth/Verification/OtpVerification/OtpPhoneVerification";
import OtpEmailVerification from "../Pages/Auth/Verification/OtpVerification/OtpEmailVerification";
import CountryEdit from "../Pages/Dashboard/SoftwareSetup/Country/CountryEdit";
import Division from "../Pages/Dashboard/SoftwareSetup/City/Division";
import DivisionList from "../Pages/Dashboard/SoftwareSetup/City/DivisionList";
import DivisionAdd from "../Pages/Dashboard/SoftwareSetup/City/DivisionAdd";
import DivisionEdit from "../Pages/Dashboard/SoftwareSetup/City/DivisionEdit";

import Area from "../Pages/Dashboard/SoftwareSetup/Area/Area";
import AreaList from "../Pages/Dashboard/SoftwareSetup/Area/AreaList";
import AreaAdd from "../Pages/Dashboard/SoftwareSetup/Area/AreaAdd";
import AreaEdit from "../Pages/Dashboard/SoftwareSetup/Area/AreaEdit";

import DistrictInfo from "../Pages/Dashboard/SoftwareSetup/District/DistrictInfo";
import DistrictList from "../Pages/Dashboard/SoftwareSetup/District/DistrictList";
import DistrictAdd from  "../Pages/Dashboard/SoftwareSetup/District/DistrictAdd";
import DistrictEdit from "../Pages/Dashboard/SoftwareSetup/District/DistrictEdit";
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
            path: "otp-phone",
            element: <OtpPhoneVerification></OtpPhoneVerification>,
          },
          {
            path: "otp-email",
            element: <OtpEmailVerification></OtpEmailVerification>,
          },
          {
            path: "forget-password",
            element: <ForgetPassword></ForgetPassword>,
          },
          {
            path: "forget-password-otp",
            element: <ForgetPasswordOtp></ForgetPasswordOtp>,
          },
          {
            path: "reset-password",
            element: <ResetPassword></ResetPassword>,
          },
          {
            path: "membership",
            element: <MembershipCards></MembershipCards>,
          },
          {
            path: "search-result-hotel",
            element: <SearchResultHotel></SearchResultHotel>,
          },
          {
            path: "booking-preview",
            element: <BookingPreview></BookingPreview>,
          },
          // {
          //   path: "/email/verify/:user/:token",
          //   element: <EmailVerification></EmailVerification>,
          // },
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
          {
            path: "/dashboard/country",
            element: <Country></Country>,
            children:[
             { 
              path:"/dashboard/country",
              element:<CountryList></CountryList>,
            },
             { 
              path:"/dashboard/country/countryAdd",
              element:<CountryAdd></CountryAdd>,
            },
            {
              path:"/dashboard/country/countryEdit/:id",
              element:<CountryEdit></CountryEdit>
            }
            ]
          },

          {
            path: "/dashboard/division",
            element: <Division></Division>,
            children:[
              { 
               path:"/dashboard/division",
               element:<DivisionList></DivisionList>,
             },

             { 
              path:"/dashboard/division/divisionAdd",
              element:<DivisionAdd></DivisionAdd>,
            },

            { 
              path:"/dashboard/division/divisionEdit/:id",
              element:<DivisionEdit></DivisionEdit>,
            },
             
             ]

          },

        

        {
            path: "/dashboard/district",
            element: <DistrictInfo></DistrictInfo>,
            children:[
              { 
               path:"/dashboard/district",
               element:<DistrictList></DistrictList>,
             },

             { 
              path:"/dashboard/district/districtAdd",
              element:<DistrictAdd></DistrictAdd>,
            },

            { 
              path:"/dashboard/district/districtEdit/:id",
              element:<DistrictEdit></DistrictEdit>,
            },



            

        
             
             ]

          },  


          {
            path: "/dashboard/Area",
            element: <Area></Area>,
            children:[
              { 
               path:"/dashboard/Area",
               element:<AreaList></AreaList>,
             },

             { 
              path:"/dashboard/Area/AreaAdd",
              element:<AreaAdd></AreaAdd>,
            },

            { 
              path:"/dashboard/Area/AreaEdit/:id",
              element:<AreaEdit></AreaEdit>,
            },



            

        
             
             ]

          },  


         
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
