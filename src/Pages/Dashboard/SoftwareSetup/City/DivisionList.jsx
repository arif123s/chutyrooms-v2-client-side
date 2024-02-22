
import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import EditIcon from './../../../../assets/icons/edit-icon.svg';
import DeleteIcon from './../../../../assets/icons/delete-icon.svg';
import RestoreIcon from './../../../../assets/icons/restore_icon_green.svg';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router';

const DivisionList = () => {

    const [DivisionList, setDivision] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       
        fetch('http://127.0.0.1:8000/api/division', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
})
.then(data => {
    // console.log(data)
    setDivision(data.data.data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
},
[]);


const handleDelete = async (id) => {
  // console.log(id);

  await axios.delete("http://127.0.0.1:8000/api/division/" + id,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }

    }
  );

  setDivision(DivisionList.map(division => (division.id == id ? { ...division, deleted_at: !null } : division)));

  // const newCountryData=Countrylist.filter((item)=>{
  //     return(
  //         item.id !== id
  //     )
  // })

  // setCountry(newCountryData);
  navigate('/dashboard/division');
}


const handleRestore = async (id) => {
  try {
    // alert(id)
    await axios.put(`http://127.0.0.1:8000/api/division/${id}/restore`,
      null,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }

      }
    ); // Replace with your actual API endpoint
    // If successful, update the state to reflect the restoration
    setDivision(DivisionList.map(division => (division.id == id ? { ...division, deleted_at: null } : division)));
    navigate('/dashboard/division');
  } catch (error) {
    console.error('Error restoring item:', error);
  }
};





    return (
         <div className='country-list'>
            
            <table className='custom-table'>
                <thead className='country-tbl-head'>
                    <th>Division Name</th>
                    <th>Country Name</th>
                    <th>View Order</th>
                    <th>Status</th>
                    <th>Action</th>
                </thead>

                <tbody className='gap-y-5'>
                {DivisionList.map((division) => (
                    <tr key={division.id}>
                     <td>{division.name}</td>
                     <td>{division.country.name}</td>
                     <td>{division.view_order}</td>
                     <td><a className='active-inactive-btn'>{division.is_active == true ? 'Active' : 'Inactive'}</a></td>
                     <td className='country-action-div'>
                                <Link className='edit-btn' to={`/dashboard/division/divisionEdit/${division.id}`}><img className='edit-delete-icon' src={EditIcon}></img></Link>
                        
                               {division.deleted_at == null? <a className='delete-btn' onClick = {()=>handleDelete(division.id)}><img className='edit-delete-icon' src={DeleteIcon}></img></a> : <a className='restore-btn' onClick={() => handleRestore(division.id)}><img className='edit-delete-icon' src={RestoreIcon}></img></a>}
                                

                             
                             </td>
                    </tr>
                  ))}
               

                
                </tbody>
               
            </table>
    </div>
        
    );
};

export default DivisionList;