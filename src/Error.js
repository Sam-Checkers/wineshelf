import React from 'react';
import Navbar from './Navbar';

const Error = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Please log in to access this page</h2>
      </div>
    </div>
  );
};

export default Error;