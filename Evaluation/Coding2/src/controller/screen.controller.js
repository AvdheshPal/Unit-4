const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Screen = require('../model/screen.model')

router.get("/screen", async (req,res)=>{
    try{
        const output = await Screen.find().lean().exec();

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("/screen", async (req,res)=>{
    try{
        const output = await Screen.create(req.body)

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

module.exports = router ;