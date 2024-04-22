import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import HomePage from "../Pages/Home/Home/HomePage/HomePage";
import Login from "../Pages/Auth/Login/Login";
import OwnerRegister from "../Pages/Auth/Owner/OwnerRegister/OwnerRegister";
import Register from "../Pages/Auth/User/Register/Register";
import MembershipCards from "../Pages/MembershipCards/MembershipCards";
import ForgetPassword from "../Pages/Auth/ForgetPassword/ForgetPassword";
import ForgetPasswordOtp from "../Pages/Auth/ForgetPassword/ForgetPasswordOtp";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";

import SearchResultHotel from "../Pages/Home/SearchResultHotel/SearchResultHotel";
import BookingPreview from "../Pages/Home/BookingPreview/BookingPreview";
// import PropertyAdd from "../Pages/Owner/PropertyAdd/PropertyAdd";
import DashboardOwnerPropertyAdd from "../Pages/Dashboard/PropertyManagement/OwnerPropertyAdd";
import OwnerPropertyAdd from "../Pages/Owner/PropertyAdd/OwnerPropertyAdd";
// import RoomAdd from "../Pages/Owner/RoomAdd/RoomAdd";
import PropertyRoomAdd from "../Pages/Owner/PropertyRoomAdd/PropertyRoomAdd";
import OwnerRoomAdd from "../Pages/Dashboard/RoomManagement/OwnerRoomAdd";
import Country from "../Pages/Dashboard/Admin/SoftwareSetup/Country/Country";

import CountryList from "../Pages/Dashboard/Admin/SoftwareSetup/Country/CountryList"
import CountryAdd from "../Pages/Dashboard/Admin/SoftwareSetup/Country/CountryAdd"

import OtpPhoneVerification from "../Pages/Auth/Verification/OtpVerification/OtpPhoneVerification";
import OtpEmailVerification from "../Pages/Auth/Verification/OtpVerification/OtpEmailVerification";
import CountryEdit from "../Pages/Dashboard/Admin/SoftwareSetup/Country/CountryEdit";
import Division from "../Pages/Dashboard/Admin/SoftwareSetup/City/Division";
import DivisionList from "../Pages/Dashboard/Admin/SoftwareSetup/City/DivisionList";
import DivisionAdd from "../Pages/Dashboard/Admin/SoftwareSetup/City/DivisionAdd";
import DivisionEdit from "../Pages/Dashboard/Admin/SoftwareSetup/City/DivisionEdit";

import Area from "../Pages/Dashboard/Admin/SoftwareSetup/Area/Area";
import AreaList from "../Pages/Dashboard/Admin/SoftwareSetup/Area/AreaList";
import AreaAdd from "../Pages/Dashboard/Admin/SoftwareSetup/Area/AreaAdd";
import AreaEdit from "../Pages/Dashboard/Admin/SoftwareSetup/Area/AreaEdit";

import DistrictInfo from "../Pages/Dashboard/Admin/SoftwareSetup/District/DistrictInfo";
import DistrictList from "../Pages/Dashboard/Admin/SoftwareSetup/District/DistrictList";
import DistrictAdd from  "../Pages/Dashboard/Admin/SoftwareSetup/District/DistrictAdd";
import DistrictEdit from "../Pages/Dashboard/Admin/SoftwareSetup/District/DistrictEdit";
import HotelDetails from "../Pages/Home/HotelDetails/HotelDetails";

import Profile from "../Pages/Dashboard/Profile/Profile";
import EditProfile from "../Pages/Dashboard/Profile/EditProfile";

import ProtectedRoute from "../Layout/ProtectedRoute";

import NotFound from "../Pages/NotFound/NotFound";
import Membership from "../Pages/Dashboard/Admin/SoftwareSetup/Membership/Membership";
import MembershipList from "../Pages/Dashboard/Admin/SoftwareSetup/Membership/MembershipList";
import MembershipAdd from "../Pages/Dashboard/Admin/SoftwareSetup/Membership/MembershipAdd";
import MembershipEdit from "../Pages/Dashboard/Admin/SoftwareSetup/Membership/MembershipEdit";

