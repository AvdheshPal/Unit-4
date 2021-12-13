const express = require('express');

const mongoose = require('mongoose')

const theatreSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        location:{type:String,required:true}
    },
    {versionKey: false,timestamps:true}
)

module.exports = mongoose.model("theatre", theatreSchema)