import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#24345a', // A green background color
    color: 'white',
    padding: '10px 30px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    height:'60px',
    display:'flex',
    alignItems:'center'
  };

  return (
    <div style={headerStyle}>
      Customer Management
    </div>
  );
};

export default Header;