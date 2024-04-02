import React from 'react';
import EditIcon from '../../../../../assets/icons/edit-icon.svg';
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
import RestoreIcon from '../../../../../assets/icons/restore_icon_green.svg';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_API } from "../../../../../BaseApi/BaseApi";
import Loading from '../../../../Common/Includes/Loading/Loading';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { useGetAllPaymentMethodsQuery } from '../../../../../redux/features/admin/paymentMethod/paymentMethod.api';

const PaymentSystemsList = () => {

  const  dispatch = useDispatch();
  const navigate = useNavigate();

  const {data,isLoading} = useGetAllPaymentMethodsQuery();
  const PaymentMethods = data?.data.data;
  console.log(data?.data.data);

  if(isLoading){
    return <Loading></Loading>
  }

  // console.log('membershipcards',membershipCards)
  // console.log(state)


    
return (
<div className='payment-list'>
           <table className='custom-table'>
            <thead className='membership-tbl-head'>
              <th>PaymentType Name</th>
              <th>View Order</th>
              <th>Status</th>
              <th>Action</th>
            </thead>
         
            <tbody className='gap-y-5'>
            {PaymentMethods.map((PaymentMethods) => (
              <tr key={PaymentMethods.id}>
                <td>{PaymentMethods.name}</td>
                <td>{PaymentMethods.view_order}</td>
                <td><a className='active-inactive-btn'>{PaymentMethods.is_active == true ? 'Active' : 'Inactive'}</a></td>
                <td className='country-action-div'>
                  <Link className='edit-btn'  to={`/dashboard/Membership/MembershipEdit/${PaymentMethods.id}`}><img className='edit-delete-icon' src={EditIcon} alt='image'></img></Link>

                  {PaymentMethods.deleted_at == null ? <a className='delete-btn' onClick={() => handleDelete(PaymentMethods.id)} ><img className='edit-delete-icon' src={DeleteIcon} alt='image'></img></a> : <a className='restore-btn' onClick={() => handleRestore(PaymentMethods.id)}><img className='edit-delete-icon' src={RestoreIcon} alt='image'></img></a>}

                </td>
              </tr>
            ))}
            
          </tbody>
          </table>
            
</div>
    );
};

export default PaymentSystemsList;