import { useState } from "react";
import "./RoomAdd.css"
import { useNavigate } from "react-router-dom";

const RoomAdd = () => {
  const [dashboard,setDashboard]=useState(false);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    setDashboard(true)
  };

  const navigateDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };


  return (
    <div className="custom-container">
      <div className="property-add-container">
        <h2 className="property-add-title mb-[25px]">Room Adding</h2>
        {/* Room Category */}
        <div>
          <h2 className="property-input-title">Room Category</h2>
          <div className="flex gap-[18px] text-[16px]">
            <div className="flex gap-[8px]">
              <input type="checkbox" name="single" id="single" />
              <label htmlFor="deluxe">Single</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="double" id="double" />
              <label htmlFor="deluxe">Double</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="triple" id="triple" />
              <label htmlFor="deluxe">Triple</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="quad" id="quad" />
              <label htmlFor="deluxe">Quad</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="couple" id="couple" />
              <label htmlFor="deluxe">Couple</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="king" id="king" />
              <label htmlFor="deluxe">King</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="queen" id="queen" />
              <label htmlFor="deluxe">Queen</label>
            </div>
            <div className="flex gap-[8px]">
              <input type="checkbox" name="deluxe" id="deluxe" />
              <label htmlFor="deluxe">Deluxe</label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
          <div className="">
            <label className="property-input-title" htmlFor="room-name">
              Room Name
            </label>
            <input
              className="input-box"
              id="room-name"
              name="room-name"
              type="text"
              placeholder="Single Room"
            />
          </div>
          <div className="">
            <label className="property-input-title" htmlFor="room-size">
              Room Size
            </label>
            <input
              className="input-box"
              id="room-size"
              name="room-size"
              type="text"
              placeholder="250 square feet"
            />
          </div>
        </div>
        {/* Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="description">
            Description
          </label>
          <textarea
            className="property-description block input-box h-[120px]"
            name="description"
            id="description"
            placeholder="Sea View"
          ></textarea>
        </div>
        {/* Short Description */}
        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="short-description">
            Short Description
          </label>
          <textarea
            className="property-description block input-box h-[120px]"
            name="short-description"
            id="short-description"
            placeholder=""
          ></textarea>
        </div>
        {/* Room price , bed, guest */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mt-[18px]">
          {/* Regular Price */}
          <div className="">
            <label className="property-input-title" htmlFor="regular-price">
              Regular Price
            </label>
            <input
              className="input-box"
              id="regular-price"
              name="regular-price"
              type="number"
            />
          </div>
          <div className="">
            <label
              className="property-input-title"
              htmlFor="chuty-purchase-price"
            >
              Chuty Purchase Price
            </label>
            <input
              className="input-box"
              id="chuty-purchase-price"
              name="chuty-purchase-price"
              type="number"
            />
          </div>
        </div>
        <div className="mt-[18px]">
          <h2 className="text-[16px] font-['Gilroy-SemiBold'] mb-[8px]">
            Guest Info
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] ">
            <div className="">
              <label className="property-input-title" htmlFor="adult-quantity">
                Adult (qty)
              </label>
              <input
                className="input-box"
                id="adult-quantity"
                name="adult-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="child-quantity">
                Child (qty)
              </label>
              <input
                className="input-box"
                id="child-quantity"
                name="child-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="adult-extra">
                Adult (extra)
              </label>
              <input
                className="input-box"
                id="adult-quantity"
                name="adult-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="child-extra">
                Child (extra)
              </label>
              <input
                className="input-box"
                id="child-extra"
                name="child-extra"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="mt-[18px]">
          <h2 className="text-[16px] font-['Gilroy-SemiBold'] mb-[8px]">
            Extra Guest Info
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] ">
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-guest-quantity"
              >
                Extra guest (qty)
              </label>
              <input
                className="input-box"
                id="extra-guest-quantity"
                name="extra-guest-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-guest-price"
              >
                Price per extra guest
              </label>
              <input
                className="input-box"
                id="extra-guest-price"
                name="extra-guest-price"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="mt-[18px]">
          <h2 className="text-[16px] font-['Gilroy-SemiBold'] mb-[8px]">
            Extra Bed
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] ">
            <div className="">
              <label
                className="property-input-title"
                htmlFor="extra-bed-quantity"
              >
                Extra bed (qty)
              </label>
              <input
                className="input-box"
                id="extra-bed-quantity"
                name="extra-bed-quantity"
                type="number"
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="extra-bed-price">
                Price per extra bed
              </label>
              <input
                className="input-box"
                id="extra-bed-price"
                name="extra-bed-price"
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="mt-[18px]">
          <label className="property-input-title" htmlFor="orderby">
            Order By
          </label>
          <input
            className="input-box"
            id="orderby"
            name="orderby"
            type="number"
          />
        </div>

        <div className="mt-[20px] flex justify-end gap-x-[12px]">
          <button className="w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px]">
            Cancel
          </button>
          <button
            onClick={(e) => handleSave(e)}
            className="w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
          >
            Save
          </button>
        </div>

        {dashboard && (
          <div className="mt-[18px] text-center">
            <button
              onClick={(e) => navigateDashboard(e)}
              className=" text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px]"
            >
              Go to dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomAdd;
