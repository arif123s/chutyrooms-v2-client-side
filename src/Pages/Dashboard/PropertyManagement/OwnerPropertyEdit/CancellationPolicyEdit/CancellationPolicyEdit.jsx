import minusIcon from "../../../../../assets/icons/minus.svg";
import plusIcon from "../../../../../assets/icons/plus.svg";
import starIcon from "../../../../../assets/icons/star.svg";

const CancellationPolicyEdit = (props) => {
  const { cancellationData, setCancellationData } = props;

  const handleAddCancellation = (e) => {
    e.preventDefault();

    setCancellationData([
      ...cancellationData,
      { duration: { hour: 23, min: 59 }, refund_percentage: 50 },
    ]);
  };

  const handleRemoveCancellation = (e) => {
    e.preventDefault();
    if (cancellationData?.length > 1) {
      setCancellationData(cancellationData.slice(0, -1));
    }
    // const newData = [...cancellationData];
    // newData.splice(index, 1);
    // setCancellationData(newData);
  };

  const handleDurationChange = (index, field, value) => {
    const newData = [...cancellationData];
    newData[index].duration[field] = value;
    setCancellationData(newData);
  };

  const handleRefundChange = (index, value, e) => {
    e.preventDefault();

    const newRefundValue = Math.max(0, Math.min(100, value)); // Ensure refund percentage is within the range [0, 100]
    const newData = [...cancellationData];
    newData[index].refund_percentage = newRefundValue;
    setCancellationData(newData);
  };
  return (
    <div>
      <div>
        <h2 className="property-input-title">Cancellation Policy</h2>

        <div className="py-[10px] px-[14px] border-[1px] rounded-[8px] border-[#E6E7E6] md:flex lg:flex md:gap-x-[18px] lg:gap-x-[120px]">
          <div className="md:flex lg:flex gap-x-[24px] md:items-center lg:items-center">
            <table className="custom-table">
              <thead className="mt-[]">
                <tr className="">
                  <th className="property-input-title text-left font-normal mr-[12px] md:mr-[24px] lg:mr-[24px]">
                    <p className="mr-[12px]">Duration</p>
                  </th>
                  <th className="property-input-title font-normal text-right md:text-left lg:text-left pr-[22px]">
                    Refund
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {cancellationData.map((cancellation, index) => (
                  <tr key={index} className=" ">
                    <td>
                      <div className="flex gap-x-[15px] text-[14px] md:text-[16px] lg:text-[16px] md:mr-[24px] lg:mr-[24px]">
                        <div>
                          <p className="flex">
                            <input
                              type="number"
                              className="w-[36px] border-[1px] border-[#E6E7E6] rounded-[4px] px-1 bg-white"
                              value={cancellation.duration.hour}
                              onChange={(e) =>
                                handleDurationChange(
                                  index,
                                  "hour",
                                  e.target.value
                                )
                              }
                            />
                            <span className="inline-block ml-[3px]">hours</span>
                          </p>
                        </div>

                        <div>
                          <p className="flex">
                            <input
                              type="number"
                              className="w-[36px] border-[1px] border-[#E6E7E6] rounded-[4px] px-1 bg-white"
                              value={cancellation.duration.min}
                              onChange={(e) =>
                                handleDurationChange(
                                  index,
                                  "min",
                                  e.target.value
                                )
                              }
                            />
                            <span className="inline-block ml-[3px]">
                              minutes
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <div className="flex gap-x-[4px] ">
                          <img
                            onClick={(e) =>
                              handleRefundChange(
                                index,
                                cancellation.refund_percentage - 1,
                                e
                              )
                            }
                            src={minusIcon}
                            alt=""
                          />
                          <p className="text-[14px] md:text-[16px] lg:text-[16px] w-[34px]">
                            <span>{cancellation.refund_percentage}%</span>
                          </p>
                          <img
                            onClick={(e) =>
                              handleRefundChange(
                                index,
                                cancellation.refund_percentage + 1,
                                e
                              )
                            }
                            src={plusIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-[14px] md:text-[16px] lg:text-[16px] mt-3 md:mt-3 lg:mt-3 flex justify-end md:justify-start lg:justify-start gap-x-2 md:block lg:block cursor-pointer">
              <button
                onClick={(e) => handleAddCancellation(e)}
                className="border-[1px] border-[#E6E7E6] px-[12px] py-[10px] rounded-[4px] w-[88px] h-[34px] flex items-center justify-center mb-[8px]"
              >
                Add
              </button>
              <button
                onClick={(e) => handleRemoveCancellation(e)}
                className="border-[1px] border-[#E6E7E6] px-[12px] py-[10px] rounded-[4px] w-[88px] h-[34px] flex items-center justify-center cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>

          <h2 className="flex justify-center lg:justify-start items-center text-[16px] text-[#159947] mt-3 lg:mt-0">
            <img className="w-[16px]" src={starIcon} alt="" />
            Add Cancellation Policy
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyEdit;
