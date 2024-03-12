import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router';
import { BASE_API } from '../../../../BaseApi/BaseApi';

const CountryAdd = () => {

  const [CountryField, setCountryField] = useState({
    name: "",
    view_order:"",
    is_active:""
})

const [validationErrors, setValidationErrors] = useState({});
const navigate = useNavigate();

const changeCountryFieldHandler = (e) =>{
  setCountryField({
        ...CountryField,
        [e.target.name]: e.target.value
    });

    // console.log(userField);
}

const onSubmitChange = async (e) =>{

 
 
    e.preventDefault();
   

    try{
      
     await axios.post(`${BASE_API}/country`,
         //  await axios.post('http://127.0.0.1:8000/api/country',

         CountryField,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
           },
         }
       )

       .then((response) => {
         // Successful response
         console.log(response.data);
         if (response.data.status == 1) {
           navigate("/dashboard/country");
         }
       });
        
       
    }

    catch (err){
      console.log(err.response.data.errors);
      setValidationErrors(err.response.data.errors)
    }

    
}


    return (
        <div className='country-add-division'>
      
            <form className='country-add-form' onSubmit={onSubmitChange}>
            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Country Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>}
            </div>
                  <label className="property-input-title" htmlFor="view_order">
                    View Order
                  </label>
                  <input
                    className="input-box"
                    id="view_order"
                    name="view_order"
                    onChange={e => changeCountryFieldHandler(e)} 
                  />

                  
            {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>}
            <div>
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1" onChange={e => changeCountryFieldHandler(e)} ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0" onChange={e => changeCountryFieldHandler(e)} ></input>
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

export default CountryAdd;