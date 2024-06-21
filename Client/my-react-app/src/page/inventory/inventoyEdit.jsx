
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
import { getListInventoryID,updateInventroys } from '../../api/inventory'
import {getListInput }from "../../api/input/input";
import Autocomplete from '@mui/material/Autocomplete';

import Nav from "../nav";
const Swal = require('sweetalert2')


function EditInventory(){


  const [listarT, setListarT] = useState([])


  async function cargarInput() {

    const response = await getListInput()

    setListarT(response.data);
}

useEffect(() => {
  cargarInput()
}, [])

    const navigate=useNavigate()

    const [listar, setListar] = useState([])

    const params = useParams()


    async function save(id_inventory) {
        try {
          
                const data = await getListInventoryID(id_inventory);
                const response = data.data
                setListar({
                    id_inventory:response.id_inventory,
                    Status:response.Status,
                    EndDate: response.EndDate,
                    EmployeeName: response.EmployeeName,
                    Company: response.Company,
                    Accounts: response.Accounts,
                    Info: response.Info,
                    PurchasedFor: response.PurchasedFor,
                    Role: response.Role,
                    DateReceived: response.DateReceived,
                    Brand: response.Brand,
                    Model: response.Model,
                    SerialNumber: response.SerialNumber,
                    AssetName: response.AssetName,
                    Bitlocker: response.Bitlocker,
                    key_Bitlocker: response.key_Bitlocker,
                    OS: response.OS,
                    fk_input:response.fk_input
                });



        } catch (error) {
            console.log(error);
        }
    }


    async function update(id_inventory, values) {
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
                const response = await updateInventroys(id_inventory, values);                
                console.log(response);
                navigate("/inventory");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        save(params.id_inventory)
    }, [params.id_inventory])

        console.log(listar)
    const fechaActual = new Date(); // Obtiene la fecha y hora actual
    const fechaFormateada = fechaActual.toISOString(); 


    return(
        <>
        <div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '5%' }}>
        <div align="center" > 
        <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
   

     <div>
    
        <IconButton aria-label="ArrowBackIosNewIcon" size="large" onClick={() => navigate('/inventory')}>
        <ArrowBackIosNewIcon fontSize='inherit' />
      </IconButton>
      <h1>Update Inventory</h1>
      </div>
   
        <Card style={{width:"70%"}}> 
        <CardContent  >
        <Formik
                    initialValues={listar}

                    validate={async(values)=>{
                        const errors={}
                    
                        if (!values.EmployeeName) {
                          errors.EmployeeName = 'Este campo es requerido';
                          
                    
                        } 
                        if (!values.Company) {
                          errors.Company = 'Este campo es requerido';
                          
                    
                        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.Company)) {
                          errors.Company = 'Correo electrónico no válido';
                    
                        }
                     
                        
                          if (!values.PurchasedFor) {
                            errors.PurchasedFor = 'Este campo es requerido';
                            
                          }
                          if (!values.Role) {
                            errors.Role = 'Este campo es requerido';
                            
                          }
                          if (!values.Brand) {
                            errors.Brand = 'Este campo es requerido';
                            
                          }
                       
                          if (!values.Bitlocker) {
                            errors.Bitlocker = 'Este campo es requerido';
                            
                          }
                        return errors;
                    
                       }}
                       enableReinitialize={true}


                    onSubmit={async (values) => {
                        update(params.id_inventory, values)
                    }}
                  >
                    {({ handleChange,handleSubmit,errors,values }) => (
                      <Form onSubmit={handleSubmit} className='row g-3'>


            <br />
            <div style={{display:"flex", justifyContent: "space-between" }}>

                <div>        
            <TextField id="outlined-basic" label="Employee Name" variant="outlined"  name="EmployeeName" value={values.EmployeeName} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.EmployeeName && <div className='invalid-feedback'>{errors.EmployeeName}</div>}
            </div>

            <div>
            <TextField id="outlined-basic" label="Company" variant="outlined" name="Company" value={values.Company} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.Company && <div className='invalid-feedback'>{errors.Company}</div>}
            </div>
{/*
          <div>
          <TextField id="outlined-basic" label="Accounts" variant="outlined" name="Accounts" value={values.Accounts} onChange={handleChange}  InputLabelProps={{
          shrink: true,
        }}/>
          {errors.Accounts && <div className='invalid-feedback'>{errors.Accounts}</div>}

          </div>
          */}
            </div>
            <br />

            <div style={{display:"flex", justifyContent: "space-between"}}>
              {/*
           <div>
            <TextField id="outlined-basic" label="Info" variant="outlined" name="Info" value={values.Info} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.Info && <div className='invalid-feedback'>{errors.Info}</div>}
            </div>
             */}
            <div>
            <TextField id="outlined-basic" label="Purchased For" variant="outlined" name="PurchasedFor" value={values.PurchasedFor} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.PurchasedFor && <div className='invalid-feedback'>{errors.PurchasedFor}</div>}
            </div>
            <div>
            <TextField id="outlined-basic" label="Role" variant="outlined" name="Role" value={values.Role} onChange={handleChange}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.Role && <div className='invalid-feedback'>{errors.Role}</div>}
            </div>
            </div>

            <br />
            <div style={{display:"flex"}}>
               {/*
                <div>
            <TextField id="outlined-basic" label="Brand" variant="outlined" name="Brand" value={values.Brand} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.Brand && <div className='invalid-feedback'>{errors.Brand}</div>}
            </div>
        */}
        {/*
            <div>
            <TextField id="outlined-basic" label="Model" variant="outlined" name="Model" value={values.Model} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.Model && <div className='invalid-feedback'>{errors.Model}</div>}
            </div>
             */}
              {/*
            <div>
            <TextField id="outlined-basic" label="Serial Number" variant="outlined" name="SerialNumber" value={values.SerialNumber} onChange={handleChange}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.SerialNumber && <div className='invalid-feedback'>{errors.SerialNumber}</div>}
            </div>
              */}
            </div>

            <br />
            <div style={{display:"flex"}}>
               {/*
             <div>   
            <TextField id="outlined-basic" label="Asset Name" variant="outlined" name="AssetName" value={values.AssetName} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.AssetName && <div className='invalid-feedback'>{errors.AssetName}</div>}
            </div>
             */}
            <div>   
            <TextField id="outlined-basic" label="Bitlocker" variant="outlined" name="Bitlocker" value={values.Bitlocker} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
            {errors.Bitlocker && <div className='invalid-feedback'>{errors.Bitlocker}</div>}
            </div>
            
            <div>   
            <TextField id="outlined-basic" label="Key Bitlocker" variant="outlined" name="key_Bitlocker" value={values.key_Bitlocker} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
          
            </div>

            <div>   
            <TextField id="outlined-basic" label="Os" variant="outlined" name="OS" value={values.OS} onChange={handleChange} style={{marginRight: '10px'}}  InputLabelProps={{
            shrink: true,
          }}/>
          
            </div>


            </div>
            <br />
            <div>
<Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={listarT}  // Filtrar roles con estado true
  getOptionLabel={(option) =>  `${option.SerialNumber} - ${option.Model} - ${option.AssetName}`} 
  onChange={(event, newValue) => {
    handleChange({ target: { name: 'fk_input', value: newValue ? newValue.id_input : '' } });
  }}
  value={listarT.find((input) => input.id_input === values.fk_input) || null}
  sx={{ width: '100%' }}
  renderInput={(params) => <TextField {...params} label="Computter" sx={{ width: '100%' }}/>}
/>
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
export default EditInventory