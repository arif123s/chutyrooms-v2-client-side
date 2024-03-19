import React, { useEffect, useState } from 'react';
import { addMembershipCard } from "../../../../../redux/features/membershipCard/membershipCardSlice"
import { useSelector, useDispatch } from "react-redux";

import axios from 'axios';
import { useParams , useNavigate} from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
const MembershipAdd = () => {

  const dispatch= useDispatch();
  const navigate= useNavigate();

  // const { isSuccess } = useSelector( (state)=> state.membershipCards);
 const[inputValue, setInputValue]= useState({name:'', description:'', image:null,amount_type:'' , amount:'',price:'',is_active:'',view_order:''});
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
  setValidationErrors(err)
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

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="description">
                  Description
                </label>
                <input
                  className="input-box"
                  id="description"
                  name="description"
              
                value={inputValue.description} onChange={ handleInput}
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="amount_type">
                  Amount Type
                </label>
                <input
                  className="input-box"
                  id="amount_type"
                  name="amount_type"
               
                value={inputValue.amount_type} onChange={ handleInput}
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="input-box"
                  id="amount"
                  name="amount"
                
                value={inputValue.amount} onChange={ handleInput}
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
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

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div class="mb-3">
              <label
                for="image">
                 Membership Card Image
                </label>
              <input
                className="input-box"
                type="file"
                // id="image"
                // name="image"
                accept="image/*"
                // value={inputValue.image}
                 onChange={ handleInputFile}
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

                  
            {/* {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>} */}
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
            {/* {validationErrors.is_active && <span className='validation-message'>{validationErrors.is_active}</span>} */}
            </div>
            

            <button className='country-save-btn'>Save</button>

           
            
            </form> 
        </div>
    );
};

export default MembershipAdd;