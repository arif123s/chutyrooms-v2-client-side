import React, { useEffect, useState } from 'react';
import { addMembershipCard } from "../../../../../redux/features/membershipCard/membershipCardSlice"
import { useSelector, useDispatch } from "react-redux";

import axios from 'axios';
import {  useNavigate} from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import { setYear, setMonth, setDate, setHours, setMinutes, setSeconds } from 'date-fns';
const MembershipAdd = () => {

  const dispatch= useDispatch();
  const navigate= useNavigate();

  const [validity, setValidity] = useState({
    years: 1,
    months: 11,
    days: 2,
    hours: 3,
    minutes: 5,
    seconds: 4
  });


  // const { isSuccess } = useSelector( (state)=> state.membershipCards);
 const[inputValue, setInputValue]= useState({name:'', description:'', image:null, amount_type:'' , amount:'',price:'', validity_year:'',validity_month:'',validity_day:'',validity_hour:'',validity_minute:'',validity_second:'',is_active:'',view_order:''});

 const [validationErrors, setValidationErrors] = useState({});
 
 const handleInput = (e)=>{
     setInputValue({...inputValue, [e.target.name]: e.target.value});
 }
 const handleInputFile = (e)=>{
  // alert(1);
     setInputValue({...inputValue, 'image': e.target.files[0]});
 }
//  const handleSubmit=(e)=>{
//      e.preventDefault();
//      dispatch(addMembershipCard(inputValue))
//      console.log(inputValue);

//      setTimeout( ()=>{
//          navigate("/dashboard/membership");
//      },2000);

//  }


const handleSubmit = async (e) =>{
  
  e.preventDefault();
  console.log('Form Data:', inputValue);



  try{
    console.log(inputValue);
   await axios.post(`${BASE_API}/memberships`, inputValue,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    )

    .then((response) => {
      console.log(response.data);
      if (response.data.status == 1) {
        navigate("/dashboard/membership");
      }
    });
  }

 catch (err){
  // console.log(err.response.data.errors);
  setValidationErrors(err.response.data.errors)
 }
}
    return (
        <div className='membership-add-division'>

                {/* {
                    isSuccess!=='' && <p className="text-primary"> { isSuccess.success} </p>
                } */}
           <form className='membership-add-form' onSubmit={handleSubmit}>
           <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Membership Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.name} onChange={ handleInput}
                  
                />

            {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>}
            </div>

            <div className='mt-[14px]'>
                <label className="property-input-title" htmlFor="description">
                  Description
                </label>
                <input
                  className="input-box"
                  id="description"
                  name="description"
              
                value={inputValue.description} onChange={ handleInput}
                  
                />

            {validationErrors.description && <span className='validation-message'>{validationErrors.description}</span>}
            </div>

            <div className='mt-[14px]'>
                <label className="property-input-title" htmlFor="amount_type">
                  Amount Type
                </label>
                <input
                  className="input-box"
                  id="amount_type"
                  name="amount_type"
               
                value={inputValue.amount_type} onChange={ handleInput}
                />

            {validationErrors.amount_type && <span className='validation-message'>{validationErrors.amount_type}</span>}
            </div>

            <div className='mt-[14px]'>
                <label className="property-input-title" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="input-box"
                  id="amount"
                  name="amount"
                
                value={inputValue.amount} onChange={ handleInput}
                />

            {validationErrors.amount && <span className='validation-message'>{validationErrors.amount}</span>}
            </div>

            <div className='mt-[14px]'>
                <label className="property-input-title" htmlFor="amount">
                  Price
                </label>
                <input
                  className="input-box"
                  id="price"
                  name="price"
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.price} onChange={ handleInput}
                />

            {validationErrors.price && <span className='validation-message'>{validationErrors.price}</span>}
            </div>
            <div className='flex gap-[10px] mt-[14px]'>
            <div className=''>
                <label className="property-input-title" htmlFor="amount">
                  Validation Year
                </label>
                <input
                type='number'
                  className="input-box mt-10"
                  id="validity_year"
                  name="validity_year"
                  max = '10'
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.validity_year} onChange={ handleInput}
                />

            {validationErrors.validity_year && <span className='validation-message'>{validationErrors.validity_year}</span>}
            </div>

            <div>
                <label className="property-input-title" htmlFor="amount">
                  Validation Month
                </label>
                <input
                type='number'
                  className="input-box"
                  id="validity_month"
                  name="validity_month"
                  max = '11'
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.validity_month} onChange={handleInput}
                />

            {validationErrors.validity_month && <span className='validation-message'>{validationErrors.validity_month}</span>}
            </div>
            <div>
                <label className="property-input-title" htmlFor="amount">
                  Validation Day
                </label>
                <input
                type='number'
                  className="input-box"
                  id="validity_day"
                  name="validity_day"
                  max = '29'
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.validity_day} onChange={ handleInput}
                />

            {validationErrors.validity_day && <span className='validation-message'>{validationErrors.validity_day}</span>}
            </div>
            <div>
                <label className="property-input-title" htmlFor="amount">
                Hour
                </label>
                <input
                type='number'
                  className="input-box"
                  id="validity_hour"
                  name="validity_hour"
                  max = '23'
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.validity_hour} onChange={ handleInput}
                />

            {validationErrors.validity_hour && <span className='validation-message'>{validationErrors.validity_hour}</span>}
            </div>
            <div>
                <label className="property-input-title" htmlFor="amount">
                 Minute
                </label>
                <input
                type='number'
                  className="input-box"
                  id="validity_minute"
                  name="validity_minute"
                  max = '59'
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.validity_minute} onChange={ handleInput}
                />

            {validationErrors.validity_minute && <span className='validation-message'>{validationErrors.validity_minute}</span>}
            </div>

            <div>
                <label className="property-input-title" htmlFor="amount">
                  Second
                </label>
                <input
                type='number'
                  className="input-box"
                  id="validity_second"
                  name="validity_second"
                  max = '59'
                //   onChange={e => changeCountryFieldHandler(e)} 
                value={inputValue.validity_second} onChange={ handleInput}
                />

            {validationErrors.validity_second && <span className='validation-message'>{validationErrors.validity_second}</span>}
            </div>
            </div>

            <div className="mb-3 mt-[14px]">
              <label
                htmlFor="image">
                 Membership Card Image
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
              {validationErrors.image && <span className='validation-message'>{validationErrors.image}</span>}

            <div className="mb-3 mt-[14px]">
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
                    <input type="radio" id="is_active" name="is_active" value="1"    onChange={ handleInput} ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0" onChange={e => handleInput} ></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
               
            </div>
            {validationErrors.is_active && <span className='validation-message'>{validationErrors.is_active}</span>}
            </div>
            

            <button className='country-save-btn'>Save</button>

           
            
            </form> 
        </div>
    );
};

export default MembershipAdd;