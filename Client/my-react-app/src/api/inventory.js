
import axios from "axios"

export const getListInventory= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/invetory')
  }



  
  export const  getListInventoryID=async (id_inventory)=>{
    return await axios.get(`https://qlj234x6-3001.use.devtunnels.ms/invetory/${id_inventory}`)
}

export const  getOffID=async ()=>{
  return await axios.post(`https://qlj234x6-3001.use.devtunnels.ms/invetory/pruebas`)
}

export const CreateNewInventory = async (task) => {
  try {
    const response = await axios.post(`https://qlj234x6-3001.use.devtunnels.ms/invetory/create`, task);
    return response.data; 
  } catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
}

export const updateInventroys=async (id_inventory, task)=>{
  try{
 const response=await axios.put(`https://qlj234x6-3001.use.devtunnels.ms/invetory/update/${id_inventory}`, task);
 return response.data; 
}catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
};



export const updateInventroysStatus=async (id_inventory, task)=>{
  try{
 const response=await axios.put(`https://qlj234x6-3001.use.devtunnels.ms/invetory/status/${id_inventory}`, task);
 return response.data; 
}catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
};


export const  DelListInventory=async (id_inventory)=>{
  return await axios.delete(`https://qlj234x6-3001.use.devtunnels.ms/invetory/delete/${id_inventory}`)
}


export const  PostLogin=async (email, passwords)=>{
  return await axios.post(`https://qlj234x6-3001.use.devtunnels.ms/user/login/`,{
    email:email,
    passwords:passwords
  })
}
