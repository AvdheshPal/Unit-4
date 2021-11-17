const express = require('express');

const app = express()

const data = require("./MOCK_DATA.json")



app.get('/',(req,res)=>{
     res.send('Welcom to home page')
})
app.get('/users',(req,res)=>{
     res.send(data.products)
})

app.listen(3000,()=>{
    console.log("listing to port");
})

