import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import { BASE_ASSET_API } from '../../../../../BaseApi/AssetUrl';
import { addYears, addMonths, addDays, addHours, addMinutes, addSeconds } from 'date-fns';

const MembershipEdit = () => {


  const { id } = useParams();
  const navigate = useNavigate();
  // const [isChecked, setIsChecked] = useState(false);



  //   const calculateValidity = () => {
  //     let expirationDate = new Date();
  //     expirationDate = addYears(expirationDate, validity.years);
  //     expirationDate = addMonths(expirationDate, validity.months);
  //     expirationDate = addDays(expirationDate, validity.days);
  //     expirationDate = addHours(expirationDate, validity.hours);
  //     expirationDate = addMinutes(expirationDate, validity.minutes);
  //     expirationDate = addSeconds(expirationDate, validity.seconds);
  //     return expirationDate;
  // };
  const [Membership, setMembership] = useState({
    name: "",
    description: "",
    image: null,
    amount_type: "",
    amount: "",
    price: "",
    validity_year: 0,
    validity_month: 0,
    validity_day: 0,
    validity_hour: 0,
    validity_minute: 0,
    validity_second: 0,
    // validity_time: calculateValidity(),
    view_order: "",
    is_active: ""
  })


  // const [imageFile, setImageFile] = useState('');

  const [validationErrors, setValidationErrors] = useState({});


  useEffect(() => {
    fetchMembership();
  }, [id])

  const fetchMembership = async () => {
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

  const changeMembershipFieldHandler = (e) => {
    // alert(e.target.type === 'file');
    // console.log(e.target.type === 'file' ? e.target.files[0] : e.target.value);
    setMembership({
      ...Membership,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
    });
  }
  // const handleInputFile = (e) => {
  //   // alert(1);
  //   setImageFile(e.target.files[0]);
  // }


  // const onSubmitChange = async (e) =>{
  //     e.preventDefault();
  //     await axios.put(`${BASE_API}/memberships/${id}`, Membership,

  //     {     
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     navigate('/dashboard/Membership');
  // }

  const onSubmitChange = async (e) => {


    e.preventDefault();
    try {
      // console.log(Membership);
      // alert(id);
      const formData = new FormData();

      formData.append('_method', 'PUT');
      // formData.append('va', calculateValidity());

      // Append each field of membershipData to the formData
      Object.keys(Membership).forEach(key => {
        if (key != 'image') {
          formData.append(key, Membership[key]);
        }
      });
      if ((Membership['image'] instanceof File)) {
        formData.append('image', Membership['image']);
      }
      console.log('Form Data:', formData);

      axios.post(
        `${BASE_API}/memberships/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            // 'Content-Type': 'application/json',
          },
        }
      )

        .then((response) => {
          console.log(response.data);
          if (response.data.status == 1) {
            navigate("/dashboard/membership");
          }
        });
    }

    catch (err) {
      // console.log(err.response.data.errors);
      setValidationErrors(err)
    }
  }
  return (
    <div className='membership-add-division'>
      <form className='membership-add-form' onSubmit={onSubmitChange}>
        <div>
          <label className="property-input-title" htmlFor="name">
            Membership Name
          </label>
          <input
            className="input-box"
            id="name"
            name="name"
            value={Membership.name}
            onChange={e => changeMembershipFieldHandler(e)}

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
            onChange={e => changeMembershipFieldHandler(e)}

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

            onChange={e => changeMembershipFieldHandler(e)}

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
            onChange={e => changeMembershipFieldHandler(e)}

          />

          {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
        </div>

        <div>
          <label className="property-input-title" htmlFor="CountryName">
            Price
          </label>
          <input
            className="input-box"
            id="price"
            name="price"
            value={Membership.price}
            onChange={e => changeMembershipFieldHandler(e)}

          />

          {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
        </div>

        <div className='flex space-x-[5px]'>
          <div>
            <label className="property-input-title" htmlFor="amount">
              Validation Year
            </label>
            <input
              type='number'
              className="input-box"
              id="validity_year"
              name="validity_year"
              max='10'
              //   onChange={e => changeCountryFieldHandler(e)} 
              value={Membership.validity_year} onChange={e => changeMembershipFieldHandler(e)}
            />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
          </div>

          <div>
            <label className="property-input-title" htmlFor="amount">
              Validation Month
            </label>
            <input
              type='number'
              className="input-box"
              id="validity_month"
              name="validity_month"
              max='11'
              //   onChange={e => changeCountryFieldHandler(e)} 
              value={Membership.validity_month} onChange={e => changeMembershipFieldHandler(e)}
            />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
          </div>
          <div>
            <label className="property-input-title" htmlFor="amount">
              Validation Day
            </label>
            <input
              type='number'
              className="input-box"
              id="validity_day"
              name="validity_day"
              max='29'
              //   onChange={e => changeCountryFieldHandler(e)} 
              value={Membership.validity_day} onChange={e => changeMembershipFieldHandler(e)}
            />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
          </div>
          <div>
            <label className="property-input-title" htmlFor="amount">
              Hour
            </label>
            <input
              type='number'
              className="input-box"
              id="validity_hour"
              name="validity_hour"
              max='23'
              //   onChange={e => changeCountryFieldHandler(e)} 
              value={Membership.validity_hour} onChange={e => changeMembershipFieldHandler(e)}
            />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
          </div>
          <div>
            <label className="property-input-title" htmlFor="amount">
              Minute
            </label>
            <input
              type='number'
              className="input-box"
              id="validity_minute"
              name="validity_minute"
              max='59'
              //   onChange={e => changeCountryFieldHandler(e)} 
              value={Membership.validity_minute} onChange={e => changeMembershipFieldHandler(e)}
            />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
          </div>

          <div>
            <label className="property-input-title" htmlFor="amount">
              Second
            </label>
            <input
              type='number'
              className="input-box"
              id="validity_second"
              name="validity_second"
              max='59'
              //   onChange={e => changeCountryFieldHandler(e)} 
              value={Membership.validity_second} onChange={e => changeMembershipFieldHandler(e)}
            />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="image">
            Membership Card Image
          </label>
          {Membership && Membership.image &&<img className='w-[200px]' src={`${BASE_ASSET_API}/storage/images/Membership/${Membership.image}`}></img>}
          <input
            className="input-box"
            type="file"
            // id="image"
            name="image"
            // accept="image/*"

            // onChange={handleInputFile}
            onChange={e => changeMembershipFieldHandler(e)}
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
            onChange={e => changeMembershipFieldHandler(e)}
          />


          {/* {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>} */}
        </div>


        <div>
          <div className="flex items-center gap-2">
            <div>
              <input type="radio" id="is_active" name="is_active" value="1" checked={Membership.is_active == 1} onChange={e => changeMembershipFieldHandler(e)} ></input>
              <label className="cursor-pointer text-gray-700 ml-2">Active</label>
            </div>

            <div>
              <input type="radio" id="is_active" name="is_active" value="0" checked={Membership.is_active == 0} onChange={e => changeMembershipFieldHandler(e)} ></input>
              <label className="cursor-pointer text-gray-700 ml-2">Inactive</label>
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