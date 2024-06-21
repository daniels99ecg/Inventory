import axios from "axios"

export const getListInput= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/input')
  }

  export const getListInputId= async (id_input)=>{
    return await axios.get(`https://qlj234x6-3001.use.devtunnels.ms/input/${id_input}`)
  }

  export const getCountInput= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/input/count')
  }


  export const getCountInventory= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/input/countinventory')
  }

  export const getCountInventoryTotal= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/input/countinventorytotal')
  }


export const getCountDevice= async ()=>{
    return await axios.get('https://qlj234x6-3001.use.devtunnels.ms/input/countDevice')
  }




  export const updateInputs=async (id_input, task)=>{
    try{
   const response=await axios.put(`https://qlj234x6-3001.use.devtunnels.ms/input/update/${id_input}`, task);
   return response.data; 
  }catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };



  export const CreateNewInput = async (task) => {
    try {
      const response = await axios.post(`https://qlj234x6-3001.use.devtunnels.ms/input/create`, task);
      return response.data; 
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  }


  export const  DelListInput=async (id_input)=>{
    return await axios.delete(`https://qlj234x6-3001.use.devtunnels.ms/input/delete/${id_input}`)
  }
  


  export const updateInputStatus=async (id_input, task)=>{
    try{
   const response=await axios.put(`https://qlj234x6-3001.use.devtunnels.ms/input/status/${id_input}`, task);
   return response.data; 
  }catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };
  