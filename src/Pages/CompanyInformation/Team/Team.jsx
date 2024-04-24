
const Team = () => {
    return (
      <div className="my-[20px] md:my-[36px] lg:my-[50px] text-[14px] md:text-[16px] lg:text-[16px] px-[8px]">
        <div className="custom-container p-[12px] md:p-[20px] lg:p-[20px] bg-white rounded-[8px]">
          <h2 className="text-[18px] md:text-[24px] lg:text-[24px] font-['Gilroy-semibold'] mb-[18px]">
            Team
          </h2>

          <p className="mb-[18px]">
            The largest, most trusted, and fastest growing hospitality partner
            in Bangladesh.
          </p>

          <p className="mb-[18px]">
            Last updated : {" "}
            <span className="text-[#020F07] font-['Gilroy-semibold']">
              April 1, 2023
            </span>
          </p>

        </div>
      </div>
    );
};

export default Team;