import PaymentSystems from "../Pages/Dashboard/Admin/SoftwareSetup/Payment/PaymentSystems"
import PaymentSystemsList from "../Pages/Dashboard/Admin/SoftwareSetup/Payment/PaymentSystemsList";
import PaymentAdd from "../Pages/Dashboard/Admin/SoftwareSetup/Payment/PaymentAdd";
import PaymentEdit from "../Pages/Dashboard/Admin/SoftwareSetup/Payment/PaymentEdit";
import AmenitiesCategories from "../Pages/Dashboard/Admin/SoftwareSetup/AmenitiesCategories/AmenitiesCategories";
import AmenitiesCategoryList from "../Pages/Dashboard/Admin/SoftwareSetup/AmenitiesCategories/AmenitiesCategoryList";
import AddAmenitiesCategory from "../Pages/Dashboard/Admin/SoftwareSetup/AmenitiesCategories/AddAmenitiesCategory";
import EditAmenitiesCategory from "../Pages/Dashboard/Admin/SoftwareSetup/AmenitiesCategories/EditAmenitiesCategory";
import Amenities from "../Pages/Dashboard/Admin/SoftwareSetup/Amenities/Amenities";
import AmenitiesList from "../Pages/Dashboard/Admin/SoftwareSetup/Amenities/AmenitiesList";
import AddAmenities from "../Pages/Dashboard/Admin/SoftwareSetup/Amenities/AddAmenities";
import EditAmenities from "../Pages/Dashboard/Admin/SoftwareSetup/Amenities/EditAmenities";

