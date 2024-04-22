
const Legal = () => {
    return (
      <div className="my-[20px] md:my-[36px] lg:my-[50px] text-[14px] md:text-[16px] lg:text-[16px] px-[8px]">
        <div className="custom-container p-[12px] md:p-[20px] lg:p-[20px] bg-white rounded-[8px]">
          <h2 className="text-[18px] md:text-[24px] lg:text-[24px] font-['Gilroy-semibold'] mb-[18px]">
            Legal
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

          <p className="mb-[18px]">
            ChutyRooms is registered and based in Bangladesh. ChutyRooms renders
            an online accommodation reservation service on its website and is
            supported internationally by its local group of companies.
          </p>

          <div className="mb-[18px]">
            <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
              ChutyRooms, all legal document numbers are listed below:
            </h2>
            <div className="flex flex-col gap-[4px]">
              <p>1. Trade License Number: 128415</p>
              <p>2. Tin certificate: 355769143004</p>
              <p>3. BIN: 004702902-0503</p>
              <p>4. Certificate of incorporation: CH-14178/2021</p>
              <p>5. Bank Name: City Bank Limited</p>
              <p>6. Bank A/C Number: 1223508807001</p>
              <p>7. Bank routing number: 225155927</p>
              <p>8. CCCI Membership Number: 0012862/2022-2023/408</p>
              <p>9. E-CAB Membership Number: 1936</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Legal;