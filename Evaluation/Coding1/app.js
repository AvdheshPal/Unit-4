const e = require('express')
const express = require('express')

const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const connect =()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/Naukri')
} 
// job schema
const jobSchema = mongoose.Schema(
    {
        company_id:{type:mongoose.Schema.Types.ObjectId,ref:"companies",required:true},
        job_title:{type:String,required:true},
        skills:{type:String,required:true},
        city:[{type:String,required:true}],
        work_from_home:{type:String,required:false,default:"No"},
        time_period:{type:String,required:true}
    },
    {versionKey:false,timestamp:true}
)

const Job = mongoose.model('jobs',jobSchema);

// company schema

const companySchema = mongoose.Schema(
    {
        company_name: {type:String,required:true,unique:true},
        rating:{type:Number,required:true},
        job_available:{type:Number,required:true}
    },{versionKey:false,timestamp:true}
);

const Company = mongoose.model('companies',companySchema)

// crud for job 

app.get('/jobs', async(req,res)=>{
    try{
        const jobs = await Job.find().lean().exec()

        return res.status(200).send(jobs)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post('/jobs', async(req, res) => {
    try{
        const jobs = await Job.create(req.body)

        return res.status(201).send(jobs)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

// crum for company 

app.get('/company', async(req, res) => {
    try{
        const Companies = await Company.find().lean().exec()

        return res.status(200).send(Companies)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

app.post('/company', async(req, res) => {
    try{
        const Companies = await Company.create(req.body)

        return res.status(200).send(Companies)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})


//         <-----------  api for request -------------> 



// ----1---- get all jobs in a particular city which matches a particular skill

app.get('/company/:id', async(req,res)=>{
    try{
        const Companies =  await Company.findById(req.params.id).lean().exec()
        return res.status(200).send(Companies)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

// ----2---- find all the jobs that are available as Work from home.

app.get('/jobtype', async(req,res)=>{
    try{
        const type_of_job =  await Job.find({work_from_home:"YES"}).lean().exec()
        return res.status(200).send(type_of_job)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})


// ----3---- find all the jobs that will accept a notice period of 2 months.

app.get('/jobnotice', async(req,res)=>{
    try{
        const job_notice =  await Job.find({time_period:"2"}).lean().exec()
        return res.status(200).send(job_notice)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})


// ----4---- find all jobs by sorting the jobs as per their rating.


app.get('/jobsrating', async(req,res)=>{
    try{
        const jobs_by_rating =  await Company.find().sort({rating:"-1"}).lean().exec()
        return res.status(200).send(jobs_by_rating)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

//  ----5----  an api to get details of the company

app.get('/company/:id', async(req,res)=>{
    try{
        const Companies =  await Company.findById(req.params.id).lean().exec()
        return res.status(200).send(Companies)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})

// ----6---- fi.nd the company that has the most open jobs

app.get('/mostjob', async(req,res)=>{
    try{
        const mostjobs =  await Company.find().sort({job_available:"-1"}).limit(1).lean().exec()
        return res.status(200).send(mostjobs)
    }
    catch(err){return res.status(500).send({massage:err.message,status:"failed"})}
})






app.listen(3500 , async(req,res)=>{
    await connect()
    console.log("listening port 3500");
})