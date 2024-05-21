import React, { useEffect, useState  } from 'react';
import "./Country.css";
import EditIcon from '../../../../../assets/icons/edit-icon.svg';
import DeleteIcon from '../../../../../assets/icons/delete-icon.svg';
import RestoreIcon from '../../../../../assets/icons/restore_icon_green.svg';
import { Link, useNavigate } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Loading from '../../../../Common/Includes/Loading/Loading';
import { BASE_API } from '../../../../../BaseApi/BaseApi';
import ArrowRightPaginate from '../../../../../assets/icons/arrow-left-paginate.svg';
import ArrowLeftPaginate from '../../../../../assets/icons/arrow-right-paginate.svg';
import ArrowRightHidden from '../../../../../assets/icons/arrow-left-hide.svg';
import ArrowLeftHidden from '../../../../../assets/icons/arrow-right-hide.svg';

const CountryList = () => {

  const navigate =useNavigate();
  const [Countrylist, setCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
 

  const defaultLeftArrow = ArrowLeftPaginate;
  const conditionalLeftArrow = ArrowLeftHidden;
  const defaultRightArrow = ArrowRightPaginate;
  const conditionalRightArrow = ArrowRightHidden;


  let RightArrowUrl = defaultRightArrow;
  let LeftArrowUrl = defaultLeftArrow;
  
 


  useEffect(() => {

    fetch(`${BASE_API}/country?page=${currentPage}`, {
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
        // console.log(data.data.pagination.last_page);

        setCountry(data.data.data);
        setTotalPages(data.data.pagination.last_page);
        // setTotalPages()
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
    [Countrylist , currentPage]);


    if (currentPage === 1) {
      RightArrowUrl = conditionalRightArrow;
      
    }

    else
    {
      RightArrowUrl = defaultRightArrow;
    }

    if (currentPage === totalPages) {
      LeftArrowUrl = conditionalLeftArrow;
     
    }

    else{
      LeftArrowUrl = defaultLeftArrow;
    }

 

    const handlePageChange = (pageNumber) => {
     
      if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      }
    };


  


  const handleDelete = async (id) => {
   
    await axios.delete(`${BASE_API}/country/` + id,
   
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    setCountry(Countrylist?.map(country => (country.id == id ? { ...country, deleted_at: !null } : country)));

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
      setCountry(Countrylist?.map(country => (country.id == id ? { ...country, deleted_at: null } : country)));
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
            {Countrylist?.map((country) => (
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

          </tbody>

     

        </table>

        <div className='pagination w-full'>
        <img  src={RightArrowUrl} onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}></img>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber}  className={`${
            currentPage === pageNumber 
              ? "onclick-page-color"
              : "onclickcancel-page-color"
          } } `} onClick={() => {
            handlePageChange(pageNumber);
          
          }}
          
            disabled={currentPage === pageNumber}>
            {pageNumber}
          </button>
        ))}
        <img src={LeftArrowUrl} onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}></img>
      </div>

    
      </div>

    </div>
  );
};

export default CountryList;