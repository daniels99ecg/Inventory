
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
import {getLisDisplaytId, updateDisplay} from '../../api/display/display'
import Nav from "../nav";
const Swal = require('sweetalert2')


function EditDisplay(){

    const navigate=useNavigate()

    const [listar, setListar] = useState([])

    const params = useParams()


    async function save(id_display) {
        try {
          
                const data = await getLisDisplaytId(id_display);
                const response = data.data
                setListar({
                    SerialNumber:response.SerialNumber,
                    brad:response.brad,
                   date:response.date,
                   type:response.type
                });



        } catch (error) {
            console.log(error);
        }
    }


    async function update(id_display, values) {
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
              const response = await updateDisplay(id_display, values);                
              console.log(response);
              navigate("/display");
          }
      } catch (error) {
          console.log(error);
      }
  }



    useEffect(() => {
        save(params.id_display)
    }, [params.id_display])

        console.log(listar)



    return(
        <>
        <div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '5%' }}>
        <div align="center" > 
        <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
   

     <div>
    
        <IconButton aria-label="ArrowBackIosNewIcon" size="large" onClick={() => navigate('/display')}>
        <ArrowBackIosNewIcon fontSize='inherit' />
      </IconButton>
      <h1>Update Display</h1>
      </div>
   
        <Card style={{width:"70%"}}> 
        <CardContent  >
        <Formik
                    initialValues={listar}

                    validate={async(values)=>{
                        const errors={}
                    
                       
                        if (!values.SerialNumber) {
                          errors.SerialNumber = 'Este campo es requerido';
                          
                        }
                        if (!values.brad) {
                            errors.brad = 'Este campo es requerido';
                        
                          }
                        return errors;
                    
                       }}
                       enableReinitialize={true}


                    onSubmit={async (values) => {
                      update(params.id_display, values)
                    }}
                  >
                    {({ handleChange,handleSubmit,errors,values }) => (
                      <Form onSubmit={handleSubmit} className='row g-3'>


<br />
         
<div style={{display:"flex", justifyContent: "space-between" }}>

           
<div>
<TextField id="outlined-basic" label="Serial Number" variant="outlined" name="SerialNumber" value={values.SerialNumber} onChange={handleChange} style={{marginRight: '10px'}} InputLabelProps={{
            shrink: true,
          }}/>
{errors.SerialNumber && <div className='invalid-feedback'>{errors.SerialNumber}</div>}
</div>

<div>
<TextField id="outlined-basic" label="Brad" variant="outlined" name="brad" value={values.brad} onChange={handleChange} style={{marginRight: '10px'}} InputLabelProps={{
            shrink: true,
          }}/>
{errors.brad && <div className='invalid-feedback'>{errors.brad}</div>}
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
export default EditDisplay