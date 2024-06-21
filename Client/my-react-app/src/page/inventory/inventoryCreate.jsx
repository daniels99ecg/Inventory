
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';

import { CreateNewInventory } from '../../api/inventory'

import Autocomplete from '@mui/material/Autocomplete';

import Nav from "../nav";
import {getListInput }from "../../api/input/input";

const Swal = require('sweetalert2')

function CreateInventory(){

  const [listar, setListar] = useState([])


  async function cargarInput() {

    const response = await getListInput()

    setListar(response.data);
}

useEffect(() => {
  cargarInput()
}, [])



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
                const response = await CreateNewInventory(value);
                console.log(response);
                navigate("/inventory");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fechaActual = new Date(); // Obtiene la fecha y hora actual
    const fechaFormateada = fechaActual.toISOString(); 
    return(
        <>

<div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '20%' }}>

        <div align="center" > 
        <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
        
      <div>
        <IconButton aria-label="ArrowBackIosNewIcon" size="large" onClick={() => navigate('/inventory') }>
          <ArrowBackIosNewIcon fontSize='inherit'/>
         </IconButton> 
         <h1>Create Inventory</h1>
         </div>
        <Card style={{width:'100%'}}> 
        <CardContent  >
        <Formik
                    initialValues={{
                        Status: '',
                        EndDate:fechaFormateada,
                        EmployeeName: '',
                        Company: '',
                        Accounts: 'Esperar',
                        Info: 'Esperar',
                        PurchasedFor: '',
                        Role: '',
                        DateReceived:fechaFormateada,
                        Brand: 'Esperar',
                        Model: 'Esperar',
                        SerialNumber: 'Esperar',
                        AssetName: 'Esperar',
                        Bitlocker: '',
                        OS:'',
                        fk_input:''
                     
                    }}

                    validate={async(values)=>{
                        const errors={}
                    
                        if (!values.EmployeeName) {
                          errors.EmployeeName = 'Este campo es requerido';
                          
                    
                        }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.EmployeeName)) {
                          errors.EmployeeName = 'Este campo solo debe contener letras';
                    
                        }    
                        if (!values.Company) {
                          errors.Company = 'Este campo es requerido';
                          
                    
                        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.Company)) {
                          errors.Company = 'Correo electrónico no válido';
                    
                        }
                        if (!values.Accounts) {
                            errors.Accounts = 'Este campo es requerido';
                            
                          }
                          if (!values.Info) {
                            errors.Info = 'Este campo es requerido';
                            
                          }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.Info)) {
                            errors.Info = 'Este campo solo debe contener letras';
                      
                          }
                          if (!values.PurchasedFor) {
                            errors.PurchasedFor = 'Este campo es requerido';
                            
                          }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.PurchasedFor)) {
                            errors.PurchasedFor = 'Este campo solo debe contener letras';
                      
                          }
                          if (!values.Role) {
                            errors.Role = 'Este campo es requerido';
                            
                          }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.Role)) {
                            errors.Role = 'Este campo solo debe contener letras';
                      
                          }
                          if (!values.Brand) {
                            errors.Brand = 'Este campo es requerido';
                            
                          }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.Brand)) {
                            errors.Brand = 'Este campo solo debe contener letras';
                      
                          }
                          if (!values.Model) {
                            errors.Model = 'Este campo es requerido';
                            
                          }
                          if (!values.SerialNumber) {
                            errors.SerialNumber = 'Este campo es requerido';
                            
                          }
                          if (!values.AssetName) {
                            errors.AssetName = 'Este campo es requerido';
                            
                          }
                          if (!values.Bitlocker) {
                            errors.Bitlocker = 'Este campo es requerido';
                            
                          }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.Bitlocker)) {
                            errors.Bitlocker = 'Este campo solo debe contener letras';
                      
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
            <TextField id="outlined-basic" label="Employee Name" variant="outlined" name="EmployeeName" value={values.EmployeeName} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.EmployeeName && <div className='invalid-feedback'>{errors.EmployeeName}</div>}
            </div>

            <div>
            <TextField id="outlined-basic" label="Company" variant="outlined" name="Company" value={values.Company} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.Company && <div className='invalid-feedback'>{errors.Company}</div>}
            </div>

          {/*  <div>
            <TextField id="outlined-basic" label="Accounts" variant="outlined" name="Accounts" value={values.Accounts} onChange={handleChange}/>
            {errors.Accounts && <div className='invalid-feedback'>{errors.Accounts}</div>}

                    </div>*/}
            </div>
            <br />

            <div style={{display:"flex", justifyContent: "space-between"}}>
            {/*<div>
            <TextField id="outlined-basic" label="Info" variant="outlined" name="Info" value={values.Info} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.Info && <div className='invalid-feedback'>{errors.Info}</div>}
            </div>*/}
            <div>
            <TextField id="outlined-basic" label="PurchasedFor" variant="outlined" name="PurchasedFor" value={values.PurchasedFor} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.PurchasedFor && <div className='invalid-feedback'>{errors.PurchasedFor}</div>}
            </div>
            <div>
            <TextField id="outlined-basic" label="Role" variant="outlined" name="Role" value={values.Role} onChange={handleChange}/>
            {errors.Role && <div className='invalid-feedback'>{errors.Role}</div>}
            </div>
            </div>

            <br />
            {/*
            <div style={{display:"flex"}}>
              <div>
          <TextField id="outlined-basic" label="Brand" variant="outlined" name="Brand" value={values.Brand} onChange={handleChange} style={{marginRight: '10px'}}/>
          {errors.Brand && <div className='invalid-feedback'>{errors.Brand}</div>}
                  </div>*/}
             {/* <div>
            <TextField id="outlined-basic" label="Model" variant="outlined" name="Model" value={values.Model} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.Model && <div className='invalid-feedback'>{errors.Model}</div>}
            </div>
            <div>
            <TextField id="outlined-basic" label="Serial Number" variant="outlined" name="SerialNumber" value={values.SerialNumber} onChange={handleChange}/>
            {errors.SerialNumber && <div className='invalid-feedback'>{errors.SerialNumber}</div>}
            </div>
            </div>

              <div>   
            <TextField id="outlined-basic" label="Asset Name" variant="outlined" name="AssetName" value={values.AssetName} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.AssetName && <div className='invalid-feedback'>{errors.AssetName}</div>}
            </div>
*/}

            <br />

              
            <div style={{display:"flex", justifyContent: "space-between"}}>
            <div>   
            <TextField id="outlined-basic" label="Bitlocker" variant="outlined" name="Bitlocker" value={values.Bitlocker} onChange={handleChange} style={{marginRight: '10px'}}/>
            {errors.Bitlocker && <div className='invalid-feedback'>{errors.Bitlocker}</div>}
            </div>

            <div>   
            <TextField id="outlined-basic" label="OS" variant="outlined" name="OS" value={values.OS} onChange={handleChange} style={{marginRight: '10px'}}/>
           
            </div>

           
</div>
       
<br />
            <div>   
           
            <Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={listar.filter((option) =>  option.Statu === 'Spare')}  // Filtrar roles con estado true
  getOptionLabel={(option) => `${option.SerialNumber} - ${option.Model}`}
  onChange={(event, newValue) => {
    handleChange({ target: { name: 'fk_input', value: newValue ? newValue.id_input : '' } });
  }}
  value={listar.find((input) => input.id_input === values.fk_input) || null}
  sx={{ width: '100%' }}
  renderInput={(params) => <TextField {...params} label="Computter" sx={{ width: '100%' }}/>}
/>

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
export default CreateInventory