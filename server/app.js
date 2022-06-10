const express = require('express')
const app = express()
const sqlRouter = require('./routes/sqlRouter')
const body = require('body-parser')
require('dotenv').config()


//cors
const cors = require('cors')
const corsOptions = {
    origin:'*',  
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    
 }

 
app.use(cors(corsOptions))
app.use(body.urlencoded({extended:true}))
app.use(body.json())


app.use("/", sqlRouter)


app.listen(process.env.PORT ,()=>{
    console.log('Running on Port 3000')
})