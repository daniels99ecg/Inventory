import React from "react";

import Inventory from "./page/inventory/inventory"
import CreateInventory from "./page/inventory/inventoryCreate"
import EditInventory from "./page/inventory/inventoyEdit";

import CreateInput from "./page/input/inputCreate";
import Dashboard from "./page/Dashboard/Dashboard";
import Input from "./page/input/input";
import Login from "./page/login/login";
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./page/protecterRouter";
import { useState } from 'react'
import Display from "./page/display/display";
import CreateDisplay from "./page/display/displayCreate";
import EditInput from "./page/input/inputEdit"
import EditDisplay from "./page/display/displayEdit";

function Main(){
    const [isAuthenticated, setIsAuthenticated] = React.useState(
        localStorage.getItem('isAuthenticated') === 'true' // Convertir el valor de string a booleano
    );
    return(
        <>   
        <Routes>

        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />


        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard/>} isAuthenticated={isAuthenticated}/>}/>
        <Route path='/inventory' element={ <ProtectedRoute element={<Inventory/>} isAuthenticated={isAuthenticated}/>}/>
        <Route path='/inventory/create' element={ <ProtectedRoute element={<CreateInventory/>} isAuthenticated={isAuthenticated}/>   }/>
        <Route path='/inventory/edit/:id_inventory' element={ <ProtectedRoute element={<EditInventory/>} isAuthenticated={isAuthenticated}/>}/>


        <Route path='/input' element={ <ProtectedRoute element={<Input/>} isAuthenticated={isAuthenticated}/>   }/>
        <Route path='/input/create' element={ <ProtectedRoute element={<CreateInput/> } isAuthenticated={isAuthenticated}/>  }/>
        <Route path='/input/update/:id_input' element={ <ProtectedRoute element={<EditInput/> } isAuthenticated={isAuthenticated}/>  }/>


        <Route path='/display' element={<ProtectedRoute element={<Display/>} isAuthenticated={isAuthenticated}/>}/>
        <Route path='/display/create' element={ <ProtectedRoute element={<CreateDisplay/> } isAuthenticated={isAuthenticated}/>  }/>
        <Route path='/display/update/:id_display' element={ <ProtectedRoute element={<EditDisplay/> } isAuthenticated={isAuthenticated}/>  }/>


         </Routes>
        </>

    )   
}

export default Main


