
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';


import Autocomplete from '@mui/material/Autocomplete';

import Nav from "../nav";
import {CreateNewInput }from "../../api/input/input";

const Swal = require('sweetalert2')

function CreateInput(){



    const navigate=useNavigate()


    async function save(value) {
        try {
            const shouldSave = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Quieres guardar esto?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            });
    
            if (shouldSave.isConfirmed) {
                const response = await CreateNewInput(value);
                console.log(response);
                navigate("/input");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>

<div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '20%' }}>

        <div align="center" > 
        <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
        
      <div>
        <IconButton aria-label="ArrowBackIosNewIcon" size="large" onClick={() => navigate('/input') }>
          <ArrowBackIosNewIcon fontSize='inherit'/>
         </IconButton> 
         <h1>Create Supplies</h1>
         </div>
        <Card style={{width:'100%'}}> 
        <CardContent  >
        <Formik
                    initialValues={{
                     
                      Model:"",
                      SerialNumber:"",
                      AssetName:""
                                
                    }}

                    validate={async(values)=>{
                        const errors={}
                    
                        if (!values.Model) {
                          errors.Model = 'Este campo es requerido';

                        }
                        if (!values.SerialNumber) {
                          errors.SerialNumber = 'Este campo es requerido';

                        }
                        if (!values.AssetName) {
                            errors.AssetName = 'Este campo es requerido';
                            
                          }
                        
                        return errors;
                    
                       }}
                       enableReinitialize={true}


                    onSubmit={async (values) => {
                        save(values)
                    }}
                  >
                    {({ handleChange,handleSubmit,errors,values }) => (
                      <Form onSubmit={handleSubmit} className='row g-3'>


            <br />
            <div style={{display:"flex", justifyContent: "space-between" }}>

                <div>        
            <TextField id="outlined-basic" label="Model" variant="outlined" name="Model" value={values.Model} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.Model && <div className='invalid-feedback'>{errors.Model}</div>}
            </div>

            <div>
            <TextField id="outlined-basic" label="SerialNumber" variant="outlined" name="SerialNumber" value={values.SerialNumber} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.SerialNumber && <div className='invalid-feedback'>{errors.SerialNumber}</div>}
            </div>

 
            </div>
            <br />

            <div style={{display:"flex", justifyContent: "space-between"}}>
          
            <div style={{width:'100%'}}>
            <TextField id="outlined-basic" label="AssetName" variant="outlined" name="AssetName" value={values.AssetName} onChange={handleChange} style={{marginRight: '10px', width:'100%'}}/>
            {errors.AssetName && <div className='invalid-feedback'>{errors.AssetName}</div>}
            </div>
           
            </div>

            <br />
             

            <div>
            <Button variant="contained" type="submit">Register</Button>
            </div>

            <br />
            </Form>
                    )}
            </Formik>
      </CardContent>
      
      </Card>
        </div>
        </div>
        </div>
        </>
    )

}
export default CreateInput