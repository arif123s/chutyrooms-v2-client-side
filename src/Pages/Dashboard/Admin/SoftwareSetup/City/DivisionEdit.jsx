import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router';
import arrowDownIcon from './../../../../../assets/icons/arrow-down.svg'
import { toast } from 'react-toastify';
import { BASE_API } from '../../../../../BaseApi/BaseApi';

const DivisionEdit = () => {

    const {id}=useParams();
    const navigate = useNavigate();
    const [Countrylist, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
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
        fetch(`${BASE_API}/country`, {
          // fetch('http://127.0.0.1:8000/api/country', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCountryList(data.data.data);
          })
          .catch((error) => console.error("Error fetching data:", error));
    }, []);



    useEffect(()=>{
        fetchUser();
    },[id])

    const fetchUser = async()=>{
        const result = await axios.get(`${BASE_API}/division/${id}/edit`,
        // const result = await axios.get(`http://127.0.0.1:8000/api/division/${id}/edit`,
        {
      
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          setDivisionField(result.data.data);
          setSelectedCountry(result.data.data.country_id);
        
    }

    const changedivisionFieldHandler = (e) =>{
        setDivisionField({
            ...DivisionField,
            [e.target.name]: e.target.value
        });
      }


      const onSubmitChange = async (e) =>{
        e.preventDefault();
        await axios.put(`${BASE_API}/division/${id}`, DivisionField,
        // await axios.put(`http://127.0.0.1:8000/api/division/${id}`, DivisionField,
        {
      
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        
        
        
        .then(response => {
            // Successful response
            console.log(response.data);
            if(response.data.status == 1)
            {
                toast.success("Division added successfully!")
                navigate('/dashboard/division');
            }
            else{
                toast.error("Failed")
            }
      
        });
       
    }



    return (
        <div  className='country-add-division'>

             <form className='country-add-form' >

             <div className="property-input-div">
              <select
                id="country_id"
                className="property-input"
                name="country_id"
                value={selectedCountry}
                onChange={e => changedivisionFieldHandler(e)} required
               
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

                        <label className="property-input-title" htmlFor="CountryName">
                        Division Name
                        </label>
                        <input
                        className="input-box"
                        id="name"
                        name="name"
                        value={DivisionField.name}
                        onChange={e => changedivisionFieldHandler(e)}
                        required
                        
                        />

                        <label className="property-input-title" htmlFor="view_order">
                            View Order
                        </label>
                        <input
                            className="input-box"
                            id="view_order"
                            name="view_order"
                            value={DivisionField.view_order}
                            onChange={e => changedivisionFieldHandler(e)}
                            required
                        />
                        <div className="flex items-center gap-2">
                        <div>
                            <input type="radio" id="is_active" name="is_active" value="1"  checked={DivisionField.is_active == 1  } onChange={e => changedivisionFieldHandler(e)}
                        ></input>
                            <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                        </div>
                            
                        <div>
                        <input type="radio" id="is_active" name="is_active" value="0"  checked={DivisionField.is_active == 0  }
                            onChange={e => changedivisionFieldHandler(e)}></input>
                        <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                        </div>
                        </div>

                        <button className='country-save-btn' onClick={e=>onSubmitChange(e)}>Update</button>
            </form>
        </div>
    );
};

export default DivisionEdit;