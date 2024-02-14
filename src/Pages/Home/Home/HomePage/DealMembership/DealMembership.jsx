import "./DealMembership.css";
import platinum from "../../../../../assets/membership/platinum.svg";
import gold from "../../../../../assets/membership/gold.svg";
import silver from "../../../../../assets/membership/silver.svg";

const DealMembership = () => {
    return (
      <div className="deal-membership-container">
        {/* <img className="membership-title-img" src={dealMembership} alt="" /> */}
        <div className="text-center h-[78px]">
          <span className="membership-title tracking-[2.88px] ">
            Deal
          </span>
          <span className="membership-title text-green-600 tracking-[2.88px]">
            Membership,
          </span>
          <span className="membership-title block">
            Get Discount!
          </span>
        </div>
        <div className="membership-cards">
          <img className="membership-card" src={platinum} alt="" />
          <img className="membership-card" src={gold} alt="" />
          <img className="membership-card" src={silver} alt="" />
        </div>
      </div>
    );
};

export default DealMembership;