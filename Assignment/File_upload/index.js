const express = require('express')

const app = express()

const controller = require('./src/controller/user.controller')

app.use(express.json())

app.use("/k", controller)


const connect = require('./src/config/db')

app.listen(2500 , async (req,res)=>{
    await connect();
    console.log("listening port 2500")
})