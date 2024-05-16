/* eslint-disable react/prop-types */
import minusIcon from "../../../../assets/icons/minus.svg";
import plusIcon from "../../../../assets/icons/plus.svg";
import starIcon from "../../../../assets/icons/star.svg";

const CancellationPolicy = (props) => {

  const {cancellationData,setCancellationData}=props;

  const handleAddCancellation = (e) => {
    e.preventDefault();

    setCancellationData([
      ...cancellationData,
      { duration: { hours: 23, minutes: 59 }, refund_percentage: 50 },
    ]);
  };

  const handleRemoveCancellation = (e) => {
    e.preventDefault();
  if(cancellationData?.length>1){
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

  //  const addPolicy = () => {
  //    const newPolicy = {
  //      id: policies.length,
  //      content: (
  //        <div>
  //          <h2 className="property-input-title">Duration</h2>
  //          <p className="flex gap-x-[15px] text-[14px] md:text-[16px] lg:text-[16px] mb-[12px]">
  //            <label contentEditable="true">23</label>
  //            {"hours"}
  //            <span>45</span>
  //            {"minute"}
  //          </p>
  //          <p className="flex gap-x-[15px] text-[14px] md:text-[16px] lg:text-[16px]">
  //            <span>23 hours</span>
  //            <span>45 minute</span>
  //          </p>
  //        </div>
  //      ),
  //    };

  //    const updatedPolicies = [...policies, newPolicy];
  //    setPolicies(updatedPolicies);
  //  };

  //  const removePolicy = () => {
  //    const updatedPolicies = policies.slice(0, -1);
  //    setPolicies(updatedPolicies);
  //  };

  //  const handlePolicyChange = (id, value) => {
  //    const updatedPolicies = policies.map((policy) =>
  //      policy.id === id ? { ...policy, content: value } : policy
  //    );
  //    setPolicies(updatedPolicies);
  //  };

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
                      <div className="flex gap-x-[15px] text-[14px] md:text-[16px] lg:text-[16px] md:mr-[24px] lg:mr-[24px] my-[4px]">
                        <div>
                          <p className="flex">
                            <input
                              type="number"
                              className="w-[36px] border-[1px] border-[#E6E7E6] rounded-[4px] px-1 bg-white"
                              value={cancellation.duration.hours}
                              onChange={(e) =>
                                handleDurationChange(
                                  index,
                                  "hours",
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
                              value={cancellation.duration.minutes}
                              onChange={(e) =>
                                handleDurationChange(
                                  index,
                                  "minutes",
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

export default CancellationPolicy;
