import React from 'react';
import EditIcon from '../../../../../assets/icons/edit-icon.svg';
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembershipCards } from '../../../../../redux/features/membershipCard/membershipCardSlice';
import { BASE_API } from "../../../../../BaseApi/BaseApi";
import Loading from '../../../../Common/Includes/Loading/Loading';
import { Link } from 'react-router-dom';


const MembershipList = () => {

  const  dispatch = useDispatch();

  // const {membershipCard,isLoading} = useSelector((state) => state.membershipCard);
  const {membershipCards,isLoading} = useSelector((state) => state.membershipCard);

  console.log('membershipcards',membershipCards)
  // console.log(state)

  useEffect(()=>{
    dispatch(getMembershipCards())
  },[])


  if(isLoading)
  {
    return <Loading></Loading>
  }


    return (
        <div className='membership-list'>
           <table className='custom-table'>
          <thead className='membership-tbl-head'>
            <th>Membership Name</th>
            <th>Amount Type</th>
            <th>Amount</th>
            <th>Price</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </thead>

          <tbody className='gap-y-5'>
          {membershipCards.map((membershipcard) => (
              <tr key={membershipcard.id}>
                <td>{membershipcard.name}</td>
                <td>{membershipcard.amount_type}</td>
                <td>{membershipcard.amount}</td>
                <td>{membershipcard.price}</td>
                <td>{membershipcard.view_order}</td>
                <td><a className='active-inactive-btn'>{membershipcard.is_active == true ? 'Active' : 'Inactive'}</a></td>
                <td className='country-action-div'>
                  <Link className='edit-btn'  to={`/dashboard/Membership/MembershipEdit/${membershipcard.id}`}><img className='edit-delete-icon' src={EditIcon} alt='image'></img></Link>

                  {membershipcard.deleted_at == null ? <a className='delete-btn' ><img className='edit-delete-icon' src={DeleteIcon} alt='image'></img></a> : <a className='restore-btn'><img className='edit-delete-icon' src={RestoreIcon} alt='image'></img></a>}

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