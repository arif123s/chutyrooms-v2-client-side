import arrowUpIcon from "../../../assets/icons/circle-arrow-up.svg";
import arrowDownIcon from "../../../assets/icons/circle-arrow-down.svg";
import { useState } from "react";

const FrequentlyAskedQuestions = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="my-[20px] md:my-[36px] lg:my-[50px] text-[14px] md:text-[16px] lg:text-[16px] px-[8px]">
      <div className="custom-container p-[12px] md:p-[20px] lg:p-[20px] bg-white rounded-[8px]">
        <h2 className="text-[18px] md:text-[24px] lg:text-[24px] font-['Gilroy-semibold'] mb-[18px]">
          FAQ of ChutyRooms
        </h2>

        {/* <div>
              <div
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center justify-between"
              >
                <p
                  className={`text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                    dropdown ? "text-[#008942]" : ""
                  }`}
                >
                  Where can I check my booking details and status?
                </p>
                {dropdown ? (
                  <img
                    className="w-[38px]"
                    src={arrowUpIcon}
                    alt="Arrow Up Icon"
                  />
                ) : (
                  <img
                    className="w-[38px]"
                    src={arrowDownIcon}
                    alt="Arrow Down Icon"
                  />
                )}
              </div>
              {dropdown && (
                <p className="mt-[18px]">
                  You can find details about the property in your confirmation
                  email or on the property detail page. For anything else, you
                  can also contact the property directly.
                </p>
              )}
            </div> */}
        <div className="lg:w-8/12 ">
          <div >
            <div
              onClick={() => toggleDropdown(1)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 1 ? "text-[#008942]" : ""
                }`}
              >
                How can I get more information about the room{"'"}s or property
                {"'"}s facilities?
              </p>
              {openDropdownIndex === 1 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 1 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                You can find details about the property in your confirmation
                email or on the property detail page. For anything else, you can
                also contact the property directly.
              </p>
            )}
          </div>

          <div className="h-[1px] bg-[#F2F3F3] my-[18px]" />

          <div>
            <div
              onClick={() => toggleDropdown(2)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 2 ? "text-[#008942]" : ""
                }`}
              >
                When do I get a confirmation email?
              </p>
              {openDropdownIndex === 2 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 2 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                In most cases, you will receive this email along with the
                booking voucher (a PDF file) within 60 minutes of booking. If
                you still haven{"'"}t received it after that time, please check
                your junk mail or spam filters. You can also download or resend
                your booking voucher online.
              </p>
            )}
          </div>

          <div className="h-[1px] bg-[#F2F3F3] my-[18px]" />

          <div>
            <div
              onClick={() => toggleDropdown(3)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 3 ? "text-[#008942]" : ""
                }`}
              >
                Where can I check my booking details and status?
              </p>
              {openDropdownIndex === 3 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 3 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                You can always view your booking details and status online by
                signing.
              </p>
            )}
          </div>

          <div className="h-[1px] bg-[#F2F3F3] my-[18px]" />

          <div>
            <div
              onClick={() => toggleDropdown(4)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 4 ? "text-[#008942]" : ""
                }`}
              >
                Is breakfast included in the room rate?
              </p>
              {openDropdownIndex === 4 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 4 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                If breakfast is included, it will display {'"'}Breakfast{'"'}{" "}
                Included.
              </p>
            )}
          </div>

          <div className="h-[1px] bg-[#F2F3F3] my-[18px]" />

          <div>
            <div
              onClick={() => toggleDropdown(5)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 5 ? "text-[#008942]" : ""
                }`}
              >
                How can I cancel my booking?
              </p>
              {openDropdownIndex === 5 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 5 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                You can cancel your booking online on the ChutyRooms website or
                app.
              </p>
            )}
          </div>

          <div className="h-[1px] bg-[#F2F3F3] my-[18px]" />

          <div>
            <div
              onClick={() => toggleDropdown(6)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 6 ? "text-[#008942]" : ""
                }`}
              >
                How do I know if my booking was cancelled?
              </p>
              {openDropdownIndex === 6 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 6 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                After you cancel a booking with us, you should receive an email
                confirming the cancellation. Check your inbox and spam/junk mail
                folders, or check the website.
              </p>
            )}
          </div>

          <div className="h-[1px] bg-[#F2F3F3] my-[18px]" />

          <div>
            <div
              onClick={() => toggleDropdown(7)}
              className="flex items-start lg:items-center justify-between gap-[8px]"
            >
              <p
                className={`text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] cursor-pointer ${
                  openDropdownIndex === 7 ? "text-[#008942]" : ""
                }`}
              >
                I want to change my booking dates. How can I do this?
              </p>
              {openDropdownIndex === 7 ? (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowUpIcon}
                  alt="Arrow Up Icon"
                />
              ) : (
                <img
                  className="w-[28px] md:w-[32px] lg:w-[38px]"
                  src={arrowDownIcon}
                  alt="Arrow Down Icon"
                />
              )}
            </div>
            {openDropdownIndex === 7 && (
              <p className="mt-[18px] w-11/12 lg:w-8/12">
                ChutyRooms now provides you with a self-service option. Select
                your booking
              </p>
            )}
          </div>

          {/* Repeat the above structure for each dropdown */}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
