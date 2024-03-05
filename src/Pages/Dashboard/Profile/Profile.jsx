import userImg from '../../../assets/icons/user.svg'
import location from '../../../assets/icons/map-pin.svg'
import editIcon from '../../../assets/icons/edit-icon.svg'
import platinumCard from "../../../assets/membership/platinum-card.png";
import goldCard from "../../../assets/membership/gold-card.png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

const navigate  = useNavigate();

    return (
      <div className="p-[24px] lg:w-8/12">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img className="w-[70px] mr-[12px]" src={userImg} alt="Profile" />
            <div>
              <h2 className="text-[20px] font-[Gilroy-semibold]">
                Anisur Rahman(Nasir bhai)
              </h2>
              <img src="" alt="" />
              <div className="flex items-center mt-[0px] gap-[6px]">
                <img src={location} alt="" />
                <span className="hotel-info opacity-90">
                  Halishahar, Chittagong, Bangladesh
                </span>
              </div>
            </div>
          </div>

          <img onClick={()=>navigate('/dashboard/edit-profile')} src={editIcon} alt="" />
        </div>

        <div className="mt-[24px]">
          <h2 className="text-[20px] font-[Gilroy-semibold]">
            Purchased Membership
          </h2>
          <div className="mt-[14px] ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
              <div className="card">
                <img
                  className="h-[240px]"
                  src={platinumCard}
                  alt="Platinum Card"
                />
                <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                  Flat 8% discount on every purchase
                </h2>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  Validation: 1 year
                </p>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
                  Tk 1500 tk
                </p>
              </div>

              <div className="card">
                <img className="h-[240px]" src={goldCard} alt="Gold Card" />
                <h2 className="text-[16px] lg:text-[18px] font-['Gilroy-semibold'] mt-[8px] lg:mt-[20px]">
                  Flat 4.5% discount on every purchase
                </h2>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px]">
                  Validation: 1 year
                </p>
                <p className="text-[14px] lg:text-[16px] mt-[6px] lg:mt-[12px] mb-[10px] lg:mb-[20px]">
                  Tk 1000 tk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;