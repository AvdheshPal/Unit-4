const express = require('express');

const mongoose = require('mongoose')

const app = express();

app.use(express.json());

const moviecontroller = require('./src/controller/movie.controller')
const screencontroller = require('./src/controller/screen.controller')
const seatcontroller = require('./src/controller/seat.controller')
const showcontroller = require('./src/controller/show.controller')
const theatrecontroller = require('./src/controller/theatre.controller')
const usercontroller = require('./src/controller/user.controller')

const connect = require('./src/config/db')

app.use("",moviecontroller)
app.use("",screencontroller)
app.use("",seatcontroller)
app.use("",showcontroller)
app.use("",theatrecontroller)
app.use("",usercontroller)

app.listen(3000, async(req, res) =>{
    await connect();
    console.log('listening port 3000');
})