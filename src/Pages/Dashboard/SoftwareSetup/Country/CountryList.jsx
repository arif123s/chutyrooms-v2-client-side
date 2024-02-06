import React, { useEffect, useState } from 'react';
import "./Country.css";
import EditIcon from './../../../../assets/icons/edit-icon.svg';
import DeleteIcon from './../../../../assets/icons/delete-icon.svg'
import { json } from 'react-router-dom';
const CountryList = () => {

    const [Countrylist, setCountry] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/country')
        .then(res=>res.json())
        .then(data=>console.log(data))
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch('http://127.0.0.1:8000/api/country');
    //       const jsonData = await response.json();
    //       console.log(response);
    //       setCountry(jsonData);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   fetchData();
    }, []);


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
                             <td><a className='active-inactive-btn'>{country.is_active}</a></td>
                             <td className='country-action-div'>
                                <a className='edit-btn'><img src={EditIcon}></img></a>
                               
                                <a className='delete-btn'><img src={DeleteIcon}></img></a>
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