// import  Providers  from './src/Providers';
import React from 'react';
import { AuthProvider } from './src/AuthProvider';
import Routes  from './src/Routes';

export default () => {    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  };
