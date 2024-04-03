import { useState } from "react";
import { useAddPaymentMethodMutation } from "../../../../../redux/features/admin/paymentMethod/paymentMethod.api";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { Controller, useForm } from "react-hook-form";

const PaymentAdd = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [addPaymentMethod, { isLoading, isError, error }] =
    useAddPaymentMethodMutation();
  // const [inputValue, setInputValue] = useState({ name: '', view_order: '', is_active: null });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [validationErrors, setValidationErrors] = useState({});

  if (isLoading) {
    return <Loading></Loading>;
  }

  // const handleInput = (e) => {
  //   setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  // }
  // const handleInputFile = (e) => {
  //   // alert(1);
  //   setInputValue({ ...inputValue, 'image': e.target.files[0] });
  // }

  // const handleSubmit = async (e) => {
  const onSubmit = async (data) => {
    console.log(data);

    const paymentMethodInfo = {
      name:data.name,
      image:data.image,
      view_order:data.view_order,
      is_active:parseInt(data.is_active)
    }

    console.log('payment',paymentMethodInfo);

    const formData = new FormData();

    // formData.append('data',JSON.stringify(data));

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

    console.log('formdata',Object.fromEntries(formData));

    // addPaymentMethod(formData)
    try {
      const result = await addPaymentMethod(formData);
      // Handle successful mutation
      console.log("Payment method", result);
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
    }

    // console.log(inputValue);

    // const isValidImageFile = (file) => {
    //   const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
    //   return file && acceptedTypes.includes(file.type);
    // };
    // try {
    //   // Call the mutation function with the form data
    //   if (!isValidImageFile(inputValue.image)) {
    //     throw new Error("The image file must be of type: jpg, jpeg, png.");
    //   }
    //   const result = await addPaymentMethod({
    //     data: inputValue,
    //     iamge: inputValue.image,
    //   });
    //   // Handle successful mutation
    //   console.log("Payment method", result);
    // } catch (error) {
    //   // Handle error
    //   console.error("Error adding payment method:", error);
    // }
  };
  return (
    <div className="paymentmethod-add-division">
      <form
        className="paymentmethod-add-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Property name */}
        <div>
          <label className="property-input-title" htmlFor="name">
            PaymentType Name
          </label>
          <input
            className="input-box"
            id="name"
            name="name"
            // value={inputValue.name}
            // onChange={handleInput}
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
                <label htmlFor="image">PaymentType Image</label>
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
                {errors.image && <span>{errors.image.message}</span>}
              </>
            )}
          />
        </div>

        <div>
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

        {/* <div>
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="is_active"
              defaultValue="1" // Providing a default value
              render={({ field }) => (
                <>
                  <input type="radio" id="active" value="1" {...field} />
                  <label
                    className="cursor-pointer text-gray-700 ml-2"
                    htmlFor="active"
                  >
                    Active
                  </label>
                </>
              )}
            />

            <Controller
              control={control}
              name="is_active"
              defaultValue="0" // Providing a default value
              render={({ field }) => (
                <>
                  <input type="radio" id="inactive" value="0" {...field} />
                  <label
                    className="cursor-pointer text-gray-700 ml-2"
                    htmlFor="inactive"
                  >
                    Inactive
                  </label>
                </>
              )}
            />
          </div>
          {errors.is_active && <span>{errors.is_active.message}</span>}
        </div> */}

        <div>
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

        <button type="submit" className="country-save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default PaymentAdd;
