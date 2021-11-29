const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema(
    {
        section:{type:String, required:true, unique:true},
        book_id:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"books",
                required:false
            }
        ]
    },
    {versionKey:false,
    timestamps:true}
)

module.exports = mongoose.model("sections",sectionSchema)
