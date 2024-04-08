import { useState } from "react";
import { useAddPaymentMethodMutation } from "../../../../../redux/features/admin/paymentMethod/paymentMethod.api";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PaymentAdd = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [addPaymentMethod, { isLoading, 
    // isError,
    //  error
     }] = useAddPaymentMethodMutation();
  // const [inputValue, setInputValue] = useState({ name: '', view_order: '', is_active: null });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
    errors: [],
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = async (data) => {
    // console.log(data);

    setErrorMessage({ status: false, message: "", errors: [] });

    const paymentMethodInfo = {
      name: data.name,
      image: data.image,
      view_order: data.view_order,
      is_active: parseInt(data.is_active),
    };

    const formData = new FormData();

    // Append non-file fields to FormData
    // Object.entries(paymentMethodInfo).forEach(([key, value]) => {
    //   if (key !== "image") {
    //     formData.append(key, value);
    //   }
    // });

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") {
        // Convert is_active to integer if it's present
        const formattedValue =
          key === "is_active" ? parseInt(value, 10) : value;
        formData.append(key, formattedValue);
      }
    });

    // Append image file to FormData
    if (paymentMethodInfo.image) {
      formData.append("image", paymentMethodInfo.image);
    }

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(formData));

    // addPaymentMethod(formData)
    try {
      const result = await addPaymentMethod(formData);
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("Payment method", result);
        toast.success("Payment method added successfully");
        reset();
      } else {
        // console.log("Failed", result);
        console.log("Failed", result.error.data.errors);
        setErrorMessage({
          status: true,
          message: data.message,
          errors: [result.error.data.errors],
        });
        console.log("errormessage", errorMessage?.errors?.length);
      }
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
    }
  };
  return (
    <div className="paymentmethod-add-division">
      <form
        className="paymentmethod-add-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Property name */}
        <div className="mb-3">
          <label className="property-input-title" htmlFor="name">
            PaymentType Name
          </label>
          <input
            className="input-box"
            id="name"
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Payment Type is required",
              },
            })}
          />
          <label className="">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name?.message}
              </span>
            )}
          </label>
        </div>
        {/* Image */}
        <div className="mb-3">
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <label className="property-input-title" htmlFor="image">
                  PaymentType Image
                </label>
                <input
                  className="input-box"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const acceptedTypes = ["image/jpeg", "image/png"]; // Accepted image types
                      if (acceptedTypes.includes(file.type)) {
                        onChange(file);
                      } else {
                        // Reset file input if the file type is not accepted
                        e.target.value = null;
                      }
                    }
                  }}
                  onBlur={onBlur}
                  ref={ref}
                />
                {errors.image && (
                  <span className="label-text-alt text-red-500">
                    {errors.image.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        {/* View Order */}
        <div className="mb-3">
          <label className="property-input-title" htmlFor="view_order">
            View Order
          </label>
          <input
            className="input-box"
            id="view_order"
            name="view_order"
            // value={inputValue.view_order}
            // onChange={handleInput}
            {...register("view_order", {
              required: {
                value: true,
                message: "View order is required",
              },
            })}
          />
          <label className="">
            {errors.view_order?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.view_order?.message}
              </span>
            )}
          </label>
        </div>
        {/* isActive */}
        <div className="mb-3 property-input-title">
          <div className="flex gap-3">
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="is_active"
                id="active"
                value={1}
                {...register("is_active", { required: true })}
              />
              <label htmlFor="active">Active</label>
            </div>
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="is_active"
                id="inactive"
                value={0}
                {...register("is_active", { required: true })}
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </div>
          <label className=" mb-0 pb-0">
            {errors.is_active?.type === "required" && (
              <span className="label-text-alt text-red-500">
                Please select one option.
              </span>
            )}
          </label>
        </div>

        {errorMessage.errors?.length > 0 &&
          errorMessage?.errors?.map((err, index) => (
            <div key={index}>
              {Object.values(err).map((value, i) => (
                <p className="label-text-alt text-rose-500 mb-[2px]" key={i}>
                  {value}
                </p>
              ))}
            </div>
          ))}

        <button type="submit" className="country-save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default PaymentAdd;
