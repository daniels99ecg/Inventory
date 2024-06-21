
import React from "react";

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import LogoutIcon from '@mui/icons-material/Logout';

import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";

import TvIcon from '@mui/icons-material/Tv';
import DvrIcon from '@mui/icons-material/Dvr';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';


function Nav(){

    const navigate=useNavigate()
    const handleLogout = () => {
     
      localStorage.removeItem('isAuthenticated');
    
      navigate("/");
  };

    return(

<>
<Paper  sx={{ width: '20%'}}>
      <MenuList>

      <MenuItem onClick={()=>navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        
        </MenuItem>

        <MenuItem onClick={()=>navigate("/inventory")}>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Employees List</ListItemText>
        
        </MenuItem>
       
        <MenuItem onClick={()=>navigate("/input")}>
          <ListItemIcon>
            <DvrIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Supplies List</ListItemText>
        
        </MenuItem>

        <MenuItem onClick={()=>navigate("/display")}>
          <ListItemIcon>
            <TvIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Display List</ListItemText>
        
        </MenuItem>


        <MenuItem onClick={()=>alert("/En proceso/")}>
          <ListItemIcon>
            <SettingsInputComponentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>IT Peripherals  List</ListItemText>
        
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>

      </MenuList>

    </Paper>
</>



    )
}

export default Nav