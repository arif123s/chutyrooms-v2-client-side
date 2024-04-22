
const GuestPolicy = () => {
    return (
      <div className="my-[20px] md:my-[36px] lg:my-[50px] text-[14px] md:text-[16px] lg:text-[16px] px-[8px]">
        <div className="custom-container p-[12px] md:p-[20px] lg:p-[20px] bg-white rounded-[8px]">
          <h2 className="text-[18px] md:text-[24px] lg:text-[24px] font-['Gilroy-semibold'] mb-[18px]">
            Guest Policy
          </h2>

          <p className="mb-[18px]">
            The largest, most trusted, and fastest growing hospitality partner
            in Bangladesh.
          </p>

          <p className="mb-[18px]">
            Last updated :{" "}
            <span className="text-[#020F07] font-['Gilroy-semibold']">
              April 1, 2023
            </span>
          </p>

          <div className="mb-[18px]">
            <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
              Guest:
            </h2>
            <div className="flex flex-col gap-[4px]">
              <p>
                1. All guests must present any of their valid photo,
                NID/Passport, or driving license at the time of check-in.
              </p>
              <p>2. Check-in and check-out times depend on hotel policy.</p>
              <p>
                3. Outside food, beverages, and alcohol are totally prohibited
                on the hotel premises (depending on individual hotel policies).
              </p>
              <p>
                4. Outside guests are not allowed in the room (it depends on
                individual hotel policies).
              </p>
              <p>
                5. Pets are not allowed and totally prohibited in the hotel or
                resort.
              </p>
              <p>
                6. Smoking is not allowed in the room or on hotel premises
                (depending on individual hotel policies).
              </p>
              <p>
                7. In the refund case, we should refund within{" "}
                <span className="text-[#020F07] font-['Gilroy-semibold']">
                  {" "}
                  7 to 10 working days.
                </span>
              </p>
              <p>
                8. After reaching the hotel, if you face any difficulties or
                need any assistance, you are requested to contact us
                immediately.
              </p>
              <p>
                9. ChutyRooms will not be liable for compensation beyond your
                booking payment.
              </p>
              <p>
                10. The refund amount will be subject to the severity of the
                issues and will be decided as per our guidelines.
              </p>
              <p>
                11. Please keep the hotel room in good condition and maintain
                hygiene and clean lines.
              </p>
              <p>
                12. You may be held liable for any damage to hotel assets
                (except normal wear and tear).
              </p>
              <p>
                13. For your own safety, please follow fire safety and emergency
                procedures.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default GuestPolicy;