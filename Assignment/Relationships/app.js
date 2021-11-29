const express = require('express');

const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const connect = ()=>{
    return mongoose.connect(`mongodb://127.0.0.1:27017/library`)
}





// section schema

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

const sections = mongoose.model("sections",sectionSchema)


// Author schema

const authorSchema = new mongoose.Schema(
    {
        first_name:{type: String, required: true},
        last_name:{type: String, required: false},
        book_id:[{type:mongoose.Schema.Types.ObjectId, ref:"books", required:true}]
    },
    {versionKey:false,timelaps:true}
)


const author = mongoose.model("author", authorSchema)


// user schema

const userSchema = new mongoose.Schema(
    {
        user: {type: String, required:true},
        book_id:[{type:mongoose.Schema.Types.ObjectId, ref:"books" , required:true}]
    },
    {
        versionKey:false,timelaps:true
    }
)

const user = mongoose.model("checkedouts",userSchema)

// book schema

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

const books = mongoose.model("books",bookSchema)

//     crud api books

app.get("/books", async (req, res) => {
    try{
        const Books = await books.find().populate("section_id").lean().exec();
        return res.status(200).send(Books)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/books", async (req,res) =>{
    try{
        const Books = await books.create(req.body)
        return res.status(201).send(Books)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/books/:id",async(req,res)=>{
    try{
    const Books = await books.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(Books)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

//     crud api section

app.get("/section", async (req, res) => {
    try{
        const Section = await sections.find().lean().exec();
        return res.status(200).send(Section)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/section", async (req,res) =>{
    try{
        const Section = await sections.create(req.body)
        return res.status(201).send(Section)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/sections/:id",async(req,res)=>{
    try{
    const Section = await sections.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(Section)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

//     crud api author

app.get("/author", async (req, res) => {
    try{
        const Author = await author.find().populate("book_id").lean().exec();
        return res.status(200).send(Author)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/author", async (req,res) =>{
    try{
        const Author = await author.create(req.body)
        return res.status(201).send(Author)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/author/:id",async(req,res)=>{
    try{
    const Author = await authors.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(Author)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})


/// crud api for users

app.get("/user", async (req, res) => {
    try{
        const User = await user.find().populate("book_id").lean().exec();
        return res.status(200).send(User)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post("/user", async (req,res) =>{
    try{
        const User = await user.create(req.body)
        return res.status(201).send(User)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.patch("/user/:id",async(req,res)=>{
    try{
    const User = await user.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.status(200).send(User)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})




app.listen(3000 , async ()=>{
    await connect()
    console.log("listening port 3000");
});

