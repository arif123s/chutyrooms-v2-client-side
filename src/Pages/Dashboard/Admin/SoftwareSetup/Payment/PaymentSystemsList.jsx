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

const PaymentSystemsList = () => {

  const  dispatch = useDispatch();
  const navigate = useNavigate();

  const {data} = 

  console.log('membershipcards',membershipCards)
  // console.log(state)

  useEffect(()=>{
    dispatch(getMembershipCards())
  },[])
    
return (
<div className='payment-list'>
           <table className='custom-table'>
          <thead className='membership-tbl-head'>
            <th>PaymentType Name</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            
          </tbody>
          </table>
            
</div>
    );
};

export default PaymentSystemsList;