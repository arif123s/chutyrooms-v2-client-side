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
import { useDeletePaymentMethodMutation, useGetAllPaymentMethodsQuery, useRestorePaymentMethodMutation } from '../../../../../redux/features/admin/paymentMethod/paymentMethod.api';

const PaymentSystemsList = () => {

  const navigate = useNavigate();
  const [deletePaymentMethod, { isLoading:deleteLoading, isError }] = useDeletePaymentMethodMutation();
  const [restorePaymentMethod, { isLoading:restoreLoading, isRestoreError }] = useRestorePaymentMethodMutation();

  const {data,isLoading,refetch} = useGetAllPaymentMethodsQuery();
  // console.log(data?.data.data)
  const PaymentMethods = data?.data.data;
  // console.log(data?.data.data);

  if(isLoading || deleteLoading || restoreLoading){
    return <Loading></Loading>
  }

  const handleDelete = async (id) => {
    try {
      // Call the deletePaymentMethod mutation
      const result = await deletePaymentMethod(id);
      console.log('Payment method deleted:', result);
      if(result?.data?.status==1){
        refetch()
      }
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  const handleRestore = async (id) => {
    try {
    const result = await restorePaymentMethod(id);
      console.log('Payment method restored:', result);
      if(result?.data?.status==1){
        refetch()
      }
    } catch (error) {
      console.error('Error restore payment method:', error);
    }
   
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
                  <Link className='edit-btn'  to={`/dashboard/PaymentSystems/PaymentEdit/${PaymentMethods.id}`}><img className='edit-delete-icon' src={EditIcon} alt='image'></img></Link>

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