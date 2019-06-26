// lib/app.ts
import express = require('express');
import mongodb = require('mongodb');
import assert = require('assert');

// statics 
const dbUrl = 'mongodb://localhost:27017';

// static references
const router = express.Router();
const MongoClient = mongodb.MongoClient;
const app: express.Application = express();

// dynamic refences
let db:any = {};

app.get('/', function (req, res) {
    res.send('Hello World! qaaaaaaa');
});

app.get('/shops', function (req, res) {
    res.send('Shops page!!!!');
});

app.get('/customers', function (req, res) {
    res.send(
        db.collection('customers').find()
    );
});

// Use connect method to connect to the server
MongoClient.connect(dbUrl, function (err, client) {
    
    assert.equal(null, err);
    db = client.db('weezadb');
    // console.log("Connected successfully to server", db.collection('customers').find());

    

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
    // db.close();
});



// sub routing 
router.get('/login', function (req, res) {
    res.send("fuck off now");
});

router.get('/register', function (req, res) {
    res.send("fuck off later");
});

app.use('/account', router);