const Router = require('express').Router()
const inventoryController=require('../../Controller/Inventory/inventoryController')

Router.get('/', inventoryController.listInvetory)
Router.get('/:inventoryId', inventoryController.listInvetoryId)

Router.post('/pruebas', inventoryController.Offbording);

Router.post('/create', inventoryController.createInventory)

Router.put('/update/:inventoryId', inventoryController.updateInventroy)

Router.put('/status/:inventoryId', inventoryController.Status)


Router.delete('/delete/:inventoryId', inventoryController.deleteInventory)


module.exports= Router;