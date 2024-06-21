const sequelize=require("../../Db/db")
const User=require('../../Models/users/users')



async function listUser(req, res){
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los users' });
        console.log(error)
    }
}



async function login(req, res) {
    const { email, passwords } = req.body;
  
    try {
        const users = await User.findOne({email,passwords });
        if (!users) {
            return res.status(404).send('Usuario no encontrado');
        }
          if (users.passwords !== passwords) {
            return res.status(404).send( 'Contraseña o Emai incorrecto');
        }
        res.json(users);
    } catch (error) {
      res.status(500).send( 'Hubo un error al iniciar sesión');
    }
  }
  
  

module.exports={
    listUser,
    login
}