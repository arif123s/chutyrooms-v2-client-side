import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router';

const CountryEdit = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    // const [isChecked, setIsChecked] = useState(false);
    
    const [CountryField, setCountryField] = useState({
        name: "",
        view_order:"",
        is_active:""
    })


    useEffect(()=>{
        fetchUser();
    },[id])

    const fetchUser = async()=>{
        const result = await axios.get(`http://127.0.0.1:8000/api/country/${id}/edit`,
        {
      
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
        setCountryField(result.data.data);
        
    }

    const changeCountryFieldHandler = (e) =>{
        setCountryField({
            ...CountryField,
            [e.target.name]: e.target.value
        });
      }

    // const handleRadioChange = (event) => {
    //     // Update the state when the radio button is changed
    //     // alert(1)
    //     setIsChecked(event.target.checked);

    //   };
      // alert(isChecked);

    const onSubmitChange = async (e) =>{
        e.preventDefault();
        await axios.put(`http://127.0.0.1:8000/api/country/${id}`, CountryField,
        {
      
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        navigate('/dashboard/country');
    }
    return (
        <div className='country-add-division'>
      <h2>Edit Country</h2>
            <form className='country-add-form' >

                <label className="property-input-title" htmlFor="CountryName">
                  Country Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  value={CountryField.name}
                  onChange={e => changeCountryFieldHandler(e)}
                  required
                  
                />

                  <label className="property-input-title" htmlFor="view_order">
                    View Order
                  </label>
                  <input
                    className="input-box"
                    id="view_order"
                    name="view_order"
                    value={CountryField.view_order}
                    onChange={e => changeCountryFieldHandler(e)}
                     required
                  />
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1"  checked={CountryField.is_active == 1  } onChange={e => changeCountryFieldHandler(e)}
                  ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0"  checked={CountryField.is_active == 0  }
                    onChange={e => changeCountryFieldHandler(e)}></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
            </div>

            <button className='country-save-btn' onClick={e=>onSubmitChange(e)}>Update</button>


        


            </form>
        </div>
    );
};

export default CountryEdit;