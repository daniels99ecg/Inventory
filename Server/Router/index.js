
const inventory= require('./Inventory/inventory')

const input= require('./Input/input')

const user = require('./user/user')

const display = require('./display/display')

function ResApi(app){
app.use("/invetory", inventory)
app.use("/input", input)
app.use("/user", user)
app.use("/display", display)
}


module.exports=ResApi;