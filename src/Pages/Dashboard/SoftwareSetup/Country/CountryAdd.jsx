import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router';

const CountryAdd = () => {

  const [CountryField, setCountryField] = useState({
    name: "",
    view_order:"",
    is_active:""
})
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
      
     await axios.post('http://127.0.0.1:8000/api/country',
    
      CountryField, 
      {
      
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
      
      );
        
       
    }

    catch (err){
            console.log("something went wrong");
    }

    navigate('/dashboard/country');
}


    return (
        <div className='country-add-division'>
      
            <form className='country-add-form' onSubmit={onSubmitChange}>

                <label className="property-input-title" htmlFor="CountryName">
                  Country Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  onChange={e => changeCountryFieldHandler(e)} required
                  
                />

                  <label className="property-input-title" htmlFor="view_order">
                    View Order
                  </label>
                  <input
                    className="input-box"
                    id="view_order"
                    name="view_order"
                    onChange={e => changeCountryFieldHandler(e)} required
                  />
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

            <button className='country-save-btn'>Save</button>


        


            </form>
        </div>
    );
};

export default CountryAdd;