import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import { BASE_ASSET_API } from '../../../../../BaseApi/AssetUrl';
import Loading from '../../../../Common/Includes/Loading/Loading';
import { useGetSinglePaymentMethodQuery, useUpdatePaymentMethodMutation } from '../../../../../redux/features/admin/paymentMethod/paymentMethod.api';
const PaymentEdit = () => {

    const { id } = useParams();
  const navigate = useNavigate();
  


  const [Payment, setPayment] = useState({
    name: "",
    image: null,
    view_order: "",
    is_active: ""
  })

  const [validationErrors, setValidationErrors] = useState({});

  const {data,isLoading} = useGetSinglePaymentMethodQuery(id);
  const paymentMethod = data?.data;
  const [updatePaymentMethod] = useUpdatePaymentMethodMutation(id);

  if(isLoading){
    return <Loading></Loading>
  }
 

  const changePaymentFieldHandler = (e) => {
    // alert(e.target.type === 'file');
    // console.log(e.target.type === 'file' ? e.target.files[0] : e.target.value);
    setPayment({
      ...Payment,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
    });
  }

    return (

        
        <div>
             <div className='paymentmethod-add-division'>
      <form className='paymentmethod-add-form'>
        <div>
          <label className="property-input-title" htmlFor="name">
            PaymentType Name
          </label>
          <input
            className="input-box"
            id="name"
            name="name"
            //   onChange={e => changeCountryFieldHandler(e)} 
            value={paymentMethod.name} onChange={e => changePaymentFieldHandler(e)}

          />

          {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
        </div>

        <div className="mb-3">
          <label
            htmlFor="image">
            Membership Card Image
          </label>
          {paymentMethod && paymentMethod.image &&<img src={`${BASE_ASSET_API}/storage/images/payment/payment_methods/${paymentMethod.image}`}></img>}
          <input
            className="input-box"
            type="file"
            name="image"
            onChange={e => changePaymentFieldHandler(e)}
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
            value={paymentMethod.view_order} onChange={e => changePaymentFieldHandler(e)}
          />


          {/* {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>} */}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div>
              <input type="radio" id="is_active" name="is_active" value="1" checked={paymentMethod.is_active == 1} onChange={e => changePaymentFieldHandler(e)} ></input>
              <label className="cursor-pointer text-gray-700 ml-2">Active</label>
            </div>

            <div>
              <input type="radio" id="is_active" name="is_active" value="0" checked={paymentMethod.is_active == 0} onChange={e => changePaymentFieldHandler(e)} ></input>
              <label className="cursor-pointer text-gray-700 ml-2">Inactive</label>
            </div>

          </div>
          {/* {validationErrors.is_active && <span className='validation-message'>{validationErrors.is_active}</span>} */}
        </div>

        <button className='country-save-btn'>Save</button>
      </form>
    </div>
            
        </div>
    );
};

export default PaymentEdit;