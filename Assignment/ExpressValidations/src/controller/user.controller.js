const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user.model')

const { body, validationResult } = require('express-validator');
const { Error } = require('mongoose');

router.get("", async (req,res)=>{
    try{
        const output = await User.find().lean().exec();

        return res.status(200).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

router.post("",
body("first_name").not().isEmpty().withMessage("first_name should not be empty"),

body("last_name").not().isEmpty().withMessage("last_name should not be empty"),

body("email").custom(async (value)=>{
    const ispresent = await User.findOne({ email: value}).lean().exec()
    if(ispresent){
        throw new Error("please provide a new email address this email is already in use")
    }
    return true;
}).isEmail().withMessage("Please enter a valid email"),

body("pincode").isLength({min:6,max:6}).withMessage("pincode should be at least 6 characters"),

body("age").custom( async (value)=>{
    if(value < 1 || value > 100){
        throw new Error("age should be between 1 to 100")
    }
    return true;
}).not().isEmpty().withMessage("age should not be empty"),

body("gender").custom( async (value)=>{
    if(value!="male" && value!="female" && value!="other"){
        throw new Error("gender should only be male or female or other")
    }
    return true;
}).not().isEmpty().withMessage("Gender should not be empty"),

 async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newError =  errors.array().map(({param, value,msg}) =>{
                return {
                    [param]:msg
                }
            })
          return res.status(400).json({ errors:newError });
        }


        const output = await User.create(req.body)

        return res.status(201).json(output)
    }
    catch(err){
        return res.status(500).json({message:err.message, status:'Failed'});
    }
})

module.exports = router;