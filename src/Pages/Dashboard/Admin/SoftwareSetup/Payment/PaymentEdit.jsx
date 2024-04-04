import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import { BASE_ASSET_API } from '../../../../../BaseApi/AssetUrl';
import Loading from '../../../../Common/Includes/Loading/Loading';
import { useGetSinglePaymentMethodQuery, useUpdatePaymentMethodMutation } from '../../../../../redux/features/admin/paymentMethod/paymentMethod.api';
import { Controller, useForm } from 'react-hook-form';
const PaymentEdit = () => {

  const { id } = useParams();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const [paymentMethodData, setPaymentMethodData] = useState({
    name: '',
    image: null,
    view_order: '',
    is_active: null 
  });

  console.log(paymentMethodData)

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
    errors: [],
  });


  const { data, isLoading } = useGetSinglePaymentMethodQuery(id);
  const paymentMethod = data?.data;
  const [updatePaymentMethod, { isLoading: updateLoading, isError, error }] = useUpdatePaymentMethodMutation();
  const [paymentMethodImage, setPaymentMethodImage] = useState('');

  useEffect(() => {
    if (paymentMethod?.image) {
      setPaymentMethodImage(`${BASE_ASSET_API}/storage/images/payment/payment_methods/${paymentMethod.image}`);
      setPaymentMethodData({
        name: paymentMethod.name,
        // image: null,
        view_order: paymentMethod.view_order,
        is_active: paymentMethod.is_active 
      })
    }
  }, [paymentMethod]);

  if (isLoading || updateLoading) {
    return <Loading></Loading>
  }

  const changeMembershipFieldHandler = (e) => {
    // alert(e.target.type === 'file');
    // console.log(e.target.type === 'file' ? e.target.files[0] : e.target.value);
    setPaymentMethodData({
      ...paymentMethodData,
      [e.target.name]: e.target.value
    });
  }
 

  const onSubmit = async (data) => {

    const paymentMethodInfo = {
      name: data.name,
      image: data.image,
      view_order: data.view_order,
      is_active: parseInt(data.is_active)
    }

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

    // Logging FormData to check its content
    console.log('formdata', Object.fromEntries(formData));

    const paymentInfo = {
      id,
      formData
    }


    try {
      const result = await updatePaymentMethod(paymentInfo);
      // console.log(result)
      // Handle successful mutation
      if (result?.data?.status) {
        console.log("Payment method", result);
        toast.success("Payment method added successfully");
        reset();
      } else {
        // console.log("Failed", result);
        console.log("Failed", result.error.data.errors);
      }
    }
    catch (error) {
      // Handle error
      console.error("Error adding payment method:", error);
    }

  }

  return (


    <div>
      <div className='paymentmethod-add-division'>
        <form className='paymentmethod-add-form' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="property-input-title" htmlFor="name">
              PaymentType Name
            </label>
            <input
            className="input-box"
            id="name"
            name="name"
            value={paymentMethodData.name}
            onChange={e => changeMembershipFieldHandler(e)}
              {...register("name", {
                required: {
                  value: true,
                  message: "Payment Type is required",
                },
              })}
            />


          </div>

          <div className="mb-3">
            <label
              htmlFor="image">
              Membership Card Image
            </label>
            {paymentMethod && paymentMethod.image && <img src={paymentMethodImage} alt='Payment Method'></img>}

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
          {/* <div className="mb-3">
          <label
            htmlFor="image">
            PaymentType Image
          </label>
          <input
            className="input-box"
            type="file"
            // id="image"
            // name="image"
            accept="image/*"
            // value={inputValue.image}
            // onChange={handleInputFile}
            onChange={e => changePaymentFieldHandler(e)}
          />
        </div> */}

          <div>
            <label className="property-input-title" htmlFor="view_order">
              View Order
            </label>
            <input
              className="input-box"
              id="view_order"
              name="view_order"
              value={paymentMethod.view_order}
              // onChange={e => changePaymentFieldHandler(e)}
              // onChange={(e) => setValue("view_order", e.target.value)}
              onChange={(e) => setPaymentMethodData({ ...paymentMethodData, view_order: e.target.value })}
              {...register("view_order", {
                required: {
                  value: true,
                  message: "View order is required",
                },
              })}
            />


            {/* {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>} */}
          </div>



          <div className="mb-3 property-input-title">
            <div className="flex gap-3">
              <div className="flex items-center gap-[6px]">
                <input
                  type="radio"
                  name="is_active"
                  id="active"
                  value={1}
                  checked={paymentMethod.is_active == 1}
                  // onChange={e => changePaymentFieldHandler(e)}
                  // onChange={() => setValue("is_active", 1)}
                  onChange={() => setPaymentMethodData({ ...paymentMethodData, is_active: 1 })}
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
                  checked={paymentMethod.is_active == 0}
                  // onChange={e => changePaymentFieldHandler(e)}
                  // onChange={() => setValue("is_active", 0)}
                  onChange={() => setPaymentMethodData({ ...paymentMethodData, is_active: 0 })}
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

          <button type="submit" className='country-save-btn'>Save</button>
        </form>
      </div>

    </div>
  );
};

export default PaymentEdit;