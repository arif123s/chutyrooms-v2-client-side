import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router';
import arrowDownIcon from './../../../../assets/icons/arrow-down.svg'
import { toast } from 'react-toastify';
import { BASE_API } from '../../../../BaseApi/BaseApi';

const DistrictEdit = () => {

    const {id}=useParams();
    // console.log(id);
    const navigate = useNavigate();
    const [Countrylist, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const[DivisionList, setDivisionList] = useState([]);
    const[SelectedDivision,setSelectedDivision] = useState('');
    const [DistrictField, setDistrictField] = useState({
        name: "",
        division_id:"",
        view_order:"",
        is_active:""
    })

    const changeDistrictFieldHandler = (e) =>{
        // alert(e.target.value),
        setDistrictField({
           
              ...DistrictField,
              [e.target.name]: e.target.value
          });

          setSelectedDivision(e.target.value);
      
          // console.log(userField);
      }


      useEffect(()=>{
        fetchUser();
    },[id])

    const fetchUser = async()=>{
        const result = await axios.get(`${BASE_API}/district/${id}/edit`,
        // const result = await axios.get(`http://127.0.0.1:8000/api/district/${id}/edit`,
        {
      
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then(data => {
            console.log(data.data.data, '7');
            setDistrictField(data.data.data);
          setSelectedCountry(data.data.data.division.country_id);
        //   alert(result.data.data.division_id)
          setSelectedDivision(data.data.data.division_id);
            fetchDivision(data.data.data.division.country_id);
           });

        //   console.log(result.data.data);
        //   setDistrictField(result.data.data);
        //   setSelectedCountry(result.data.data.division.country_id);
        // //   alert(result.data.data.division_id)
        //   setSelectedDivision(result.data.data.division_id);

          
        
    }
    // alert(selectedCountry);
    
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

            // alert(selectedCountryId)
            // const selectedCountryId = selectedCountry;
          })
          .catch((error) => console.error("Error fetching data:", error));
    }, []);


    // useEffect(() => {
        const fetchDivision = async(country)=>{
    // alert(selectedCountry);
        // Fetch data for the second dropdown based on the selected country
        fetch(`${BASE_API}/division/${country}/fetch` ,
        // fetch(`http://127.0.0.1:8000/api/division/${country}/fetch` ,
        {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((response) => response.json())
        //   .then((data) => console.log(data.data),setDivisionList(data.data), setSelectedDivision(SelectedDivision));

        // .then((response) => response.json())
        .then((data) =>  setDivisionList(data.data)); 
    // }, []);
        }


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
        await axios.put(`${BASE_API}/district/${id}`, DistrictField,
        // await axios.put(`http://127.0.0.1:8000/api/district/${id}`, DistrictField,
        {
      
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        
        
        
        .then(response => {
            // Successful response
            // console.log(response.data);
            if(response.data.status == 1)
            {
                toast.success("District Updated successfully!")
                navigate('/dashboard/district');
            }
            else{
                toast.error("Failed")
            }
      
        });
       
    }

 

    // const changedivisionFieldHandler = (e) =>{
    //     setDistrictField({
    //         ...DistrictField,
    //         [e.target.name]: e.target.value
    //     });
    //   }

    
    return (
        <div className='country-add-division'>
             <form className='country-add-form'>

            <label className="property-input-title" htmlFor="CountryName">
                    Country
            </label>

            <div className="property-input-div">


            <select
            id="country_id"
            className="property-input"
            name="country_id"
            value={selectedCountry}
            onChange={handleCountryChange}required
            
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
                    Division
            </label>
            <div className="property-input-div">

            <select
            id="country_id"
            className="property-input"
            name="division_id"
            value={SelectedDivision}
            onChange={e => changeDistrictFieldHandler(e)} required
            
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

                    <label className="property-input-title" htmlFor="CountryName">
                    District Name
                    </label>
                    <input
                    className="input-box"
                    id="name"
                    name="name"
                    value={DistrictField.name}
                    onChange={e => changeDistrictFieldHandler(e)}
                    required
                    
                    />

                    <label className="property-input-title" htmlFor="view_order">
                        View Order
                    </label>
                    <input
                        className="input-box"
                        id="view_order"
                        name="view_order"
                        value={DistrictField.view_order}
                        onChange={e => changeDistrictFieldHandler(e)}
                        required
                    />
                    <div className="flex items-center gap-2">
                    <div>
                        <input type="radio" id="is_active" name="is_active" value="1"  checked={DistrictField.is_active == 1  } onChange={e => changeDistrictFieldHandler(e)}
                    ></input>
                        <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                    </div>
                        
                    <div>
                    <input type="radio" id="is_active" name="is_active" value="0"  checked={DistrictField.is_active == 0  }
                        onChange={e => changeDistrictFieldHandler(e)}></input>
                    <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                    </div>
                    </div> 

                    <button className='country-save-btn' onClick={e=>onSubmitChange(e)}>Update</button>
</form> 
        </div>
    );
};

export default DistrictEdit;