import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth0ProviderConfig from './auth0-config';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider {...Auth0ProviderConfig}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);