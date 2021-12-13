const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Show = require('../model/show.model')
const Movie = require('../model/movie.model')

router.get("/shows/:id", async (req,res)=>{
    try{
        const output = await Movie.findById(req.params.id).lean().exec()

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("/show", async (req,res)=>{
    try{
        const output = await Show.create(req.body)
        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})
module.exports = router ;