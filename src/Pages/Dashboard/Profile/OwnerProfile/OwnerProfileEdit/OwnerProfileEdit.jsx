import { useForm } from "react-hook-form";
import userImg from "../../../../../assets/icons/user.svg";

const OwnerProfileEdit = () => {
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();

     const onSubmit = () => {};
    return (
      <div className="m-[12px] md:m-[24px] lg:m-[24px]"> 
        <form
          className="lg:w-8/12 p-[12px] md:p-[20px] lg:p-[20px] rounded-[8px] bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <img
              className="w-[56px] md:w-[70px] lg:w-[70px] mr-[12px]"
              src={userImg}
              alt="Profile"
            />
            <p className="text-[#159947] text-[14px]">Change Photo</p>
          </div>
          <div className="h-[1px] bg-[#E6E7E6] my-[24px]" />
          {/* User info */}
          <div>
            <div className="mb-[14px]">
              <label className="input-title" htmlFor="name">
                Name
              </label>
              <input
                className="input-box"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
              />
              <label className="">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

            <div className="mb-4">
              <label className="input-title" htmlFor="email">
                Email
              </label>
              <input
                className="input-box"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <label className="">
                {errors.email && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="mb-[14px]">
              <label className="input-title" htmlFor="postal">
                Phone
              </label>
              <input
                className="input-box"
                id="postal"
                name="postal"
                type="number"
                placeholder="Enter phone number"
                {...register("postal", {
                  required: {
                    value: true,
                    message: "Phone is Required",
                  },
                })}
              />
              <label className="">
                {errors.city?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.city.message}
                  </span>
                )}
              </label>
            </div>
          </div>
        
          <div className=" flex justify-end gap-x-[12px]">
            <button
              // onClick={(e) => {
              //   e.preventDefault(), setChangePassword(false);
              // }}
              className="w-[80px] md:w-[100px] lg:w-[100px] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] border-[1px] border-[#C0C3C1] rounded-[8px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[80px] md:w-[100px] lg:w-[100px] text-[#FFFFFF] bg-[#159947] h-[40px] md:h-[48px] lg:h-[48px] px-[14px] py-[10px] rounded-[8px] flex items-center justify-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
};

export default OwnerProfileEdit;