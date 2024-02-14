import React, { useEffect, useState } from 'react';
import './Division.css';
import arrowDownIcon from './../../../../assets/icons/arrow-down.svg';
import { useParams , useNavigate} from 'react-router';
import axios from 'axios';

const DivisionAdd = () => {

    const [Countrylist, setCountryList] = useState([]);
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const [DivisionField, setDivisionField] = useState({
        name: "",
        country_id:"",
        view_order:"",
        is_active:""
    })

    const changeDivisionFieldHandler = (e) =>{
        setDivisionField({
              ...DivisionField,
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
                console.log(data)
                setCountryList(data.data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const onSubmitChange = async (e) =>{
         e.preventDefault();
       
    
        try{
          
         await axios.post('http://127.0.0.1:8000/api/division',
        
         DivisionField, 
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
                navigate('/dashboard/division');
            }
      
        });

         
        //   
            
           
        }
    
        catch (err){
                console.log("something went wrong");
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
                onChange={e => changeDivisionFieldHandler(e)} required
               
              >
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

            <div>
            <label className="property-input-title" htmlFor="CountryName">
                  Division Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  onChange={e => changeDivisionFieldHandler(e)} required
                  
                />
            </div>

            <div>
            <label className="property-input-title" htmlFor="CountryName">
                 View Order
                </label>
                <input
                  className="input-box"
                  id="view_order"
                  name="view_order"
                  onChange={e => changeDivisionFieldHandler(e)} required
                  
                />
            </div>

            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1"   onChange={e => changeDivisionFieldHandler(e)} required ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0"   onChange={e => changeDivisionFieldHandler(e)} required ></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
            </div>

            <button className='country-save-btn'>Save</button>

            
          </div>

            </form>
           
        </div>
    );
};

export default DivisionAdd;