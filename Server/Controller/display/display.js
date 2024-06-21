const sequelize=require("../../Db/db")
const Display =require('../../Models/display/display')



async function listDisplay(req, res){
    try {
        const display = await Display.findAll();
        res.json(display);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las pantallas' });
        console.log(error)
    }
}






async function listDisplayId(req, res){
    try {
      const displayId = req.params.displayId;
      const display = await Display.findByPk(displayId);

      if (display) {
        res.json(display);
      } else {
        res.status(404).json({ message: 'Inventario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }


async function createDisplay(req, res) {
    const dataDisplay = req.body;
    try {
      
      const display = await Display.create({
       
          SerialNumber:dataDisplay.SerialNumber,
           brad:dataDisplay.brad,
          date:dataDisplay.date,
          type:dataDisplay.type,
          Statu:'Spare'
      });
  
      res.status(201).json(display);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }



  async function updateDisplay(req, res) {
    try {
        const displayId =req.params.displayId;
        const dataDisplay =req.body;

        const display = await Display.findByPk(displayId);
        if (!display) {
            return res.status(404).json({ error: 'display no encontrado' });
        }
        await display.update(
            {
                SerialNumber:dataDisplay.SerialNumber,
                brad:dataDisplay.brad,
                date:dataDisplay.date,
                type:dataDisplay.type
            
            },
            {
                where: { id_display:display.display }
            }
        );
        res.status(201).send(display)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al actualizar el display'});
    }
}


async function deleteDisplay(req, res) {
  try {
      const displayId = req.params.displayId;
      const display = await Display.findByPk(displayId);

      if (!display) {
          return res.status(404).json({ error: 'Input no encontrado' });
      }

      // Elimina el cliente
      await display.destroy();

      res.json({ message: 'Input eliminado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar Input' });
  }
}



  async function Type(req, res) {
    try {
        const displayId = req.params.displayId;
        const nuevaOperacion = req.body.type;
  
        const display = await Display.findByPk(displayId);
        
        if (!display) {
            return res.status(404).json({ error: 'Display no encontrado' });
        }
  
        await display.update({ type: nuevaOperacion });
  
  
        res.status(200).json({ message: 'Inventory habilitado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al habilitar Inventory' });
    }
  }


  async function countDisplay(req, res){
    try {
        const perfil = await sequelize.query(`
       
        SELECT COUNT(Statu) AS Total
        FROM displays

    `,
    { type: sequelize.QueryTypes.SELECT })
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
        console.log(error)
    }
}


module.exports={
    listDisplay,
    listDisplayId,
    createDisplay,
    Type,
    updateDisplay,
    deleteDisplay,
    countDisplay
}


