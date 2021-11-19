const express = require('express');

const app = express()

app.use(express.json())


let data = require('./db.json')

  
  // 1st assignment
  
app.get("/",(req,res)=>{
    res.send(data.data)
  })
    
// 2nd assignment


app.post("/books",(req,res)=>{
    console.log("post working");
    const newpublish = [...data.data,req.body]
    res.send(newpublish)
})

// 3rd assignment

app.get("/books/:id",(req,res)=>{
    const kuchbhi = data.data.filter((user)=>user.ID === req.params.id)
    res.send(kuchbhi)
})


// 4th assignment 

app.patch("/books/:id",(req,res)=>{
    const newUser = data.data.map((user)=>{
        if(req.params.id === user.ID){
            if(req?.body?.Author)user.Author = req.body.Author;
            if(req?.body?.Year)user.Year = req.body.Year;
        }
        return user
    })
    res.send(newUser)
})

// 5th assignment

app.delete("/books/:id",(req,res)=>{
    const updated = data.data.filter((user)=>user.ID !== req.params.id);
    res.send(updated)
})


app.listen(2500,()=>{
    console.log("listening")
})