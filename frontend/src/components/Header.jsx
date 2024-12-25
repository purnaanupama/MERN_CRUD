import React from 'react';

const Header = () => {
  const headerStyle = {
    width: '100%',
    backgroundColor: '#4CAF50', // A green background color
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div style={headerStyle}>
      Customer Management
    </div>
  );
};

export default Header;