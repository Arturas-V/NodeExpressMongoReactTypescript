"use strict";

// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

// static references
const app = express();

//routes imports
const registerRoute = require('./routes/account/register');
const loginRoute = require('./routes/account/login');
const verifyRoute = require('./routes/account/verify');
const logoutRoute = require('./routes/account/logout');
app.use(cookieParser());

// dynamic refences
let db = {};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/weezadb', {useNewUrlParser: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// routes
app.get('/', function (req, res) {
    res.send('Hello World! qaaaaaaa');
});
app.get('/shops', function (req, res) {
    res.send('Shops page!!!!');
});
app.get('/customers', function (req, res) {
    res.send(db.collection('customers').find());
});

// sub routes
app.use('/account', [registerRoute, loginRoute, verifyRoute, logoutRoute]);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});