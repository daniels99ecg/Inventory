
import axios from "axios"

export const getListDisplay= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/display')
  }

  export const getLisDisplaytId= async (id_display)=>{
    return await axios.get(`https://qlj234x6-3001.use.devtunnels.ms/display/${id_display}`)
  }


  export const CreateNewDisplay = async (task) => {
    try {
      const response = await axios.post(`https://qlj234x6-3001.use.devtunnels.ms/display/create`, task);
      return response.data; 
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  }


  export const updateDisplayType=async (id_display, task)=>{
    try{
   const response=await axios.put(`https://qlj234x6-3001.use.devtunnels.ms/display/type/${id_display}`, task);
   return response.data; 
  }catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };


  export const updateDisplay=async (id_display, task)=>{
    try{
   const response=await axios.put(`https://qlj234x6-3001.use.devtunnels.ms/display/update/${id_display}`, task);
   return response.data; 
  }catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };


  export const getCountDisplay= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/display/count')
  }


  export const  DelListDispaly=async (id_display)=>{
    return await axios.delete(`https://qlj234x6-3001.use.devtunnels.ms/display/delete/${id_display}`)
  }
  