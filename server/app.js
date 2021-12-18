require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
const cors = require('cors');


const mongoDB = "mongodb://localhost:27017/projectdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/api', apiRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..","client","build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve("..","client","build","index.html"))
    );
} else if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
}

module.exports = app;
