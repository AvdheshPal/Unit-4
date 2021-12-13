const express = require('express');

const mongoose = require('mongoose')

const theatre = require('./theatre.model')

const screenSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        threatre:{type:mongoose.Schema.Types.ObjectId,ref:'theatre',required:true},
    },
    {versionKey: false,timestamps:true}
)

module.exports = mongoose.model("screen", screenSchema)