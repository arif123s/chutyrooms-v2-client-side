
import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BASE_ASSET_API } from "../../../../../BaseApi/AssetUrl";
import Loading from "../../../../Common/Includes/Loading/Loading";
import {
  useGetSinglePaymentMethodQuery,
  useUpdatePaymentMethodMutation,
} from "../../../../../redux/features/admin/paymentMethod/paymentMethod.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
const PaymentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    control,
    // register,
    handleSubmit,
    // setValue,
    // formState: { errors },
    reset,
  } = useForm();

  const [paymentMethodData, setPaymentMethodData] = useState({
    name: "",
    image: null,
    view_order: "",
    is_active: null,
  });

  console.log(paymentMethodData);

  // const [errorMessage, setErrorMessage] = useState({
  //   status: false,
  //   message: "",
  //   errors: [],
  // });

   const [validationErrors, setValidationErrors] = useState({});

  const { data, isLoading,refetch } = useGetSinglePaymentMethodQuery(id);
  const paymentMethod = data?.data;
  const [updatePaymentMethod, { isLoading: updateLoading,
    //  isError, error 
    }] =useUpdatePaymentMethodMutation();
  const [paymentMethodImage, setPaymentMethodImage] = useState("");

  useEffect(() => {
    if (paymentMethod?.image) {
      setPaymentMethodImage(
        `${BASE_ASSET_API}/storage/images/payment/payment_methods/${paymentMethod.image}`
      );
      setPaymentMethodData({
        name: paymentMethod.name,
        image: null,
        view_order: paymentMethod.view_order,
        is_active: paymentMethod.is_active,
      });
    }
        refetch();
  }, [paymentMethod,refetch]);

  if (isLoading || updateLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = async (data) => {
    const paymentMethodInfo = {
      id: id,
      name: paymentMethodData.name,
      image: data.image,
      view_order: paymentMethodData.view_order,
      is_active: parseInt(paymentMethodData.is_active),
    };

    if (paymentMethodInfo.image === undefined) {
      delete paymentMethodInfo.image;
    }

    console.log(paymentMethodInfo);

    const formData = new FormData();

    Object.entries(paymentMethodInfo).forEach(([key, value]) => {
      if (key !== "image") {
        // Convert is_active to integer if it's present
        const formattedValue =
          key === "is_active" ? parseInt(value, 10) : value;
        formData.append(key, formattedValue);
      }
    });

    // Append image file to FormData
    if (data?.image) {
      formData.append("image", data.image);
    }

    formData.append("_method", "PUT");

    // Logging FormData to check its content
    console.log("formdata", Object.fromEntries(formData));

    const paymentInfo = {
      id,
      formData,
    };

    try {
      const result = await updatePaymentMethod(paymentInfo);
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("Payment method", result);
        toast.success("Payment method edited successfully");
        navigate("/dashboard/PaymentSystems");
        reset();
      }
      else {
        console.log("Failed", result?.error?.data?.errors);
        setValidationErrors(result?.error?.data?.errors);
        // console.log("Failed", result);
      }
    } catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
      // setValidationErrors(err.response.data.errors);
    }
  };

  return (
    <div>
      <div className="paymentmethod-add-division">
        <form
          className="paymentmethod-add-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="property-input-title" htmlFor="name">
              PaymentType Name
            </label>
            <input
              className="input-box"
              id="name"
              name="name"
              value={paymentMethodData.name}
              onChange={(e) =>
                setPaymentMethodData({
                  ...paymentMethodData,
                  name: e.target.value,
                })
              }
              // {...register("name", {
              //   required: {
              //     value: true,
              //     message: "Payment Type is required",
              //   },
              // })}
            />
            {validationErrors.name && (
              <span className="label-text-alt text-red-500">
                {validationErrors.name}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="image">Payment Method Image</label>
            {paymentMethod && paymentMethod.image && (
              <img src={paymentMethodImage} alt="Payment Method"></img>
            )}

            <Controller
              name="image"
              control={control}
              // rules={{ required: "Image is required" }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <input
                    className="input-box"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const acceptedTypes = ["image/jpeg", "image/png"]; // Accepted image types
                        if (acceptedTypes.includes(file.type)) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPaymentMethodImage(reader.result);
                          };
                          reader.readAsDataURL(file);
                          onChange(file);
                        } else {
                          // Reset file input if the file type is not accepted
                          // e.target.value = null;
                        }
                      }
                    }}
                    onBlur={onBlur}
                    ref={ref}
                  />
                </>
              )}
            />
          </div>

          <div className="mb-3">
            <label className="property-input-title" htmlFor="view_order">
              View Order
            </label>
            <input
              className="input-box"
              id="view_order"
              name="view_order"
              value={paymentMethodData.view_order}
              onChange={(e) =>
                setPaymentMethodData({
                  ...paymentMethodData,
                  view_order: e.target.value,
                })
              }
              // {...register("view_order", {
              //   required: {
              //     value: true,
              //     message: "View order is required",
              //   },
              // })}
            />

            {validationErrors.view_order && (
              <span className="label-text-alt text-red-500">
                {validationErrors.view_order}
              </span>
            )}
          </div>

          <div className="mb-3 property-input-title">
            <div className="flex gap-3">
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="active"
                  value={1}
                  checked={paymentMethodData.is_active == 1}
                  onChange={(e) =>
                    setPaymentMethodData({
                      ...paymentMethodData,
                      is_active: e.target.value,
                    })
                  }
                  // {...register("is_active", { required: true })}
                />
                <label htmlFor="active">Active</label>
              </div>
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="inactive"
                  value={0}
                  checked={paymentMethodData.is_active == 0}
                  onChange={(e) =>
                    setPaymentMethodData({
                      ...paymentMethodData,
                      is_active: e.target.value,
                    })
                  }
                  // {...register("is_active", { required: true })}
                />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
            {/* <label className=" mb-0 pb-0">
              {errors.is_active?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  Please select one option.
                </span>
              )}
            </label> */}
          </div>

          <button type="submit" className="country-save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentEdit;
