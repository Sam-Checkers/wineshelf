import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Inventory from './Inventory';
import Error from './Error';
import Profile from './Profile'

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Error />;
  }

  const path = window.location.pathname;

  let content = null;

  if (path === '/login') {
    content = <Login />;
  } else if (path === '/register') {
    content = <Register />; }
    else if (path === '/profile') {
      content = <Profile />; }
   else {
    content = <Inventory />;
  }

  return (
    <Router>
      <div>
        <Navbar />
        {content}
      </div>
    </Router>
  );
}

export default App;