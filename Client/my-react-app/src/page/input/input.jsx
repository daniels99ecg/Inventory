import React from "react";

import { getListInput,DelListInput } from "../../api/input/input";

import { useState, useEffect } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

import Nav from "../nav";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Swal = require('sweetalert2')






function Input() {

    const [listar, setListar] = useState([])
    const navigate=useNavigate()
    const [searchTerm, setSearchTerm] = useState("");


    async function cargarInput() {
        const response = await getListInput()

        const filterList = response.data.filter((item) => {
            // Convert searchTerm to lowercase for case-insensitive search
            const searchTermLowerCase = searchTerm.toLowerCase();
        
            // Check each property for inclusion of the searchTerm after converting both to lowercase
            return (
                item.id_input.toString().includes(searchTermLowerCase) ||
                item.Model.toLowerCase().includes(searchTermLowerCase) ||
                (item.SerialNumber && item.SerialNumber.toLowerCase().includes(searchTermLowerCase)) || // Null check for item.Role
                (item.AssetName && item.AssetName.toLowerCase().includes(searchTermLowerCase)) // Null check for item.Status
            );
        });

        setListar(filterList);
    }


    const Delete = async (id_input) => {
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
            
              const response = await DelListInput(id_input)
              setListar(listar.filter(listar=>listar.id_input!==id_input))
  
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
               
                <h1>Supplies List</h1>
                <Button variant="contained"
                onClick={()=>navigate("/input/create")}
                >New Supplies</Button>
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
                        id: item.id_input,
                       
                    }))}
                    style={{ width: 1200 }}
                    columns={[
                        { field: 'id_input', headerName: 'Id', flex: 0 },
                        { field: 'Model', headerName: 'Model', flex: 1 },
                        { field: 'SerialNumber', headerName: 'Serial Number', flex: 1 },
                        { field: 'AssetName', headerName: 'Asset Name', flex: 1 },
                        { field: 'Statu', headerName: 'Status', flex: 1 },
                        { field: 'Action', headerName: 'Action', flex: 1,
                        renderCell:(params)=>(
                            <div>
                                    <IconButton aria-label="Edit" size="large" onClick={() =>navigate(`/input/update/${params.row.id_input}`)} >
                                        <EditIcon fontSize='inherit'/>
                                    </IconButton>   

                                     <IconButton aria-label="Delete" size="large" onClick={() =>Delete(params.row.id_input)} >
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

export default Input
