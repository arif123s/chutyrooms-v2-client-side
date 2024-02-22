import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import EditIcon from './../../../../assets/icons/edit-icon.svg';
import DeleteIcon from './../../../../assets/icons/delete-icon.svg';
import RestoreIcon from './../../../../assets/icons/restore_icon_green.svg';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router';

const DistrictList = () => {



    const [DistrictList, setDistrict] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       
        fetch('http://127.0.0.1:8000/api/district', {
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
    console.log(data)
    setDistrict(data.data.data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
},
[]);

const handleDelete = async (id) => {
  // console.log(id);

  await axios.delete("http://127.0.0.1:8000/api/district/" + id,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }

    }
  );

  setDistrict(DistrictList.map(district => (district.id == id ? { ...district, deleted_at: !null } : district)));

  navigate('/dashboard/district');
}


const handleRestore = async (id) => {
  try {
    // alert(id)
    await axios.put(`http://127.0.0.1:8000/api/district/${id}/restore`,
      null,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }

      }
    ); 
    setDistrict(DistrictList.map(district => (district.id == id ? { ...district, deleted_at: null } : district)));
    navigate('/dashboard/district');
  } catch (error) {
    console.error('Error restoring item:', error);
  }
};
    return (
        <div className='country-list'>
            
        <table className='custom-table'>
            <thead className='country-tbl-head'>
                <th>District Name</th>
                <th>Division Name</th>
                <th>View Order</th>
                <th>Status</th>
                <th>Action</th>
            </thead>

            <tbody className='gap-y-5'>
            {DistrictList.map((district) => (
                <tr key={district.id}>
                 <td>{district.name}</td>
                 <td>{district.division.name}</td>
                 <td>{district.view_order}</td>
                 <td><a className='active-inactive-btn'>{district.is_active == true ? 'Active' : 'Inactive'}</a></td>
                 <td className='country-action-div'>
                            <Link className='edit-btn' to={`/dashboard/district/districtEdit/${district.id}`}><img className='edit-delete-icon' src={EditIcon}></img></Link>
                    
                           {district.deleted_at == null? <a className='delete-btn' onClick = {()=>handleDelete(district.id)}><img  className='edit-delete-icon' src={DeleteIcon}></img></a> : <a className='restore-btn' onClick={() => handleRestore(district.id)}><img className='edit-delete-icon' src={RestoreIcon}></img></a>}
                            

                         
                         </td>
                </tr>
              ))}
           

            
            </tbody>
           
        </table>
</div>
    );
};

export default DistrictList;