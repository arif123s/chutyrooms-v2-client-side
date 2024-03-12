import React, { useEffect, useState } from 'react';
import "./Country.css";
import EditIcon from '../../../../../assets/icons/edit-icon.svg';
import DeleteIcon from '../../../../../assets/icons/delete-icon.svg';
import RestoreIcon from '../../../../../assets/icons/restore_icon_green.svg';
import { Link } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Loading from '../../../Common/Includes/Loading/Loading';
import { BASE_API } from '../../../../BaseApi/BaseApi';
const CountryList = () => {

  const [Countrylist, setCountry] = useState([]);

  useEffect(() => {

    fetch(`${BASE_API}/country`, {
      // fetch('http://127.0.0.1:8000/api/country', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCountry(data.data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
    [Countrylist]);


  const handleDelete = async (id) => {
    console.log(id);

    await axios.delete(`${BASE_API}/country/` + id,
      // await axios.delete("http://127.0.0.1:8000/api/country/" + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    setCountry(Countrylist.map(country => (country.id == id ? { ...country, deleted_at: !null } : country)));

    // const newCountryData=Countrylist.filter((item)=>{
    //     return(
    //         item.id !== id
    //     )
    // })

    // setCountry(newCountryData);
    navigate('/dashboard/country');
  }


  const handleRestore = async (id) => {
    try {
      // alert(id)
      await axios.put(`${BASE_API}/country/${id}/restore`,
      // await axios.put(`http://127.0.0.1:8000/api/country/${id}/restore`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }

        }
      ); // Replace with your actual API endpoint
      // If successful, update the state to reflect the restoration
      setCountry(Countrylist.map(country => (country.id == id ? { ...country, deleted_at: null } : country)));
      navigate('/dashboard/country');
    } catch (error) {
      console.error('Error restoring item:', error);
    }
  };


  return (
    <div>

      <div className='country-list'>

        <table className='custom-table'>
          <thead className='country-tbl-head'>
            <th>Country Name</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </thead>

          <tbody className='gap-y-5'>
            {Countrylist.map((country) => (
              <tr key={country.id}>
                <td>{country.name}</td>
                <td>{country.view_order}</td>
                <td><a className='active-inactive-btn'>{country.is_active == true ? 'Active' : 'Inactive'}</a></td>
                <td className='country-action-div'>
                  <Link className='edit-btn' to={`/dashboard/country/countryEdit/${country.id}`}><img className='edit-delete-icon' src={EditIcon} alt='image'></img></Link>

                  {country.deleted_at == null ? <a className='delete-btn' onClick={() => handleDelete(country.id)}><img className='edit-delete-icon' src={DeleteIcon} alt='image'></img></a> : <a className='restore-btn' onClick={() => handleRestore(country.id)}><img className='edit-delete-icon' src={RestoreIcon} alt='image'></img></a>}

                </td>
              </tr>
            ))}

            {/* <tr>
                             <td>India</td>
                             <td>2</td>
                             <td><a className='active-inactive-btn'>Active</a></td>
                             <td className='country-action-div'>
                                <a className='edit-btn'><img src={EditIcon}></img></a>
                               
                                <a className='delete-btn'><img src={DeleteIcon}></img></a>
                             </td>
                            </tr> */}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default CountryList;