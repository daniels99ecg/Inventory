const sequelize=require("../../Db/db")
const Input =require('../../Models/inputs/input')



async function listInput(req, res){
    try {
        const insumos = await Input.findAll();
        res.json(insumos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los insumos' });
        console.log(error)
    }
}

async function listInputId(req, res){
    try {
      const inputId = req.params.inputId;
      const input = await Input.findByPk(inputId);

      if (input) {
        res.json(input);
      } else {
        res.status(404).json({ message: 'Inventario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }



async function createInput(req, res) {
    const dataInput = req.body;
    try {
      
      const input = await Input.create({
       
          Model:dataInput.Model,
          SerialNumber:dataInput.SerialNumber,
          AssetName:dataInput.AssetName,
          Statu:'Spare'
      });
  
      res.status(201).json(input);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }


  async function updateInput(req, res) {
    try {
        const inputId =req.params.inputId;
        const dataInput =req.body;

        const input = await Input.findByPk(inputId);
        if (!input) {
            return res.status(404).json({ error: 'input no encontrado' });
        }
        await input.update(
            {
                Model:dataInput.Model,
                SerialNumber:dataInput.SerialNumber,
                AssetName:dataInput.AssetName,
              
            },
            {
                where: { id_input:input.input }
            }
        );
        res.status(201).send(input)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar el input'});
    }
}



async function deleteInput(req, res) {
    try {
        const inputId = req.params.inputId;
        const input = await Input.findByPk(inputId);
  
        if (!input) {
            return res.status(404).json({ error: 'Input no encontrado' });
        }
  
        // Elimina el cliente
        await input.destroy();
  
        res.json({ message: 'Input eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar Input' });
    }
  }
  


  async function Status(req, res) {
    try {
        const inputId = req.params.inputId;
        const nuevaOperacion = req.body.Statu;
  
        const input = await Input.findByPk(inputId);
        
        if (!input) {
            return res.status(404).json({ error: 'Inventory no encontrado' });
        }
  
        await input.update({ Statu: nuevaOperacion });

  
        res.status(200).json({ message: 'Inventory habilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar Inventory' });
    }
  }

async function countInput(req, res){
    try {
        const perfil = await sequelize.query(`
        SELECT Statu, COUNT(*) AS Total
        FROM inputs
        WHERE Statu IS NOT NULL AND Statu != ''
        GROUP BY Statu

    `,
    { type: sequelize.QueryTypes.SELECT })
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}

async function countDevice(req, res){
    try {
        const perfil = await sequelize.query(`
        SELECT  COUNT(Statu) AS Total
        FROM inputs

    `,
    { type: sequelize.QueryTypes.SELECT })
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}








async function countInventory(req, res){
    try {
        const perfil = await sequelize.query(`
        SELECT Os, COUNT(*) AS Total
        FROM inventoryes
        WHERE Os IS NOT NULL AND Os != ''
        GROUP BY Os

    `,
    { type: sequelize.QueryTypes.SELECT })
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}


async function countInventoryTotal(req, res){
    try {
        const perfil = await sequelize.query(`
        SELECT COUNT(Status) AS Total
        FROM inventoryes
		where Status='Active'

    `,
    { type: sequelize.QueryTypes.SELECT })
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}




module.exports={
    listInput,
    countInput,
    countInventory,
    countInventoryTotal,
    createInput,
    countDevice,
    updateInput,
    listInputId,
    deleteInput,
    Status
}