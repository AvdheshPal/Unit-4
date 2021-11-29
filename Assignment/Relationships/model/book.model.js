const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        body: {type:String , required:true},
        section_id:[{type:mongoose.Schema.Types.ObjectId, ref:"sections", required:true}],
        author_id:[{type:mongoose.Schema.Types.ObjectId , ref:"booksauthor", required:true}],
        checked_id:{type:mongoose.Schema.Types.ObjectId , ref:"checkedout", required:false}
    },
    {
        versionkey:false,
        timestamps:true
    }
)

module.exports = mongoose.model("books",bookSchema)