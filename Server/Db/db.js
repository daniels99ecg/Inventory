const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('inventory', 'tes', 'Welcome123!', {
  dialect: 'mssql',
  host: 'localhost', // O la dirección IP de tu servidor SQL Server
  port: 1433, // Puerto por defecto de SQL Server
  dialectOptions: {
    options: {
      encrypt: true // Para cifrar la conexión
    }
  }
});

async function conexion(){
    try{
        await sequelize.authenticate();
        console.log("Conexion Exitosa")
    }catch(error){
     console.log("Tenemos un error", error)
    }
    }
    
    conexion()
    


module.exports = sequelize;
