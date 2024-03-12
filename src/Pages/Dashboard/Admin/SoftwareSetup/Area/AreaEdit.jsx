import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router';
import arrowDownIcon from './../../../../../assets/icons/arrow-down.svg'
import { toast } from 'react-toastify';
import { BASE_API } from '../../../../BaseApi/BaseApi';

const AreaEdit = () => {


    const {id}=useParams();
    // console.log(id);
    const navigate = useNavigate();
    const [Countrylist, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const[DivisionList, setDivisionList] = useState([]);
    const[SelectedDivision,setSelectedDivision] = useState('');

    const[DistrictList, setDistrictList] = useState([]);
    const[SelectedDistrict,setSelectedDistrict] = useState('');
    const [AreaField, setAreaField] = useState({
        name: "",
        division_id:"",
        view_order:"",
        is_active:""
    })

    const changeAreaFieldHandler = (e) =>{
        // alert(e.target.value),
        setAreaField({
           
              ...AreaField,
              [e.target.name]: e.target.value
          });

        //   setSelectedDivision(e.target.value);
          setSelectedDistrict(e.target.value);
      
          // console.log(userField);
      }


      useEffect(()=>{
        fetchArea();
    },[id])

    const fetchArea = async()=>{
        const result = await axios.get(`${BASE_API}/area/${id}/edit`,
        // const result = await axios.get(`http://127.0.0.1:8000/api/area/${id}/edit`,
        {
      
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }).then(data => {

            // console.log(data.data.data)
    
          setAreaField(data.data.data);
          setSelectedCountry(data.data.data.district_with_trashed.division_with_trashed.country_id);
            
          setSelectedDivision(data.data.data.district_with_trashed.division_id);
          fetchDivision(data.data.data.district_with_trashed.division_with_trashed.country_id);

            setSelectedDistrict(data.data.data.district_id);
           
            fetchDistrict(data.data.data.district_with_trashed.division_id);
           });

   

          
        
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
            // console.log(data)
            setCountryList(data.data.data);

            // alert(selectedCountryId)
            // const selectedCountryId = selectedCountry;
          })
          .catch((error) => console.error("Error fetching data:", error));
    }, []);


    // useEffect(() => {
        const fetchDivision = async(country)=>{
    
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
      
        .then((data) =>  setDivisionList(data.data)); 
   
        }

        const fetchDistrict = async(division)=>{

            fetch(`${BASE_API}/district/${division}/fetch` ,
            // fetch(`http://127.0.0.1:8000/api/district/${division}/fetch` ,
            {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
              })
              .then((response) => response.json())
          
            .then((data) => setDistrictList(data.data)); 

            
       
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
            setDistrictList([]);
          
      };


      const handleDivisionChange = (e) => {

       
        const selectedDivisionId = e.target.value;
       
        setSelectedDivision(selectedDivisionId);
    
        // Fetch data for the second dropdown based on the selected country
        fetch(`${BASE_API}/district/${selectedDivisionId}/fetch` ,
        // fetch(`http://127.0.0.1:8000/api/district/${selectedDivisionId}/fetch` ,
        {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          .then((response) => response.json())
          .then((data) =>  setDistrictList(data.data)); 

          
      };





      const onSubmitChange = async (e) =>{
        e.preventDefault();
        await axios.put(`${BASE_API}/area/${id}`, AreaField,
        // await axios.put(`http://127.0.0.1:8000/api/area/${id}`, AreaField,
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
                toast.success("Area Updated successfully!")
                navigate('/dashboard/Area');
            }
            else{
                toast.error("Failed")
            }
      
        });
    }
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
       id="division_id"
       className="property-input"
       name="division_id"
       value={SelectedDivision}
       onChange={handleDivisionChange} required
       
       >
       {DivisionList.map(division => (
           <option key={division.id} value={division.id}>
               {division.name}
           </option>
       ))}
       </select>

       <img
       
       className="arrow-icon"
       src={arrowDownIcon}
       alt=""
       />
       </div>

       <label className="property-input-title" htmlFor="CountryName">
               District
       </label>
       <div className="property-input-div">

       <select
       id="district_id"
       className="property-input"
       name="district_id"
       value={SelectedDistrict}
       onChange={e => changeAreaFieldHandler(e)} required
       
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


               <label className="property-input-title" htmlFor="CountryName">
               Area Name
               </label>
               <input
               className="input-box"
               id="name"
               name="name"
               value={AreaField.name}
               onChange={e => changeAreaFieldHandler(e)}
               required
               
               />

               <label className="property-input-title" htmlFor="view_order">
                   View Order
               </label>
               <input
                   className="input-box"
                   id="view_order"
                   name="view_order"
                   value={AreaField.view_order}
                   onChange={e => changeAreaFieldHandler(e)}
                   required
               />
               <div className="flex items-center gap-2">
               <div>
                   <input type="radio" id="is_active" name="is_active" value="1"  checked={AreaField.is_active == 1  } onChange={e => changeAreaFieldHandler(e)}
               ></input>
                   <label className="cursor-pointer text-gray-700 ml-2">Active</label>
               </div>
                   
               <div>
               <input type="radio" id="is_active" name="is_active" value="0"  checked={AreaField.is_active == 0  }
                   onChange={e => changeAreaFieldHandler(e)}></input>
               <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
               </div>
               </div> 

               <button className='country-save-btn' onClick={e=>onSubmitChange(e)}>Update</button>
</form> 
   </div>
    );
};

export default AreaEdit;