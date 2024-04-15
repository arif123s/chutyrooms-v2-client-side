import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Payment.css"

const PaymentSystems = () => {
    const [isClicked, setIsClicked] = useState("PaymentSystemsList");

    const handleButtonClick = (btntype) => {
      setIsClicked(btntype);
    };
    
    return (
        <div className='payment-list-content'>
             <ul className='payment-option'>
             <Link to={'/dashboard/PaymentSystems'}>
                    <li  onClick={()=>handleButtonClick("PaymentSystemsList")} className={isClicked=="PaymentSystemsList" ? 'btn-clicked' : 'btn-unclicked'}>PaymentSystems List</li>
             </Link>
            <Link to={'/dashboard/PaymentSystems/PaymentSystemAdd'}>
                <li  onClick={()=>handleButtonClick("PaymentAdd")} className={isClicked=="PaymentAdd" ? 'btn-clicked' : 'btn-unclicked'}>PaymentSystems Add</li>
            </Link>
             </ul>
             <Outlet></Outlet>
        </div>
    );
};

export default PaymentSystems;