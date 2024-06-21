const Router = require('express').Router()
const userController=require('../../Controller/user/userController')

Router.get('/', userController.listUser)

Router.post('/login', userController.login)





module.exports= Router;