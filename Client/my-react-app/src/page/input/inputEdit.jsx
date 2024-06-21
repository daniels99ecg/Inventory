
import React from "react";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import {getListInput, updateInputs,getListInputId }from "../../api/input/input";

import Nav from "../nav";
const Swal = require('sweetalert2')


function EditInput(){

    const navigate=useNavigate()

    const [listar, setListar] = useState([])

    const params = useParams()


    async function save(id_input) {
        try {
          
                const data = await getListInputId(id_input);
                const response = data.data
                setListar({
                    Model:response.Model,
                    SerialNumber:response.SerialNumber,
                    AssetName:response.AssetName,
                });



        } catch (error) {
            console.log(error);
        }
    }


    async function update(id_input, values) {
      try {
          const shouldSave = await Swal.fire({
              title: '¿Estás seguro?',
              text: '¿Quieres actualizar esto?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Guardar',
              cancelButtonText: 'Cancelar'
          });
          if (shouldSave.isConfirmed) {
              const response = await updateInputs(id_input, values);                
              console.log(response);
              navigate("/input");
          }
      } catch (error) {
          console.log(error);
      }
  }



    useEffect(() => {
        save(params.id_input)
    }, [params.id_input])

        console.log(listar)



    return(
        <>
        <div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '5%' }}>
        <div align="center" > 
        <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
   

     <div>
    
        <IconButton aria-label="ArrowBackIosNewIcon" size="large" onClick={() => navigate('/input')}>
        <ArrowBackIosNewIcon fontSize='inherit' />
      </IconButton>
      <h1>Update Supplies</h1>
      </div>
   
        <Card style={{width:"70%"}}> 
        <CardContent  >
        <Formik
                    initialValues={listar}

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
                      update(params.id_input, values)
                    }}
                  >
                    {({ handleChange,handleSubmit,errors,values }) => (
                      <Form onSubmit={handleSubmit} className='row g-3'>


<br />
            <div style={{display:"flex", justifyContent: "space-between" }}>

                <div>        
            <TextField id="outlined-basic" label="Model" variant="outlined" name="Model" value={values.Model} onChange={handleChange} style={{marginRight: '10px'}} InputLabelProps={{
            shrink: true,
          }} />
            {errors.Model && <div className='invalid-feedback'>{errors.Model}</div>}
            </div>

            <div>
            <TextField id="outlined-basic" label="SerialNumber" variant="outlined" name="SerialNumber" value={values.SerialNumber} onChange={handleChange} style={{marginRight: '10px'}} InputLabelProps={{
            shrink: true,
          }}/>
            {errors.SerialNumber && <div className='invalid-feedback'>{errors.SerialNumber}</div>}
            </div>

 
            </div>
            <br />

            <div style={{display:"flex", justifyContent: "space-between"}}>
          
            <div style={{width:'100%'}}>
            <TextField id="outlined-basic" label="AssetName" variant="outlined" name="AssetName" value={values.AssetName} onChange={handleChange} style={{marginRight: '10px', width:'100%'}} InputLabelProps={{
            shrink: true,
          }}/>
            {errors.AssetName && <div className='invalid-feedback'>{errors.AssetName}</div>}
            </div>
           
            </div>

            <br />
             

            <div>
            <Button variant="contained" type="submit">Update</Button>
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
export default EditInput