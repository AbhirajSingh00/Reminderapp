require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// App Configurations
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.Port || 9000;

// Connecting to Mongoose
mongoose.connect('mongodb://localhost:27017/reminderAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
})

// Schema for the App
const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean
})

// Creating Model
const Reminder = new mongoose.model("reminder", reminderSchema);

// Creating Routes
app.get("/getAllReminder", (req, res) => {
    Reminder.find({}).then((reminderList) => {
        res.send(reminderList);
    }).catch((error) => {
        console.log(error);
    })
})

app.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body;
    const reminder = new Reminder({
        reminderMsg,
        remindAt,
        isReminded: false
    })
    reminder.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(reminderList);
        }
    })

})

app.post("/deleteReminder", (req, res) => {
    reminder.deleteOne({ id: req.body.id }, () => {
        Reminder.find({}).then((reminderList) => {
            res.send(reminderList);
        }).catch((err) => {
            console.log(err);
        })
    })
})

app.get("/", (req, res) => {
    res.send("App is here")
})

// Listening to the Port
app.listen(PORT, () => {
    console.log("Backend Started");
})