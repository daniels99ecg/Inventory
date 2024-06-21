import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
 

 if(!isAuthenticated){
    return <Navigate to="/" replace />;
 }else{
    return element;
 }
  
};

export default ProtectedRoute;