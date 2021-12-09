const express = require('express');

const mongoose = require('mongoose')

const usercontroller = require('./src/controller/user.controller')

const app = express()

app.use(express.json())


app.use("/user",usercontroller)

const connect = require('./src/config/db')

app.listen(2345 , async (req,res)=>{
    await connect();
    console.log("listening port 2345")
})