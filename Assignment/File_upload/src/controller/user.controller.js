const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const User = require('../model/user.model')


const multer  = require('multer');

const path = require('path');
const upload = require('../middleware/upload');


router.post('', upload.single("user_ki_image"), async(req,res)=>{
    try{
        const users = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_ki_image: req.file.path,
        });
        return res.status(201).send(users);;
    }
    catch(e){
        return res.status(500).json({message:e.message, status:'Failed'});
    }
});

router.post('/multiple', upload.any("user_ki_image"), async(req,res)=>{
    const filePaths = req.files.map((file) => file.path);
    try{
        const users = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_ki_image:filePaths,
        });
        return res.status(201).send(users);
    }
    catch(e){
        return res.status(500).json({message:e.message, status:'Failed'});
    }
});


module.exports = router;