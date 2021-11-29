const express = require('express')

const author = require('../model/author.model')


app.get("/author", async (req, res) => {
    try{
        const Author = await author.find().populate("book_id").lean().exec();
        return res.status(200).send(Author)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/author", async (req,res) =>{
    try{
        const Author = await author.create(req.body)
        return res.status(201).send(Author)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/author/:id",async(req,res)=>{
    try{
    const Author = await authors.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(Author)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

module.exports = author;