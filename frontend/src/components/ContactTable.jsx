import React from 'react';

const ContactTable = ({ customers }) => {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    padding: '10px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const headerStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div>
      <h3 style={headerStyle}>Contact Information</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Contact Number</th>
            <th style={thStyle}>Email Address</th>
            <th style={thStyle}>Website</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr key={customer.cus_id}>
              <td style={tdStyle}>{customer.name}</td>
              <td style={tdStyle}>{customer.contact.map((item=>item.mobile))}</td>
              <td style={tdStyle}>{customer.contact.map((item=>item.email))}</td>
              <td style={tdStyle}>{customer.contact.map((item=>item.website))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
