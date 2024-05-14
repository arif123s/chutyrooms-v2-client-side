/* eslint-disable react/prop-types */
import plusIcon from "../../../../../assets/icons/plus.svg";
import minusIcon from "../../../../../assets/icons/minus.svg";
import tickSquareIcon from "../../../../../assets/icons/tick-square-black.svg";

const BedInfo = ({ errors, bedInfos, setBedInfos }) => {
      
    const handleAddBed = (e) => {
        e.preventDefault();
        setBedInfos([...bedInfos, { bed_name: "", qty: null }]);
      };

      const handleRemoveBed = (e) => {
        e.preventDefault();
        if (bedInfos?.length > 1) {
          setBedInfos(bedInfos.slice(0, -1));
        }
      };

      const handleValueChange = (index, field, value) => {
        // const numericValue = parseFloat(value);
        // const newValue = isNaN(numericValue) ? null : numericValue;
        const newData = [...bedInfos];
        newData[index][field] = value;
        setBedInfos(newData);
      };
      
  return (
    <div className="mt-[18px]">
      <div className="flex items-center gap-[8px] mb-[8px]">
        <h2 className="text-[16px] font-['Gilroy-SemiBold']">Bed Info</h2>
        <img src={tickSquareIcon} alt="" />
      </div>
      
      {bedInfos?.map((bed, index) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] mb-[18px]"
        >
          {/* Bed Name */}
          <div className="">
            <label className="property-input-title" htmlFor="bed_name">
              Bed Name
            </label>
            <input
              className="input-box"
              id="bed_name"
              name="bed_name"
              type="text"
              value={bed?.bed_name || ""}
              onChange={(e) =>
                handleValueChange(index, "bed_name", e.target.value)
              }
            //   {...register("bed_name", {
            //     required: {
            //       value: true,
            //       message: "Bed Name is required",
            //     },
            //   })}
            />
            <label className="">
              {errors.bed_name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.bed_name?.message}
                </span>
              )}
            </label>
          </div>

          {/* Qty */}
          <div className="">
            <label className="property-input-title" htmlFor="bed_quantity">
              Qty
            </label>
            <input
              className="input-box"
              id="bed_quantity"
              name="bed_quantity"
              type="number"
              value={bed?.qty || ""}
              onChange={(e) => handleValueChange(index, "qty", e.target.value)}
            //   {...register("bed_quantity", {
            //     required: {
            //       value: true,
            //       message: "Bed quantity is required",
            //     },
            //   })}
            />
            <label className="">
              {errors.bed_quantity?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.bed_quantity?.message}
                </span>
              )}
            </label>
          </div>
        </div>
      ))}

      <div className="input-box flex items-center justify-center gap-[12px]">
        <button
          onClick={(e) => handleAddBed(e)}
          className="flex items-center justify-center gap-[4px]"
        >
          <img src={plusIcon} alt="" /> <span>Add Bed</span>
        </button>
        <button
          onClick={(e) => handleRemoveBed(e)}
          className="flex items-center justify-center gap-[4px]"
        >
          <img src={minusIcon} alt="" /> <span>Remove</span>
        </button>
      </div>

    </div>
  );
};

export default BedInfo;
