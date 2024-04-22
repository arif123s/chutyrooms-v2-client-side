import square from "../../../assets/icons/square-fill.svg";
import { useNavigate } from "react-router-dom";

const TermAndConditions = () => {

  const navigate = useNavigate()

  return (
    <div className="my-[20px] md:my-[36px] lg:my-[50px] text-[14px] md:text-[16px] lg:text-[16px] px-[8px]">
      <div className="custom-container p-[20px] bg-white mx-[8px] rounded-[8px]">
        <h2 className="text-[18px] md:text-[24px] lg:text-[24px] font-['Gilroy-semibold'] mb-[18px]">
          Terms & Conditions
        </h2>

        <p className="mb-[18px]">
          The largest, most trusted, and fastest growing hospitality partner in
          Bangladesh.
        </p>

        <p className="mb-[18px]">
          Last updated:{" "}
          <span className="text-[#020F07] font-['Gilroy-semibold']">
            April 1, 2023
          </span>
        </p>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            General
          </h2>
          <p>
            Hello and welcome! We are glad that you are taking the time to read
            these terms and conditions. Please read these terms and conditions
            carefully before using the ChutyRooms website and app. Generally, if
            any customers are booking through our chat rooms, website, or app
            for travel, travelers must understand and agree with these terms and
            conditions before booking or purchasing their services through the
            ChutyRooms website and app. If any traveler faces any issue or
            dispute regarding bookings, ChutyRooms contacts them as soon as
            possible.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Services
          </h2>
          <p>
            ChutyRooms web and app offer services to its users by offering their
            own websites and apps.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Eligible for use
          </h2>
          <p>
            Customers must be at least a standard age for booking as per hotel
            policy. If any customers are under the minimum standard age, they
            may book the hotel on the ChutyRooms website and app, but they will
            provide information and be under the supervision of their parents or
            legal guardians as per hotel policy.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Account Registration and Use
          </h2>
          <p>
            ChutyRooms platform requires that you register account information,
            so customs must register carefully. Responsible for all activities.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            ChutyRooms Services
          </h2>
          <p className="mb-[8px]">
            ChutyRooms also promises to provide its users with comfortable
            accommodations and hotel stays with the following amenities, as per
            hotel policy:
          </p>

          <div>
            <div className="flex  gap-[6px] mb-[2px]">
              <img src={square} alt="" />
              <p>AC Rooms</p>
            </div>
            <div className="flex  gap-[4px] mb-[2px]">
              <img src={square} alt="" />
              <p>Television</p>
            </div>
            <div className="flex  gap-[4px] mb-[2px]">
              <img src={square} alt="" />
              <p>Wi-Fi</p>
            </div>
            <div className="flex  gap-[4px] mb-[2px]">
              <img src={square} alt="" />
              <p>Spotless linen</p>
            </div>
            <div className="flex gap-[4px] mb-[2px]">
              <img src={square} alt="" />
              <p>Hygienic and sanitized washrooms</p>
            </div>
            <div className="flex items-start gap-[4px] mb-[2px]">
              <img className="mt-[4px]" src={square} alt="" />
              <p>
                Housekeeping facilities on a daily basis for your comfort, and
                24/7 front desk service to help with all your queries.
              </p>
            </div>
            <div className="flex items-start gap-[4px] mb-[2px]">
              <img className="mt-[4px]" src={square} alt="" />
              <p>You can reach out to us on the ChutyRooms support page.</p>
            </div>
            <div className="flex gap-[4px] mb-[2px]">
              <img src={square} alt="" />
              <p>Calling us on our 24x7 customer support helpline</p>
            </div>
            <div className="flex gap-[4px] mb-[2px]">
              <img src={square} alt="" />
              <p>The infinity pool</p>
            </div>
            <div className="flex items-start gap-[4px] mb-[2px]">
              <img className="mt-[4px]" src={square} alt="" />
              <p>
                Our customer support team will ensure the best outcome and
                resolve your concern.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Usage terms
          </h2>
          <p>
            ChutyRooms platform requires that you register account information,
            so customs must register carefully. Responsible for all activities.
          </p>
          <p>
            ChutyRooms reserves the right to refuse or cancel the booking at any
            time. Although ChutyRooms has the right to improve, enhance, and
            modify the ChutyRooms.
          </p>
          <p>
            Platform: web and app From time to time, the hotel authorities will
            take responsibility for any untoward incident.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Prohibited Content
          </h2>
          <p>
            ChutyRooms reserves the right, at its sole discretion, to block and
            terminate User{"'"}s access to this ChutyRooms Platform at any time,
            with or without notice.
          </p>
          <p>
            Outside food, beverages, and alcohol are totally prohibited on the
            hotel premises as per hotel policy.
          </p>
          <p>Outside guests are not allowed in the room as per hotel policy.</p>
          <p>
            Pets are not allowed and are totally prohibited in the hotel or
            resort.
          </p>
          <p>
            As per hotel policy, smoking is not allowed in the room or on hotel
            premises.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Communication
          </h2>
          <p>
            The ChutyRooms website and app agree with and understand that you
            are communicating with ChutyRooms through a call or email.
            ChutyRooms may communicate with customers by email or phone;
            customers may accept or decline the cookies when they access the
            ChutyRooms Platform. It is the user{"'"}s responsibility to set his
            browser to alert him to accept or reject cookies.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Privacy
          </h2>
          <p>
            Please refer to the privacy policy, which will also govern
            customers’ use of ChutyRooms services and can be accessed here:{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault(), navigate("/privacy-policy");
              }}
              className="text-[#008942] cursor-pointer"
            >
              https://chutyrooms.com/privacy-policy
            </a>
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Personal data is secure
          </h2>
          <p>
            ChutyRooms highest priority is keeping your personal data secure and
            organizes an expert IT team to keep your personal data as safe as
            possible.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Legal compliance and obligations
          </h2>
          <p>
            ChutyRooms may need to share your information for any legal
            assistance, investigation, compliance, regulatory, or audit
            purposes.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Payment Terms
          </h2>
          <p>
            If any customers make payments by using ChutyRooms website or
            ChutyRooms app, customers must consent to the use of their personal
            information for transaction verification. Customers also acknowledge
            that the information details they provide to ChutyRoomsRooms.com may
            be disclosed to third-party credit card payment gateway agencies for
            verification. The customer’s personal details will not be shared for
            any other purposes except to verify and confirm the customer’s
            identity. ChutyRooms Hotel and Accommodation prices and offers are
            subject to change with availability.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Payments information
          </h2>
          <p>
            ChutyRooms will store your personal information in a secure and
            encrypted format. But chat rooms do not store your credit or debit
            card data. All credit/debit card and payment information is secure,
            encrypted, and handled by fully-certified payment providers.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Cancellation and Refund
          </h2>
          <p>
            In case of a refund, the customer must confirm cancellation 7 days
            prior to the booking date. After a successful cancellation, a refund
            will be returned within 15 working days. For more information, see{" "}
            <span
              href=""
              onClick={(e) => {
                e.preventDefault(), navigate("/refund-policy");
              }}
              className="text-[#008942] cursor-pointer"
            >
              https://www.ChutyRoomsRooms.com/refund-policy
            </span>
            . In cases of emergency political unrest, natural disasters, etc.
            The standard refund policy may not be applicable.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Promotion Terms
          </h2>
          <p>
            ChutyRooms will provide promotional discounts, which may be
            available on the ChutyRooms website and app. If any customers
            register on ChutyRooms website and app, ChutyRooms will contact them
            in the future to provide offers such as services and discounts.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Changes or modifications to these terms
          </h2>
          <p>
            ChutyRooms reserves the right to modify these terms at any time,
            with or without notice. Customers are responsible for remaining
            knowledgeable about these terms.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Choices and rights
          </h2>
          <p>
            If customers have a ChutyRooms account, they can access and edit the
            key personal data associated with their profile at any time.
          </p>
        </div>

        <div className="mb-[18px]">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Feedback
          </h2>
          <p>
            We encourage customers to share their comments and questions with
            us, and we will respond to their responses each and every time.
          </p>
        </div>

        <div className="">
          <h2 className="text-[16px] md:text-[18px] lg:text-[18px] font-['Gilroy-semibold'] mb-[4px]">
            Contact Information
          </h2>
          <div>
            <p className="mb-[2px]">
              Corporate Office: Salina Mostafa Bhaban, 4th floor, Wapda,
              Halishahar, Chattogram.
            </p>
            <p className="mb-[2px]">Contact email: help@chutyrooms.com</p>
            <p className="mb-[2px]">Contact details: www.chutyrooms.com</p>
            <p> Phone number: +8801958609901</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermAndConditions;
