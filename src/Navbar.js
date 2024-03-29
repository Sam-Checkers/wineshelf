import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    backgroundColor: '#89CEEB',
    padding: '0px',
  };

  const liStyle = {
    marginRight: '0px',
  };

  const buttonStyle = {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px',
  };

  return (
    <nav>
      <ul style={ulStyle}>
        {!isAuthenticated && <li style={liStyle}><button style={buttonStyle} onClick={() => loginWithRedirect()}>Log In</button></li>}
        {!isAuthenticated && <li style={liStyle}><button style={buttonStyle} onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Register</button></li>}
        {isAuthenticated && <li style={liStyle}><a href="/inventory" style={linkStyle}>Inventory</a></li>}
        {isAuthenticated && <li style={liStyle}><a href="/profile" style={linkStyle}>Profile</a></li>}
        {isAuthenticated && <li style={liStyle}><button style={buttonStyle} onClick={() => logout({ returnTo: 'https://frolicking-parfait-bb5fdd.netlify.app' })}>Log Out</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;