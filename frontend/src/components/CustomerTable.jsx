import React, { useState } from 'react';
import '../css/customer-table.css';
import CustomerDetailsPopup from './CustomerDetailsPopup'; 
import { FiSearch } from "react-icons/fi";

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  const [selectedCustomer,setSelectedCustomer] = useState(null); 
  const [isPopupOpen,setIsPopupOpen] = useState(false); 
  const [searchQuery,setSearchQuery] = useState(''); 
  
  const handleView = (customer) => {
    setSelectedCustomer(customer); 
    setIsPopupOpen(true); 
  };
  const closePopup = () => {
    setIsPopupOpen(false); 
    setSelectedCustomer(null); 
  };
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onEdit(customer); 
  // Scroll to top of the page when Edit is clicked
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };
  const filteredCustomers = customers?.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      {/* Search input */}
      <h3 style={{borderCollapse:"collapse",marginTop: '20px', width: '100%'}}>Customer Information</h3>
      <div className="search-container" style={{position:'relative',width:500}}>
        <input
          type="text"
          style={{padding:10,fontFamily:"Poppins", width:'500px'}}
          className="search-input"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      <FiSearch style={{position:'absolute',top:13,right:0,fontSize:20}} />
      </div>
   
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Mobile</th>
            <th>Type</th>
            <th>Credit Eligibility</th>
            <th>Premium Customer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers?.map((customer) => (
            <tr key={customer.cus_id}>
              <td>{customer.name}</td>
              <td>{customer.nic}</td>
              {customer.contact.map((item)=> <td>{item.mobile}</td>)}
              <td>{customer.type}</td>
              <td>{customer.eligible_for_credit ? 'Yes' : 'No'}</td>
              <td>{customer.premium_customer ? 'Yes' : 'No'}</td>
              <td style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
                <button className='btn_function' onClick={() => handleEdit(customer)}>Edit</button>
                <button className='btn_function'  onClick={() => onDelete(customer.cus_id)}>Delete</button>
                <button className='btn_function'  onClick={() => handleView(customer)}>View</button> {/* View button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup component */}
      {isPopupOpen && (
        <CustomerDetailsPopup
          customer={selectedCustomer} 
          onClose={closePopup} 
        />
      )}
    </div>
  );
};

export default CustomerTable;
