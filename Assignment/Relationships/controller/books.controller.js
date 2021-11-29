
const express = require('express')


const books = require('../model/book.model')

app.get("/books", async (req, res) => {
    try{
        const Books = await books.find().populate("section_id").lean().exec();
        return res.status(200).send(Books)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/books", async (req,res) =>{
    try{
        const Books = await books.create(req.body)
        return res.status(201).send(Books)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/books/:id",async(req,res)=>{
    try{
    const Books = await books.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(Books)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

module.exports = books;
