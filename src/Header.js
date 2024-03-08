import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={leftContainer}>
        <div style={logoStyle}>Knowledge Nest</div>
      </div>
      <div style={middleContainer}>
        <nav style={navStyle}>
          <ul style={ulStyle}>
            <li></li>
            <li><a href="/">Home</a></li>
            <li><a href="/questions">Questions</a></li>
            <li><a href="/contribute">Contribute</a></li>
          </ul>
        </nav>
      </div>
      <div style={rightContainer}>
        <div style={userInfoStyle}>
          <div style={userContainerStyle}>
            <span style={usernameStyle}>Username</span>
            <span style={accountTypeStyle}>Account Type</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Styles
const headerStyle = {
  backgroundColor: '#ADD8E6',
  color: '#444444',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
};

const leftContainer = {
  flex: '1',
};

const middleContainer = {
  flex: '3',
};

const rightContainer = {
  flex: '1',
  textAlign: 'right',
};

const logoStyle = {
  fontSize: '24px',
};

const navStyle = {
  display: 'inline-block',
};

const ulStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
};

const userInfoStyle = {
  fontSize: '14px',
};

const userContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const usernameStyle = {
  marginRight: '10px',
};

const accountTypeStyle = {
  fontStyle: 'italic',
};

export default Header;
