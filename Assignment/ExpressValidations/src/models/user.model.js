const mongoose = require('mongoose');

const express = require('express')

const userSchema = new mongoose.Schema(
    {
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    pincode:{type:Number,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:false,default:"male"}
    },
    {versionKey: false, timestamp: true,new:true}
)

module.exports = mongoose.model("user", userSchema)