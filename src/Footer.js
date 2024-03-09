import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={leftContainer}>
        <div style={logoStyle}>Knowledge Nest</div>
      </div>
      <div style={middleContainer}>

      </div>
      <div style={rightContainer}>
        <div style={copyrightStyle}>
          © {new Date().getFullYear()} Knowledge Nest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Styles
const footerStyle = {
  backgroundColor: '#ADD8E6',
  color: '#444444',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  height: '50px', // Adjust height as needed
};

const leftContainer = {
};

const middleContainer = {
  flex: '3',
};

const rightContainer = {
  flex: '1',
  textAlign: 'right',
};

const logoStyle = {
  fontSize: '18px',
};

const copyrightStyle = {
  fontSize: '14px',
};

export default Footer;
