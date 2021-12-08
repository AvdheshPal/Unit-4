const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    first_name:{type:String , required:true},
    last_name:{type:String , required:true},
    user_ki_image:[{type:String , required:true}]
});

module.exports = mongoose.model("users", userSchema)