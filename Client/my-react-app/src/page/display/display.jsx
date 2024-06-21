import React from "react";

import { getListDisplay,updateDisplayType,DelListDispaly } from "../../api/display/display";

import { useState, useEffect } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

import Nav from "../nav";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Select, MenuItem } from '@mui/material';

const Swal = require('sweetalert2')






function Display() {

    const [listar, setListar] = useState([])
    const navigate=useNavigate()
    const [searchTerm, setSearchTerm] = useState("");


    async function cargarInput() {
        const response = await getListDisplay()

        const filterList = response.data.filter((item) => {
            const searchTermLowerCase = searchTerm.toLowerCase();
        
            return (
                item.id_display.toString().includes(searchTermLowerCase) ||
                item.SerialNumber.toLowerCase().includes(searchTermLowerCase) 
                
            );
        });

        setListar(filterList);
    }


    const handleChangeStatus = async (id, newStatus) => {
        // Mostrar mensaje de confirmación
        const confirmation = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cambiar el Type?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiar estado',
            cancelButtonText: 'Cancelar'
        });
    
        // Si el usuario confirma la acción
        if (confirmation.isConfirmed) {
            try {
                const response = await updateDisplayType(id, { type: newStatus });
                if (!response.error) {
                    const updatedListar = listar.map(item => {
                        if (item.id_display === id) {
                            return { ...item, type: newStatus };
                        }
                        return item;
                    });
                    setListar(updatedListar);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El estado se ha actualizado correctamente.'
                    });
                } else {
                    console.error('Error del servidor:', response.error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Se produjo un error al actualizar el estado. Por favor, inténtalo de nuevo más tarde.'
                    });
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Se produjo un error en la solicitud. Por favor, inténtalo de nuevo más tarde.'
                });
            }
        }
    };

    const Delete = async (id_display) => {
        try {
          Swal.fire({
            title: 'Delete register?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then(async(result) => {
            if (result.isConfirmed) {
            
              const response = await DelListDispaly(id_display)
              setListar(listar.filter(listar=>listar.id_display!==id_display))
  
            }
          })
         
  
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        cargarInput()
    }, [searchTerm])

 
    return (
        <>

<div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '1%' }}>

            <div align="center">
                <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
               
                <h1>Display List</h1>
                <Button variant="contained"
                onClick={()=>navigate("/display/create")}
                >New Display</Button>
<TextField
              type="text"
              placeholder="Buscar..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{marginLeft:"28%"}}
            />
            <br />
            <br />
                <DataGrid
                    rows={listar.map((item, index) => ({
                        ...item,
                        id: item.id_display,
                       
                    }))}
                    style={{ width: 1200 }}
                    columns={[
                        { field: 'id_display', headerName: 'Id', flex: 0 },
                        { field: 'SerialNumber', headerName: 'Serial Number', flex: 1 },
                        { field: 'brad', headerName: 'Brand', flex: 1 },
                        {
                            field: 'type',
                            headerName: 'Type',
                            width: 130,
                            renderCell: params => (
                                <Select
                                    value={params.value}
                                    onChange={e => handleChangeStatus(params.row.id_display, e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                   
                                >   
                                    <MenuItem value="HE">HE</MenuItem>
                                    <MenuItem value="H">H</MenuItem>
                                   
                                   
                                </Select>
                            ),
                        },
                        { field: 'date', headerName: 'Date', flex: 1 },
                        { field: 'Statu', headerName: 'Status', flex: 1 },
                        { field: 'Action', headerName: 'Action', flex: 1,
                        renderCell:(params)=>(
                            <div>
                                    <IconButton aria-label="Edit" size="large" onClick={() =>navigate(`/display/update/${params.row.id_display}`)} >
                                        <EditIcon fontSize='inherit'/>
                                    </IconButton>   

                                     <IconButton aria-label="Delete" size="large" onClick={() =>Delete(params.row.id_display)} >
                                        <DeleteIcon fontSize='inherit'/>
                                    </IconButton>     
                            </div>
                        )
                         },


                    ]}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize:8,
                            },
                        },
                    }}
                    pageSizeOptions={[8,10, 50, 100]}  
                   
                />
            </div>

          </div>
      </div>
        </>
    )
}

export default Display
