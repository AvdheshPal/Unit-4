const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
    {
        first_name:{type: String, required: true},
        last_name:{type: String, required: false},
        book_id:[{type:mongoose.Schema.Types.ObjectId, ref:"books", required:true}]
    },
    {versionKey:false,timelaps:true}
)


module.exports = mongoose.model("author", authorSchema)
