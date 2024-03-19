import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import { BASE_ASSET_API } from '../../../../../BaseApi/AssetUrl';

const MembershipEdit = () => {


  const {id}=useParams();
    const navigate = useNavigate();
    // const [isChecked, setIsChecked] = useState(false);
    
    const [Membership, setMembership] = useState({
        name: "",
        description: "",
        image: null,
        amount_type: "",
        amount: "",
        price: "",
        view_order:"",
        is_active:""
    })


    useEffect(()=>{
      fetchMembership();
    },[id])

    const fetchMembership = async()=>{
        const result = await axios.get(`${BASE_API}/memberships/${id}/edit`,
        // const result = await axios.get(`http://127.0.0.1:8000/api/country/${id}/edit`,
        {
      
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });

          console.log(result.data.data);
          setMembership(result.data.data);
        
    }
    return (
        <div className='membership-add-division'>
           <form className='membership-add-form'>
           <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Membership Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                  value={Membership.name}
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Description
                </label>
                <input
                  className="input-box"
                  id="description"
                  name="description"
                  value={Membership.description}
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Amount Type
                </label>
                <input
                  className="input-box"
                  id="amount_type"
                  name="amount_type"
                  value={Membership.amount_type}
               
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Amount
                </label>
                <input
                  className="input-box"
                  id="amount"
                  name="amount"
                  value={Membership.amount}
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div class="mb-3">
              <label
                for="image">
                 Membership Card Image
                </label>
                <img src={`${BASE_ASSET_API}/storage/images/Membership/${Membership.image}`}></img>
              <input
                className="input-box"
                type="file"
                // id="image"
                // name="image"
                accept="image/*"
               
                //  onChange={ handleInputFile}
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
                    value={Membership.view_order}
                    // onChange={e => changeCountryFieldHandler(e)} 
                  />

                  
            {/* {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>} */}
            </div>


            <div>
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1"  checked={Membership.is_active == 1 }  onChange={e => changeCountryFieldHandler(e)} ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0" checked={Membership.is_active == 0 } onChange={e => changeCountryFieldHandler(e)} ></input>
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

export default MembershipEdit;