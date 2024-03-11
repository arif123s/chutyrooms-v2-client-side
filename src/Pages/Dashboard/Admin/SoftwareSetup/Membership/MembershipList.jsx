import React from 'react';
import EditIcon from '../../../../../assets/icons/edit-icon.svg';
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";

const MembershipList = () => {
    return (
        <div className='membership-list'>
           <table className='custom-table'>
          <thead className='membership-tbl-head'>
            <th>Membership Name</th>
            <th>Amount Type</th>
            <th>Amount</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </thead>

          <tbody className='gap-y-5'>
            <img src={EditIcon}></img>
            <img src={DeleteIcon}></img>
          </tbody>
          </table>
        </div>
    );
};

export default MembershipList;