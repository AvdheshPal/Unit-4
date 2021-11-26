const express = require('express');

const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const connect = ()=>{
    return mongoose.connect(`mongodb://127.0.0.1:27017/test`)
}


const userSchema = new mongoose.Schema({
    id:{type:Number , required:false},
    movie_name:{type:String , required:true},
    movie_genre:{type:String , required:true},
    production_year:{type:Number , required:true},
    budget:{type:Number , required:true}
});

const Movie = mongoose.model("movies", userSchema)

// see all movies

app.get("/users" ,async (req,res)=>{
    try{
        const movies = await Movie.find().lean().exec();
        return res.send(movies)
    }
    catch(e){
       return res.status(500).json({massage:e.massage,status:"failed"})
    }
});

// add a new movie

app.post("/users" ,async (req,res)=>{
    try{
        const movie = await Movie.create(req.body)
       return res.status(201).send(movie)
    }catch(e){
        return res.status(500).send({status:e.message})
    }
})

//  get a single movie

app.get("/users/:id", async (req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id).lean().exec()
        return res.status(200).send(movie)
    }catch(e){
        return res.status(500).send({status:e.message});
    }
})

// update a movie

app.patch("/users/:id", async(req,res)=>{
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec()

        return res.status(201).send(movie);
    }catch(err){return res.status(500).send({status:err.message})}
})

// delete a movie

app.delete("/users/:id", async (req,res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec()

        return res.status(201).send(movie)
    }
    catch(err){return res.status(500).send({status:err.message})}
})

app.listen(2345,async()=>{
    await connect();
    console.log("listing the port 2345");
})

