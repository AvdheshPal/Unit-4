const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Seat = require('../model/seat.model')
const Show = require('../model/show.model')

router.get("/seats", async (req,res)=>{
    try{
        const output = await Show.find().lean().exec();

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("/seat", async (req,res)=>{
    try{
        const output = await Seat.create(req.body)

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

module.exports = router ;