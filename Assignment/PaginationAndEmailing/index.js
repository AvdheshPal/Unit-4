const express = require('express');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());


const connect = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/Userdb');
}

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true }
    }, { versionKey: false, timestamp: true }
)

const User = mongoose.model("users", userSchema);

const nodemailer = require('nodemailer')
require('dotenv').config()
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "6f7dec55b02c3a",
        pass: "b802ccb1dc0775",
    },
});


const tfuntion = (from, to, subject, text, html) => {
    const message = {
        from,
        to,
        subject,
        text,
        html
    };

    transporter.sendMail(message);

}

app.get('/', async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const size = +req.query.size || 5;

        const skip = (page - 1) * size;
        const totalPage = Math.ceil((await User.find().countDocuments()) / size);
        const user = await User.find().skip(skip).limit(size).lean().exec();
        res.json({ user, totalPage })
        return res.send(user)
    }
    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message })
    }
})

app.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)

        tfuntion(
            "baghel.rohit99@gmail.com",
            `${req.body.email}`,
            `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
            ` Hi ${req.body.first_name}, This is the confermation mail for the creating a new user`,
            `<h1>Hi ${req.body.first_name}, This is the confermation mail for the creating a new user</h1>`
        )

        return res.status(201).json(user)
    }
    catch (err) {
        return res.status(500).send({ status: "failed", message: err.message })
    }

})


app.listen(2500, async (req, res) => {
    await connect()
    console.log("listening the port 2500")
})