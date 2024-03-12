import React, { useEffect, useState } from 'react';

import arrowDownIcon from './../../../../../assets/icons/arrow-down.svg';
import { useParams , useNavigate} from 'react-router';
import axios from 'axios';

import './District.css'; 
import { BASE_API } from '../../../../BaseApi/BaseApi';

const DistrictAdd = () => {

    const [Countrylist, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const[DivisionList, setDivisionList] = useState([]);
    const navigate = useNavigate();
    const [DistrictField, setDistrictField] = useState({
        name: "",
        division_id:"",
        view_order:"",
        is_active:""
    })
    const [validationErrors, setValidationErrors] = useState({});


    const changeDistrictFieldHandler = (e) =>{
        setDistrictField({
              ...DistrictField,
              [e.target.name]: e.target.value
          });
      
          // console.log(userField);
      }

    useEffect(() => {
        fetch(`${BASE_API}/country`, {
          // fetch('http://127.0.0.1:8000/api/country', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setCountryList(data.data.data);
          })
          .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const handleCountryChange = (e) => {

       
        const selectedCountryId = e.target.value;
       
        setSelectedCountry(selectedCountryId);
    
        // Fetch data for the second dropdown based on the selected country
        fetch(`${BASE_API}/division/${selectedCountryId}/fetch` ,
        // fetch(`http://127.0.0.1:8000/api/division/${selectedCountryId}/fetch` ,
        {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((response) => response.json())
          .then((data) =>  setDivisionList(data.data));

          
      };




      const onSubmitChange = async (e) =>{
        e.preventDefault();
      
   
       try{
         
        await axios.post(`${BASE_API}/district`,
            // await axios.post('http://127.0.0.1:8000/api/district',

            DistrictField,
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
              navigate("/dashboard/district");
            }
          });

        
       //   
           
          
       }
   
       catch (err){
        // console.log(err.response.data.errors);
        setValidationErrors(err.response.data.errors)
       }

      

       // 
   }
    return (
        <div className='country-add-division'>

        <form className='country-add-form' onSubmit={onSubmitChange} >
        <div className="">
            <label className="property-input-title block" htmlFor="country">
              Country
            </label>
            <div className="property-input-div">
              <select
                id="country_id"
                className="property-input"
                name="country_id"
                onChange={handleCountryChange} 
               
              >
                 <option>Select Country</option>
                {Countrylist.map(country => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
              </select>
            
              <img
                // className="absolute top-[14px] right-[12px] arrow-icon"
                className="arrow-icon"
                src={arrowDownIcon}
                alt=""
              />
            </div>
            <label className="property-input-title block" htmlFor="country">
              Division
            </label>
            <div className="property-input-div">
              <select
                id="division_id"
                className="property-input"
                name="division_id"
                onChange={e => changeDistrictFieldHandler(e)} 
               
              >
               
                {DivisionList.map(division => (
                    <option key={division.id} value={division.id}>
                        {division.name}
                    </option>
                ))}
              </select>
            
              <img
                // className="absolute top-[14px] right-[12px] arrow-icon"
                className="arrow-icon"
                src={arrowDownIcon}
                alt=""
              />

              {validationErrors.division_id && <span className='validation-message'>{validationErrors.division_id}</span>}
            </div>

            <div>
            <label className="property-input-title" htmlFor="CountryName">
                  District Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  onChange={e => changeDistrictFieldHandler(e)}
                  
                />

            {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>}
            </div>

            <div>
            <label className="property-input-title" htmlFor="CountryName">
                 View Order
                </label>
                <input
                  className="input-box"
                  id="view_order"
                  name="view_order"
                  onChange={e => changeDistrictFieldHandler(e)}
                  
                />

{validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>}
            </div>


        <div>
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1"   onChange={e => changeDistrictFieldHandler(e)} ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0"   onChange={e => changeDistrictFieldHandler(e)}  ></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
            </div>

            {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>}

            </div>

            

            <button className='country-save-btn'>Save</button>

            
          </div>

            </form>
           
        </div>
    );
};

export default DistrictAdd;