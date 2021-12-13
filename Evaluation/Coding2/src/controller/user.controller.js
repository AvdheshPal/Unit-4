const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../model/user.model')

router.get("/user", async (req,res)=>{
    try{
        const output = await User.find().lean().exec();

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("/user", async (req,res)=>{
    try{
        const output = await User.create(req.body);
        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

module.exports = router ;