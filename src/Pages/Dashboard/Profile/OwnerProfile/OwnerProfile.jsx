import userImg from "../../../../assets/icons/user.svg";
import location from "../../../../assets/icons/map-pin.svg";
import edit from "../../../../assets/icons/edit-black.svg";
import arrowRight from "../../../../assets/icons/arrow-left-black.svg";
import password from "../../../../assets/icons/password.svg";
import information from "../../../../assets/icons/information.svg";
import { Link } from "react-router-dom";

const OwnerProfile = () => {

  return (
    <div className="m-[12px] md:m-[24px] lg:m-[24px]  bg-white rounded-[8px] p-[12px] md:p-[16px] lg:p-[22px] min-h-[700px]">
      <div className="flex items-start md:items-center lg:items-center lg:w-8/12">
        <img
          className="w-[54px] md:w-[60px] lg:w-[70px] mr-[4px] md:mr-[8px] lg:mr-[12px]"
          src={userImg}
          alt="Profile"
        />
        <div>
          <h2 className="text-[18px] md:text-[18px] lg:text-[20px] font-[Gilroy-semibold]">
            Anisur Rahman
          </h2>
          <div className="flex items-start gap-[2px] lg:gap-[4px] mt-[2px]">
            <img className="mt-[2px]" src={location} alt="" />
            <span className="hotel-info opacity-90">
              Halishahar, Chittagong, Bangladesh
            </span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-[#E6E7E6] my-[24px]" />

      <Link
        to={"/dashboard/owner-profile-edit"}
        className="flex justify-between "
      >
        <div className="flex gap-[8px]">
          <img src={edit} alt="" />
          <p>Edit Profile</p>
        </div>
        <img src={arrowRight} alt="" />
      </Link>

      <div className="h-[1px] bg-[#E6E7E6] my-[24px]" />

      <Link
        to={"/dashboard/owner-change-password"}
        className="flex justify-between"
      >
        <div className="flex gap-[8px]">
          <img src={password} alt="" />
          <p>Change Password</p>
        </div>
        <img src={arrowRight} alt="" />
      </Link>

      <div className="h-[1px] bg-[#E6E7E6] my-[24px]" />

      <Link
        to={"/privacy-policy"}
        className="flex justify-between"
      >
        <div className="flex gap-[8px]">
          <img src={information} alt="" />
          <p>Information</p>
        </div>
        <img src={arrowRight} alt="" />
      </Link>
    </div>
  );
};

export default OwnerProfile;
