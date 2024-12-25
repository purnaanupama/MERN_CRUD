import React from 'react';
import '../css/detailPopup.css';

const CustomerDetailsPopup = ({ customer, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>NIC:</strong> {customer.nic}</p>
        <p><strong>Gender:</strong> {customer.gender}</p>
        <p><strong>Mobile:</strong> {customer.mobiles?.map((mobile) => mobile.mobile).join(', ')}</p>
        <p><strong>Type:</strong> {customer.type}</p>
        <p><strong>Credit Eligibility:</strong> {customer.eligible_for_credit ? 'Yes' : 'No'}</p>
        {customer.eligible_for_credit && <p><strong>Credit Amount:</strong> {customer.credit_amount}</p>}
        <p><strong>Credit period:</strong> {customer.credit_period}</p>
        <p><strong>Premium Customer:</strong> {customer.premium_customer ? 'Yes' : 'No'}</p>
        {customer.premium_customer && <p><strong>Discount Rate:</strong> {customer.discount_rate}%</p>}
        
        <button className="close-btn" onClick={onClose}>Close</button> {/* Close button */}
      </div>
    </div>
  );
};

export default CustomerDetailsPopup;
