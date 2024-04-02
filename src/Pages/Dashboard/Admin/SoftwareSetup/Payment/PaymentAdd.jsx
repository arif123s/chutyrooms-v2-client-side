import React, { useEffect, useState } from 'react';
import { addMembershipCard } from "../../../../../redux/features/membershipCard/membershipCardSlice"
import { useSelector, useDispatch } from "react-redux";

import axios from 'axios';
import { useParams , useNavigate} from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import { setYear, setMonth, setDate, setHours, setMinutes, setSeconds } from 'date-fns';
import { useAddPaymentMethodMutation } from '../../../../../redux/features/admin/paymentMethod/paymentMethod.api';

const PaymentAdd = () => {

 const dispatch= useDispatch();
  const navigate= useNavigate();
  const [addPaymentMethod, { isLoading, isError, error }] = useAddPaymentMethodMutation();
 const[inputValue, setInputValue]= useState({name:'',is_active:'',view_order:''});

 const [validationErrors, setValidationErrors] = useState({});
 
 const handleInput = (e)=>{
     setInputValue({...inputValue, [e.target.name]: e.target.value});
 }
 const handleInputFile = (e)=>{
  // alert(1);
     setInputValue({...inputValue, 'image': e.target.files[0]});
 }

 const handleSubmit = async (e) =>{
    try {
        // Call the mutation function with the form data
        const result = await addPaymentMethod(inputValue);
        // Handle successful mutation
        console.log('Payment method added successfully:', result.data);
      } catch (error) {
        // Handle error
        console.error('Error adding payment method:', error);
      } 
 }
    return (
        <div className='paymentmethod-add-division'>
            <form className='paymentmethod-add-form' onSubmit={handleSubmit}>
            <div>
                <label className="property-input-title" htmlFor="name">
                  PaymentType Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.name} onChange={handleInput}
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>
            <div className="mb-3">
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
                 onChange={handleInputFile}
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
                    value={inputValue.view_order} onChange={ handleInput}
                  />

                  
            {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>}
            </div>

            <div>
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1"    onChange={handleInput} ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0" onChange={e => handleInput} ></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
               
            </div>
            {/* {validationErrors.is_active && <span className='validation-message'>{validationErrors.is_active}</span>} */}
            </div>

            <button className='country-save-btn'>Save</button>
            </form>
        </div>
    );
};

export default PaymentAdd;