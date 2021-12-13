const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Movie = require('../model/movie.model')

router.get("/movies/:actor", async (req,res)=>{
    try{
        const output = await Movie.find({"actors":req.params.actor}).lean().exec();

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("/movies", async (req,res)=>{
    try{
        const output = await Movie.create(req.body)

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

module.exports = router ;