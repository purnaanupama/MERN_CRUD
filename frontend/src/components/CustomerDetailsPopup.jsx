import React from 'react';
import '../css/detailPopup.css';
import { IoIosCloseCircle } from "react-icons/io";

const CustomerDetailsPopup = ({ customer, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container" >
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>NIC:</strong> {customer.nic}</p>
        <p><strong>Gender:</strong> {customer.gender}</p>
        <p><strong>Mobile:</strong> {customer.contact.map((item)=>item.mobile)}</p>
        <p><strong>Email:</strong> {customer.contact.map((item)=>item.email)}</p>
        <p><strong>Website:</strong> {customer.contact.map((item)=>item.website)}</p>
        <p><strong>Type:</strong> {customer.type}</p>
        <p><strong>Credit Eligibility:</strong> {customer.eligible_for_credit ? 'Yes' : 'No'}</p>
        {customer.eligible_for_credit && <p><strong>Credit Amount:</strong> {customer.credit_amount}</p>}
        <p><strong>Credit period:</strong> {customer.credit_period}</p>
        <p><strong>Premium Customer:</strong> {customer.premium_customer ? 'Yes' : 'No'}</p>
        {customer.premium_customer && <p><strong>Discount Rate:</strong> {customer.discount_rate}%</p>}
        <IoIosCloseCircle style={{position:'absolute',top:10,right:10,fontSize:22,cursor:'pointer'}} onClick={onClose} />
      </div>
    </div>
  );
};

export default CustomerDetailsPopup;
