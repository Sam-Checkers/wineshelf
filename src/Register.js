import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Register = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Register</button>
  );
};

export default Register;