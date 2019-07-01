"use strict";

// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
// const mongo = require('mongodb');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

// static references
const app = express();

//routes imports
const registerRoute = require('./routes/account/register');
const loginRoute = require('./routes/account/login');
const getUserRoute = require('./routes/account/getUser');
const verifyRoute = require('./routes/account/verify');
const logoutRoute = require('./routes/account/logout');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/weezadb', {useNewUrlParser: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong with connection to DB', err));


// sub routes
app.use('/account', [registerRoute, loginRoute, getUserRoute, verifyRoute, logoutRoute]);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});