import AboutUs from "../Pages/CompanyInformation/AboutUs/AboutUs";
import Blog from "../Pages/CompanyInformation/Blog/Blog";
import Team from "../Pages/CompanyInformation/Team/Team";
import TermAndConditions from "../Pages/CompanyInformation/TermAndConditions/TermAndConditions";
import PrivacyPolicy from "../Pages/CompanyInformation/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "../Pages/CompanyInformation/RefundPolicy/RefundPolicy";
import FrequentlyAskedQuestions from "../Pages/CompanyInformation/FAQ/FrequentlyAskedQuestions";
import GuestPolicy from "../Pages/CompanyInformation/GuestPolicy/GuestPolicy";
import Legal from "../Pages/CompanyInformation/Legal/Legal";
import EarnWithChutyrooms from "../Pages/CompanyInformation/EarnWithChutyrooms/EarnWithChutyrooms";
import PropertyList from "../Pages/Dashboard/PropertyManagement/PropertyList/PropertyList";

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
            path: "hotel-details",
            element: <HotelDetails></HotelDetails>,
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
            element: <OwnerPropertyAdd></OwnerPropertyAdd>,
          },
          {
            path: "room-add",
            element: <PropertyRoomAdd></PropertyRoomAdd>,
          },

          {
            path: "about-us",
            element: <AboutUs></AboutUs>,
          },
          {
            path: "blog",
            element: <Blog></Blog>,
          },
          {
            path: "team",
            element: <Team></Team>,
          },
          {
            path: "term-and-conditions",
            element: <TermAndConditions></TermAndConditions>,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy></PrivacyPolicy>,
          },
          {
            path: "refund-policy",
            element: <RefundPolicy></RefundPolicy>,
          },
          {
            path: "faq",
            element: <FrequentlyAskedQuestions></FrequentlyAskedQuestions>,
          },
          {
            path: "guest-policy",
            element: <GuestPolicy></GuestPolicy>,
          },
          {
            path: "legal",
            element: <Legal></Legal>,
          },
          {
            path: "earn-with-chutyrooms",
            element: <EarnWithChutyrooms></EarnWithChutyrooms>,
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard></Dashboard>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome></DashboardHome>,
          },
          {
            path: "/dashboard/profile",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/edit-profile",
            element: <EditProfile></EditProfile>,
          },
          {
            path: "/dashboard/property-add",
            element: <DashboardOwnerPropertyAdd></DashboardOwnerPropertyAdd>,
          },
          {
            path: "/dashboard/property-list",
            element: <PropertyList></PropertyList>,
          },
          {
            path: "/dashboard/room-add",
            element: <OwnerRoomAdd></OwnerRoomAdd>,
          },
          {
            path: "/dashboard/country",
            element: <Country></Country>,
            children: [
              {
                path: "/dashboard/country",
                element: <CountryList></CountryList>,
              },
              {
                path: "/dashboard/country/countryAdd",
                element: <CountryAdd></CountryAdd>,
              },
              {
                path: "/dashboard/country/countryEdit/:id",
                element: <CountryEdit></CountryEdit>,
              },
            ],
          },

          {
            path: "/dashboard/division",
            element: <Division></Division>,
            children: [
              {
                path: "/dashboard/division",
                element: <DivisionList></DivisionList>,
              },

              {
                path: "/dashboard/division/divisionAdd",
                element: <DivisionAdd></DivisionAdd>,
              },

              {
                path: "/dashboard/division/divisionEdit/:id",
                element: <DivisionEdit></DivisionEdit>,
              },
            ],
          },

          {
            path: "/dashboard/district",
            element: <DistrictInfo></DistrictInfo>,
            children: [
              {
                path: "/dashboard/district",
                element: <DistrictList></DistrictList>,
              },

              {
                path: "/dashboard/district/districtAdd",
                element: <DistrictAdd></DistrictAdd>,
              },

              {
                path: "/dashboard/district/districtEdit/:id",
                element: <DistrictEdit></DistrictEdit>,
              },
            ],
          },

          {
            path: "/dashboard/Area",
            element: <Area></Area>,
            children: [
              {
                path: "/dashboard/Area",
                element: <AreaList></AreaList>,
              },

              {
                path: "/dashboard/Area/AreaAdd",
                element: <AreaAdd></AreaAdd>,
              },

              {
                path: "/dashboard/Area/AreaEdit/:id",
                element: <AreaEdit></AreaEdit>,
              },
            ],
          },

          {
            path: "/dashboard/Membership",
            element: <Membership></Membership>,
            children: [
              {
                path: "/dashboard/Membership",
                element: <MembershipList></MembershipList>,
              },

              {
                path: "/dashboard/Membership/MembershipAdd",
                element: <MembershipAdd></MembershipAdd>,
              },

              {
                path: "/dashboard/Membership/MembershipEdit/:id",
                element: <MembershipEdit></MembershipEdit>,
              },
            ],
          },

          {
            path: "/dashboard/PaymentSystems",
            element: <PaymentSystems></PaymentSystems>,
            children: [
              {
                path: "/dashboard/PaymentSystems",
                element: <PaymentSystemsList></PaymentSystemsList>,
              },

              {
                path: "/dashboard/PaymentSystems/PaymentSystemAdd",
                element: <PaymentAdd></PaymentAdd>,
              },

              {
                path: "/dashboard/PaymentSystems/PaymentEdit/:id",
                element: <PaymentEdit></PaymentEdit>,
              },
            ],
          },

          {
            path: "/dashboard/AmenitiesCategories",
            element: <AmenitiesCategories></AmenitiesCategories>,
            children: [
              {
                path: "/dashboard/AmenitiesCategories",
                element: <AmenitiesCategoryList></AmenitiesCategoryList>,
              },

              {
                path: "/dashboard/AmenitiesCategories/AddAmenitityCategory",
                element: <AddAmenitiesCategory></AddAmenitiesCategory>,
              },

              {
                path: "/dashboard/AmenitiesCategories/AmenitiesCategoryEdit/:id",
                element: <EditAmenitiesCategory></EditAmenitiesCategory>,
              },
            ],
          },

          {
            path: "/dashboard/Amenities",
            element: <Amenities></Amenities>,
            children: [
              {
                path: "/dashboard/Amenities",
                element: <AmenitiesList></AmenitiesList>
              },
              {
                path: "/dashboard/Amenities/AddAmenities",
                element: <AddAmenities></AddAmenities>
              },

              {
                path: "dashboard/Amenities/EditAmenities/:id",
                element: <EditAmenities></EditAmenities>
              }
            ],
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
