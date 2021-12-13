const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Theatre = require('../model/theatre.model')

router.get("/theatre", async (req,res)=>{
    try{
        const output = await Theatre.find().lean().exec();

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("/theatre", async (req,res)=>{
    try{
        const output = await Theatre.create(req.body)

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

module.exports = router ;