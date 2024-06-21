const Router = require('express').Router()
const inputController=require('../../Controller/input/input')

Router.get('/count', inputController.countInput)

Router.get('/countinventory', inputController.countInventory)

Router.get('/countinventorytotal', inputController.countInventoryTotal)

Router.get('/countDevice', inputController.countDevice)



Router.get('/', inputController.listInput)

Router.get('/:inputId', inputController.listInputId)



Router.post('/create', inputController.createInput)

Router.put('/update/:inputId', inputController.updateInput)

Router.delete('/delete/:inputId', inputController.deleteInput)

Router.put('/status/:inputId', inputController.Status)

module.exports= Router;