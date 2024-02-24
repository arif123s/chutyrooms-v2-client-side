import React, { useEffect, useState } from 'react';

import arrowDownIcon from './../../../../assets/icons/arrow-down.svg';
import { useParams , useNavigate} from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AreaAdd = () => {

    const [Countrylist, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const[selectedDivision,setSelectedDivision] = useState('');
    const[DivisionList, setDivisionList] = useState([]);
    const[DistrictList,setDistrictList] = useState([]);
    // const {
   
    //   register,
    //   handleSubmit,
      
    //   formState: { errors },
    // } = useForm();
  
    const navigate = useNavigate();
    const [AreaField, setAreaField] = useState({
        name: "",
        district_id:"",
        view_order:"",
        is_active:""
    })

    const [validationErrors, setValidationErrors] = useState({});


    const changeAreaFieldHandler = (e) =>{
      setAreaField({
              ...AreaField,
              [e.target.name]: e.target.value
          });
      
          // console.log(userField);
      }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/country', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
            .then(response => response.json())
            .then(data => {
                
                setCountryList(data.data.data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleCountryChange = (e) => {

       
        const selectedCountryId = e.target.value;
       
        setSelectedCountry(selectedCountryId);
    
        // Fetch data for the second dropdown based on the selected country
        fetch(`http://127.0.0.1:8000/api/division/${selectedCountryId}/fetch` ,
        {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((response) => response.json())
          .then((data) =>  setDivisionList(data.data));

          setDistrictList([]);

          
      };


    const handleDivisionChange = (e) => {

       
        const selectedDivisionId = e.target.value;
       
        setSelectedDivision(selectedDivisionId);
    
        // Fetch data for the second dropdown based on the selected country
        fetch(`http://127.0.0.1:8000/api/district/${selectedDivisionId}/fetch` ,
        {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((response) => response.json())
          .then((data) =>  setDistrictList(data.data));

          
      };


      







      const onSubmit= async (e) =>{
        e.preventDefault();
      
   
       try{
         
        await axios.post('http://127.0.0.1:8000/api/area',
       
        AreaField, 
         {
         
           headers: {
             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
           }
         }

         
         
         )

         .then(response => {
           // Successful response
           console.log(response.data);
           if(response.data.status == 1)
           {
               navigate('/dashboard/area');
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

        <form className='country-add-form' onSubmit={onSubmit}>
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
                onChange={handleDivisionChange}
               
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
            </div>

            


            <label className="property-input-title block" htmlFor="country">
              District
            </label>
            <div className="property-input-div">
              <select
                id="district_id"
                className="property-input"
                name="district_id"
                onChange={e => changeAreaFieldHandler(e)}
               
              >
               
                {DistrictList.map(district => (
                    <option key={district.id} value={district.id}>
                        {district.name}
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
            {validationErrors.district_id && <span className='validation-message'>{validationErrors.district_id}</span>}

            <div>
            <label className="property-input-title" htmlFor="CountryName">
                 Area Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  onChange={e => changeAreaFieldHandler(e)} 
                 
                  
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
                  onChange={e => changeAreaFieldHandler(e)} 

               
                  // {...register("view_order", {
                  //   required: {
                  //     value: true,
                  //     message: "View  Order is required",
                  //   },
                  // })}
                />

          {/* <label className="">
                {errors.view_order?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.view_order?.message}
                  </span>
                )}
            </label> */}
            </div>

            {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>}
            <div>
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1"   onChange={e => changeAreaFieldHandler(e)}  ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0"   onChange={e => changeAreaFieldHandler(e)}  ></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
            </div>

            {validationErrors.is_active && <span className='validation-message'>{validationErrors.is_active}</span>}
            </div>

            <button className='country-save-btn'>Save</button>

            
          </div>

            </form>
           
        </div>
    );
};

export default AreaAdd;