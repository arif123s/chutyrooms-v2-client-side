/* eslint-disable react/prop-types */
import dashIcon from "../../../../../assets/icons/dash.svg";
import plusIcon from "../../../../../assets/icons/plus.svg";
import minusIcon from "../../../../../assets/icons/minus.svg";
import { useState } from "react";

const ChildAgeVariation = ({
  childAgeVariation,
  setChildAgeVariation,
  childAgeLimit,
}) => {
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    active: false,
  });

  const handleAddAgeVariation = (e) => {
    e.preventDefault();

    setChildAgeVariation([
      ...childAgeVariation,
      { start_age: null, end_age: null, free_qty: null, price: null },
    ]);
  };

  const handleRemoveAgeVariation = (e) => {
    e.preventDefault();
    if (childAgeVariation?.length > 1) {
      setChildAgeVariation(childAgeVariation.slice(0, -1));
    }
  };

  const handleValueChange = (index, field, value) => {
    // if (parseInt(value) < 0) {
    //   setErrorMessage({
    //     message: "Input value cannot be less than 0",
    //     active: true,
    //   });
    //   return;
    // }
    // if (field == "start_age" || field == "end_age") {
    //   if (parseInt(value) > childAgeLimit) {
    //     setErrorMessage({
    //       message: `Value cannot exceed age limit ${childAgeLimit}`,
    //       active: true,
    //     });
    //     return;
    //   }
    // }
    // // Clear error message if input is valid
    // setErrorMessage({
    //   ...errorMessage,
    //   active: false,
    // });
    // // Parse the value to a number
    // const numericValue = parseInt(value);
    // // Check if the parsed numericValue is NaN (Not-a-Number)
    // const newValue = isNaN(numericValue) ? null : numericValue;

    // const newData = [...childAgeVariation];
    // newData[index][field] = newValue;
    // setChildAgeVariation(newData);

    // If field is 'qty' and newValue is null or less than 0, set error message
    if (value === null || value < 0) {
      setErrorMessage({
        message: "Value cannot be less than 0",
        active: true,
      });
      return;
    }

    if (field == "start_age" || field == "end_age") {
      if (parseInt(value) > childAgeLimit) {
        setErrorMessage({
          message: `Value cannot exceed age limit ${childAgeLimit}`,
          active: true,
        });
        return;
      }
    }

    // Create a new array with a copy of the bedInfos
    const newData = childAgeVariation.map((variation, i) => {
      // If it's not the bed we're updating, return it as is
      if (i !== index) return variation;

      // If it's the bed we're updating, return a new object with the updated field
      return {
        ...variation,
        [field]: value,
      };
    });

    // Update the state with the new array
    setChildAgeVariation(newData);
  };

  return (
    <div>
      {childAgeVariation?.map((ageVariation, index) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px] gap-y-[18px] my-[18px]"
        >
          <div>
            <label className="property-input-title" htmlFor="start_age">
              Child Age Range
            </label>
            {/* Child Age Range */}
            <div className="flex">
              <input
                className="input-box"
                id="start_age"
                name="start_age"
                type="number"
                value={
                  ageVariation?.start_age !== null
                    ? ageVariation?.start_age
                    : ""
                }
                onChange={(e) =>
                  handleValueChange(index, "start_age", e.target.value)
                }
              />
              <img className="mx-[12px]" src={dashIcon} alt="" />
              <input
                className="input-box"
                id="end_age"
                name="end_age"
                type="number"
                value={
                  ageVariation?.end_age !== null ? ageVariation?.end_age : ""
                }
                onChange={(e) =>
                  handleValueChange(index, "end_age", e.target.value)
                }
              />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[44px]">
            <div className="">
              <label className="property-input-title" htmlFor="free_qty">
                Free Qty
              </label>
              <input
                className="input-box"
                id="free_qty"
                name="free_qty"
                type="number"
                // value={ageVariation?.free_qty || ""}
                value={
                  ageVariation?.free_qty !== null ? ageVariation?.free_qty : ""
                }
                onChange={(e) =>
                  handleValueChange(index, "free_qty", e.target.value)
                }
              />
            </div>
            <div className="">
              <label className="property-input-title" htmlFor="price">
                Price
              </label>
              <input
                className="input-box"
                id="price"
                name="price"
                type="number"
                // value={ageVariation?.price || ""}
                value={ageVariation?.price !== null ? ageVariation?.price : ""}
                onChange={(e) =>
                  handleValueChange(index, "price", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      {errorMessage.active && (
        <span className="label-text-alt text-red-500">
          {errorMessage.message}
        </span>
      )}
      <div className="input-box flex items-center justify-center gap-[12px]">
        <button
          onClick={(e) => handleAddAgeVariation(e)}
          className="flex items-center justify-center gap-[4px]"
        >
          <img src={plusIcon} alt="" /> <span>Add Age Variation</span>
        </button>
        <button
          onClick={(e) => handleRemoveAgeVariation(e)}
          className="flex items-center justify-center gap-[4px]"
        >
          <img src={minusIcon} alt="" /> <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default ChildAgeVariation;
