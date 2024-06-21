const sequelize=require("../../Db/db")
const Perfil =require('../../Models/Inventory/inventory')
const { exec } = require('child_process');
const path = require('path');
const { spawn } = require('child_process');

/*
async function listInvetory(req, res){
    try {
        const perfil = await Perfil.findAll();
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}



*/

async function listInvetory(req, res){
    try {
        const perfil = await sequelize.query(`
        SELECT 
        u.id_inventory,
            u.EmployeeName, 
            u.Company, 
            u.Role, 
            u.Os,
            u.Status, 
            u.key_BitLocker,
            u.Bitlocker,
            d.Model, 
            d.SerialNumber, 
            d.AssetName 
        FROM 
        inventoryes u
        LEFT JOIN  
            inputs d 
        ON 
            u.fk_input = d.id_input
    `,
    { type: sequelize.QueryTypes.SELECT })
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}


async function listInvetoryId(req, res){
    try {
      const inventoryId = req.params.inventoryId;
      const inventory = await Perfil.findByPk(inventoryId);

      if (inventory) {
        res.json(inventory);
      } else {
        res.status(404).json({ message: 'Inventario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }

async function createInventory(req, res) {
    const dataInventory = req.body;
    try {
      
      const perfil = await Perfil.create({
        Status:'Active',
        EndDate: dataInventory.EndDate,
        EmployeeName: dataInventory.EmployeeName,
        Company: dataInventory.Company,
        Accounts: dataInventory.Accounts,
        Info: dataInventory.Info,
        PurchasedFor: dataInventory.PurchasedFor,
        Role: dataInventory.Role,
        DateReceived: dataInventory.DateReceived,
        Brand: dataInventory.Brand,
        Model: dataInventory.Model,
        SerialNumber: dataInventory.SerialNumber,
        AssetName: dataInventory.AssetName,
        Bitlocker: dataInventory.Bitlocker,
        OS:dataInventory.OS,
        fk_input:dataInventory.fk_input
      });
  
      res.status(201).json(perfil);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }





  async function updateInventroy(req, res) {
    try {
        const inventoryId =req.params.inventoryId;
        const dataInventory =req.body;

        const inventory = await Perfil.findByPk(inventoryId);
        if (!inventory) {
            return res.status(404).json({ error: 'Insumo no encontrado' });
        }
        await inventory.update(
            {
              Status:dataInventory.Status,
              EndDate: dataInventory.EndDate,
              EmployeeName: dataInventory.EmployeeName,
              Company: dataInventory.Company,
              Accounts: dataInventory.Accounts,
              Info: dataInventory.Info,
              PurchasedFor: dataInventory.PurchasedFor,
              Role: dataInventory.Role,
              DateReceived: dataInventory.DateReceived,
              Brand: dataInventory.Brand,
              Model: dataInventory.Model,
              SerialNumber: dataInventory.SerialNumber,
              AssetName: dataInventory.AssetName,
              Bitlocker: dataInventory.Bitlocker,
              key_Bitlocker:dataInventory.key_Bitlocker,
              OS:dataInventory.OS,
              fk_input:dataInventory.fk_input
            },
            {
                where: { id_inventory:inventory.inventory }
            }
        );
        res.status(201).send(inventory)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar insumo'});
    }
}




async function deleteInventory(req, res) {
  try {
      const inventoryId = req.params.inventoryId;
      const inventory = await Perfil.findByPk(inventoryId);

      if (!inventory) {
          return res.status(404).json({ error: 'Inventory no encontrado' });
      }

      // Elimina el cliente
      await inventory.destroy();

      res.json({ message: 'Inventory eliminado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar Inventory' });
  }
}



async function Status(req, res) {
  try {
      const inventoryId = req.params.inventoryId;
      const nuevaOperacion = req.body.Status;

      const cliente = await Perfil.findByPk(inventoryId);
      
      if (!cliente) {
          return res.status(404).json({ error: 'Inventory no encontrado' });
      }

      await cliente.update({ Status: nuevaOperacion });

      await cliente.update({ fk_input: null });

      res.status(200).json({ message: 'Inventory habilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al habilitar Inventory' });
  }
}



async function Offbording2(req, res) {
  try {
    // Construir la ruta completa al archivo PowerShell que deseas ejecutar
    const scriptPath = path.join(__dirname, '../../PowerShell/Pruebas.ps1');

    // Comando PowerShell para ejecutar el script
    const command = `powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`;

    // Ejecutar el comando PowerShell y capturar la salida
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error al ejecutar el comando PowerShell:', err);
        return res.status(500).json({ error: 'Error al ejecutar el comando PowerShell' });
      }
      // Enviar la salida del comando como respuesta JSON
      res.json({ powershellOutput: stdout });
    });
  } catch (error) {
    console.error('Error en función Offbording:', error);
    res.status(500).json({ error: 'Error en función Offbording' });
  }
}



async function Offbording(req, res) {
  try {
 

    // Ejecutar el archivo .exe con el email como argumento
    exec(`start OffboardingScriptCurrent.exe`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error al ejecutar el archivo .exe:', err);
        return res.status(500).json({ error: 'Error al ejecutar el archivo .exe' });
      }
      // Enviar una respuesta exitosa
      res.status(200).send('Se ejecutó el archivo .exe correctamente.');
    });
  } catch (error) {
    console.error('Error en función Offbording:', error);
    res.status(500).json({ error: 'Error en función Offbording' });
  }
}

module.exports={
    listInvetory,
    listInvetoryId,
    createInventory,
    updateInventroy,
    deleteInventory,
    Status,
    Offbording
}