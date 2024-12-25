import React from 'react'

const TemporaryContactDataDisplay = ({data}) => {

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
      };
    
      const thStyle = {
        padding: '10px',
        backgroundColor: '#f2f2f2',
        fontWeight:600,
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
                <th style={thStyle}>Data Type</th>
                <th style={thStyle}>Data</th>
              </tr>
            </thead>
            <tbody>
                    {
                        data && 
                        <>
                         <tr>
                        <td style={thStyle}>NIC</td>
                        <td style={tdStyle}>{data.nic}</td>
                        </tr>
                        <tr>
                        <td style={thStyle}>Mobile</td>
                        <td style={tdStyle}>{data.mobile}</td>
                        </tr>
                        <tr>
                        <td style={thStyle}>Email</td>
                        <td style={tdStyle}>{data.email}</td>
                        </tr>
                        <tr>
                        <td style={thStyle}>Website</td>
                        <td style={tdStyle}>{data.website}</td>
                        </tr>
                        </>
                       
                    }
            </tbody>
          </table>
        </div>
      );
}

export default TemporaryContactDataDisplay;