
import EditIcon from '../../../../../assets/icons/edit-icon.svg';
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
import RestoreIcon from '../../../../../assets/icons/restore_icon_green.svg';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembershipCards } from '../../../../../redux/features/membershipCard/membershipCardSlice';
import { BASE_API } from "../../../../../BaseApi/BaseApi";
import Loading from '../../../../Common/Includes/Loading/Loading';
import { Link } from 'react-router-dom';
import axios from 'axios';


const MembershipList = () => {

  const  dispatch = useDispatch();

  // const {membershipCard,isLoading} = useSelector((state) => state.membershipCard);
  const {membershipCards,isLoading} = useSelector((state) => state.membershipCard);

  console.log('membershipcards',membershipCards)
  // console.log(state)

  useEffect(()=>{
    dispatch(getMembershipCards())
  },[])


  const handleDelete = async (id) => {
    console.log(id);

    await axios.delete(`${BASE_API}/memberships/`+ id,
     
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );


    // navigate('/dashboard/Membership');
    dispatch(getMembershipCards())
  }


  const handleRestore = async (id) => {
    try {
      // alert(id)
      await axios.put(`${BASE_API}/memberships/${id}/restore`,
     
        null,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }

        }
      ); // Replace with your actual API endpoint
      // If successful, update the state to reflect the restoration
      
      dispatch(getMembershipCards())
    } catch (error) {
      console.error('Error restoring item:', error);
    }
  };



  if(isLoading)
  {
    return <Loading></Loading>
  }


    return (
      <div className="membership-list">
        <table className="custom-table">
          <thead className="membership-tbl-head">
            <tr>
              <th>Membership Name</th>
              <th>Amount Type</th>
              <th>Amount</th>
              <th>Price</th>
              <th>View Order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="gap-y-5">
            {membershipCards.map((membershipcard) => (
              <tr key={membershipcard.id}>
                <td>{membershipcard.name}</td>
                <td>{membershipcard.amount_type}</td>
                <td>{membershipcard.amount}</td>
                <td>{membershipcard.price}</td>
                <td>{membershipcard.view_order}</td>
                <td>
                  <a className="active-inactive-btn">
                    {membershipcard.is_active == true ? "Active" : "Inactive"}
                  </a>
                </td>
                <td className="country-action-div">
                  <Link
                    className="edit-btn"
                    to={`/dashboard/Membership/MembershipEdit/${membershipcard.id}`}
                  >
                    <img
                      className="edit-delete-icon"
                      src={EditIcon}
                      alt="image"
                    ></img>
                  </Link>

                  {membershipcard.deleted_at == null ? (
                    <a
                      className="delete-btn"
                      onClick={() => handleDelete(membershipcard.id)}
                    >
                      <img
                        className="edit-delete-icon"
                        src={DeleteIcon}
                        alt="image"
                      ></img>
                    </a>
                  ) : (
                    <a
                      className="restore-btn"
                      onClick={() => handleRestore(membershipcard.id)}
                    >
                      <img
                        className="edit-delete-icon"
                        src={RestoreIcon}
                        alt="image"
                      ></img>
                    </a>
                  )}
                </td>
              </tr>
            ))}
            {/* <img src={EditIcon}></img>
            <img src={DeleteIcon}></img> */}
          </tbody>
        </table>
      </div>
    );
};

export default MembershipList;