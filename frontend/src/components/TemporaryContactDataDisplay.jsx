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
                <th style={thStyle}>NIC</th>
                <th style={thStyle}>Contact Numbers</th>
                <th style={thStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
                    {
                        data && 
                        <tr>
                        <td style={tdStyle}>{data.nic}</td>
                        <td style={tdStyle}>{data.mobiles?.map((mobile) => mobile.mobile).join(',')}</td>
                        <td style={tdStyle}>{data.email}</td>
                        </tr>
                    }
            </tbody>
          </table>
        </div>
      );
}

export default TemporaryContactDataDisplay;