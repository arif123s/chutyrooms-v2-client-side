import userImg from '../../../../assets/icons/user.svg'
import location from '../../../../assets/icons/map-pin.svg'
import editIcon from '../../../../assets/icons/edit-icon.svg'
import platinumCard from "../../../../assets/membership/platinum-card.png";
import goldCard from "../../../../assets/membership/gold-card.png";
import downloadApp from "../../../../assets/download-app.png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

const navigate  = useNavigate();

    return (
      <div className="p-[12px] md:p-[24px] lg:p-[24px] lg:pr-[40px] lg:w-9/12">
        <div className="flex justify-between items-start ">
          <div className="flex items-start md:items-center lg:items-center">
            <img
              className="w-[44px] md:w-[60px] lg:w-[70px] mr-[4px] md:mr-[8px] lg:mr-[12px]"
              src={userImg}
              alt="Profile"
            />
            <div>
              <h2 className="text-[16px] md:text-[16px] lg:text-[20px] font-[Gilroy-semibold]">
                Anisur Rahman
                <span className="font-[Gilroy-bold] text-red-500">
                  {" "}
                  (Nasir bhai)
                </span>
              </h2>
              <img src="" alt="" />
              <div className="flex items-start gap-[2px] lg:gap-[6px] mt-[2px]">
                <img className="mt-[2px]" src={location} alt="" />
                <span className="w-[140px] md:w-full lg:w-full hotel-info opacity-90">
                  Halishahar, Chittagong, Bangladesh
                </span>
              </div>
            </div>
          </div>

          <img
            className=" lg:mt-[10px]"
            onClick={() => navigate("/dashboard/edit-profile")}
            src={editIcon}
            alt=""
          />
        </div>

        <div className="h-[1px] bg-[#E6E7E6] my-[24px]" />

        <div className="my-[24px]">
          <h2 className="text-[16px] md:text-[16px] lg:text-[20px] font-[Gilroy-semibold]">
            Purchased Membership
          </h2>
          <div className="mt-[14px] ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              <div className="card-container">
                <img
                  className="card-img"
                  src={platinumCard}
                  alt="Platinum Card"
                />
                <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                  Flat 8% discount on every purchase
                </h2>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  Validation: 1 year
                </p>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  Tk 1500 tk
                </p>
              </div>

              <div className="card-container">
                <img className="card-img" src={goldCard} alt="Gold Card" />
                <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                  Flat 4.5% discount on every purchase
                </h2>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  Validation: 1 year
                </p>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  Tk 1000 tk
                </p>
              </div>
            </div>
          </div>
        </div>

        <img className=" w-full" src={downloadApp} alt="" />
      </div>
    );
};

export default Profile;