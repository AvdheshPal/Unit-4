const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        user: {type: String, required:true},
        book_id:[{type:mongoose.Schema.Types.ObjectId, ref:"books" , required:true}]
    },
    {
        versionKey:false,timelaps:true
    }
)

module.exports = mongoose.model("checkedouts",userSchema)
