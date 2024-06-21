import React from "react";

import { getListInventory, DelListInventory, updateInventroysStatus, getOffID} from '../../api/inventory'

import { useState, useEffect } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InventoryInfo from "./inventoryInfo";
import ReactDOM from 'react-dom';

import Nav from "../nav";
import {Select, MenuItem } from '@mui/material';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const Swal = require('sweetalert2')






function Inventory() {


  const archivoURL = 'https://abacenter-my.sharepoint.com/:u:/r/personal/dcruz_abatechnology_com/Documents/OffboardingScriptCurrent.exe?csf=1&web=1&e=R5U0rQ  ';  // Reemplaza 'URL_DEL_ARCHIVO' con la URL real de tu archivo

  const abrirArchivo = () => {
      window.open(archivoURL, '_blank');
  };

    const [listar, setListar] = useState([])
    const navigate=useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedRol, setSelectedRol] = useState(null);

    async function cargarInventory() {
        const response = await getListInventory()

        const filterList = response.data.filter((item) => {
            // Convert searchTerm to lowercase for case-insensitive search
            const searchTermLowerCase = searchTerm.toLowerCase();
        
            // Check each property for inclusion of the searchTerm after converting both to lowercase
            return (
                item.id_inventory.toString().includes(searchTermLowerCase) ||
                item.EmployeeName.toLowerCase().includes(searchTermLowerCase) ||
                item.Os.toLowerCase().includes(searchTermLowerCase) ||
                (item.Company && item.Company.toLowerCase().includes(searchTermLowerCase)) || // Null check for item.Company
                (item.PurchasedFor && item.PurchasedFor.toLowerCase().includes(searchTermLowerCase)) || // Null check for item.PurchasedFor
                (item.Role && item.Role.toLowerCase().includes(searchTermLowerCase)) || // Null check for item.Role
                (item.Status && item.Status.toLowerCase().includes(searchTermLowerCase)) // Null check for item.Status
               
            );
        });

        setListar(filterList);
    }

    const Delete = async (id_inventory) => {
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
            
              const response = await DelListInventory(id_inventory)
              setListar(listar.filter(listar=>listar.id_inventory!==id_inventory))
  
            }
          })
         
  
        } catch (error) {
          console.log(error)
        }
      }

      const Off = async (id_inventory) => {
        try {
          Swal.fire({
            title: 'Delete User?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then(async(result) => {
            if (result.isConfirmed) {
            
              const response = await getOffID()
  
            }
          })
         
  
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        cargarInventory()
    }, [searchTerm])

    
    const handleOpenInfoModal = (clienteInfo) => {
        setSelectedRol(clienteInfo);
        setShowInfoModal(true);
      };


      const handleCloseInfoModal = () => {
        setSelectedRol(null);
        setShowInfoModal(false);
      }; 



      const [rows, setRows] = useState([]);

      const handleChangeStatus = async (id, newStatus) => {
        // Mostrar mensaje de confirmación
        const confirmation = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cambiar el estado?',
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
                const response = await updateInventroysStatus(id, { Status: newStatus });
                if (!response.error) {
                    const updatedListar = listar.map(item => {
                        if (item.id_inventory === id) {
                            return { ...item, Status: newStatus };
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

    return (
        <>

<div style={{ display: 'flex' }}>
<Nav/>
    <div style={{ marginLeft: '1%' }}>

            <div align="center">
                <img src="https://media.licdn.com/dms/image/C4E0BAQH3BxfGQ-NwUg/company-logo_200_200/0/1663884389493/aba_tech_logo?e=2147483647&v=beta&t=PUaTF3uDD5G7WEDGt30zih8btIvwbY9bnAWCyZu8SAU" alt="Abatech" />
               
                <h1>Inventory List</h1>
                <Button variant="contained"
                onClick={()=>navigate("/inventory/create")}
                >New Employee</Button>
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
                        id: item.id_inventory,
                       
                    }))}
                    style={{ width: 1200 }}
                    columns={[
                        { field: 'id_inventory', headerName: 'Id', flex: 0 },
                        { field: 'EmployeeName', headerName: 'Name', flex: 1 },
                        { field: 'Company', headerName: 'Email', flex: 1 },
                        { field: 'Role', headerName: 'Rol', flex: 1 },
                        { field: 'Os', headerName: 'Os', flex: 1 },
                        {
                          field: 'Status',
                          headerName: 'Status',
                          width: 130,
                          renderCell: params => (
                              <Select
                                  value={params.value}
                                  onChange={e => handleChangeStatus(params.row.id_inventory, e.target.value)}
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                 
                              >   
                                    <MenuItem value="Active">Active</MenuItem>
                                  <MenuItem value="Terminated">Terminated</MenuItem>
                                  <MenuItem value="Disclaimer">Disclaimer</MenuItem>
                                 
                              </Select>
                          ),
                      },
                        { field: '', headerName: 'Info', flex: 0,
                        renderCell:(params)=>(
                            <div>
                                    <IconButton aria-label="info" size="large" onClick={() => handleOpenInfoModal(params.row)} >
                                        <InfoIcon fontSize='inherit'/>
                                    </IconButton>       
                            </div>
                        )
                         },
                         { field: 'Action', headerName: 'Action', flex: 1,
                         renderCell:(params)=>(
                             <div>
                                     <IconButton aria-label="Edit" size="large" onClick={() =>navigate(`/inventory/edit/${params.row.id_inventory}`)} >
                                         <EditIcon fontSize='inherit'/>
                                     </IconButton>   

                                      <IconButton aria-label="Delte" size="large" onClick={() =>Delete(params.row.id_inventory)} >
                                         <DeleteIcon fontSize='inherit'/>
                                     </IconButton>   

                                     
                                     <IconButton aria-label="Delte" size="large" onClick={() =>Off()} >
                                         <IndeterminateCheckBoxIcon fontSize='inherit'/>
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

            {showInfoModal && selectedRol && ReactDOM.createPortal(
            <InventoryInfo
              rol={selectedRol}
              handleCloseModal={handleCloseInfoModal}
              open={showInfoModal}
            />,
            document.body
          )} 
          </div>
      </div>
        </>
    )
}

export default Inventory
