import React from "react";

import { Formik, Form, Field,ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';

import {PostLogin} from '../../api/inventory'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


function Login({setIsAuthenticated}){
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();


const handleSubmit = async (values, { setSubmitting  }) => {
    const { email, passwords } = values;
    try {
      const response = await PostLogin(email, passwords);
   
        console.log(response.data)
      if (response) {

   
        localStorage.setItem('isAuthenticated', true);
        
        navigate('/inventory');
        window.location.reload();
      } else {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
     
      setError('Error al iniciar sesión, inténtalo de nuevo.');
    }
    setSubmitting(false);
  };

    return(
        <>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

  <Card style={{width:'30%', height:'35%'}}>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>
    
    <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />

      <Formik
        initialValues={{
          email:"",
          contrasena:""
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" id="email" name="email"  label="User"  as={TextField}/>
              <ErrorMessage name="email" component="div" />
            </div>
            <br />
            <div>
              <Field type="password" id="contrasena" name="passwords"   label="Password"  as={TextField}/>
              <ErrorMessage name="passwords" component="div" />
            </div>
            <br />
            {error && (
              <div>
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
                <br />
              </div>
            )}
            <br />
            <div>
              <Button variant="contained" type="submit"  disabled={isSubmitting} >Iniciar sesión</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </Card>
</div>

         </>
    )
}


export default Login