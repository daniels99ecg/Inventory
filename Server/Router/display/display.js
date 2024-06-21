const Router = require('express').Router()
const displayController=require('../../Controller/display/display')

Router.get('/', displayController.listDisplay)
Router.get('/:displayId', displayController.updateDisplay)
Router.get('/count', displayController.countDisplay)
Router.post('/create', displayController.createDisplay)
Router.put('/type/:displayId', displayController.Type)
Router.put('/update/:displayId', displayController.updateDisplay)
Router.delete('/delete/:displayId', displayController.deleteDisplay)



module.exports= Router;