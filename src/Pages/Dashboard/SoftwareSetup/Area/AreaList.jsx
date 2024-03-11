import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import EditIcon from './../../../../assets/icons/edit-icon.svg';
import DeleteIcon from './../../../../assets/icons/delete-icon.svg';
import RestoreIcon from './../../../../assets/icons/restore_icon_green.svg';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router';
import { BASE_API } from '../../../../BaseApi/BaseApi';

const AreaList = () => {

    const [AreaList, setArea] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       
        fetch(`${BASE_API}/area`, {
        // fetch('http://127.0.0.1:8000/api/area', {
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
    // console.log(data.data.data)
    setArea(data.data.data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
},
[]);



const handleDelete = async (id) => {
  // console.log(id);

  await axios.delete(`${BASE_API}/area/` + id,
    // await axios.delete("http://127.0.0.1:8000/api/area/" + id,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  setArea(AreaList.map(area => (area.id == id ? { ...area, deleted_at: !null } : area)));

  navigate('/dashboard/Area');
}


const handleRestore = async (id) => {
  try {
    // alert(id)
    await axios.put(`${BASE_API}/area/${id}/restore`,
    // await axios.put(`http://127.0.0.1:8000/api/area/${id}/restore`,
      null,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }

      }
    ); 
    setArea(AreaList.map(area => (area.id == id ? { ...area, deleted_at: null } : area)));
    navigate('/dashboard/Area');
  } catch (error) {
    console.error('Error restoring item:', error);
  }
};
    return (
        <div className='country-list'>
            
        <table className='custom-table'>
            <thead className='country-tbl-head'>
                <th>Area Name</th>
                <th>District Name</th>
                <th>View Order</th>
                <th>Status</th>
                <th>Action</th>
            </thead>

            <tbody className='gap-y-5'>
            {AreaList.map((area) => (
                <tr key={area.id}>
                 <td>{area.name}</td>
                 <td>{area.district.name}</td>
                 <td>{area.view_order}</td>
                 <td><a className='active-inactive-btn'>{area.is_active == true ? 'Active' : 'Inactive'}</a></td>
                 <td className='country-action-div'>
                            <Link className='edit-btn' to={`/dashboard/Area/AreaEdit/${area.id}`}><img className='edit-delete-icon' src={EditIcon}></img></Link>
                    
                           {area.deleted_at == null? <a className='delete-btn' onClick = {()=>handleDelete(area.id)}><img className='edit-delete-icon' src={DeleteIcon}></img></a> : <a className='restore-btn' onClick={() => handleRestore(area.id)}><img className='edit-delete-icon' src={RestoreIcon}></img></a>}
                            

                         
                         </td>
                </tr>
              ))}
           

            
            </tbody>
           
        </table>
</div>
    );
};

export default AreaList;