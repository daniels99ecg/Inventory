const express= require('express')
const ResApi =require('./Router/index')
const cors=require("cors")  

const app = express()
app.use(express.json());


  
app.use(cors())    
ResApi(app)

app.listen(3001, ()=>{
    console.log('Server in line :)')
})