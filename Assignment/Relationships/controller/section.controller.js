const express = require('express')


const sections = require('../model/section.model')



app.get("/section", async (req, res) => {
    try{
        const Section = await sections.find().lean().exec();
        return res.status(200).send(Section)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/section", async (req,res) =>{
    try{
        const Section = await sections.create(req.body)
        return res.status(201).send(Section)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/sections/:id",async(req,res)=>{
    try{
    const Section = await sections.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(Section)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})


module.exports = sections;