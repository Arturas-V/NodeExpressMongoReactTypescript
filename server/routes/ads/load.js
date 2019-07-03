const Ad = require("../../models/Ad");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/load', function(req, res) {


    Ad.find({ live: true }).exec( (err, ads) => {  
        
        if(err) {
            return res.status(500).json({
                msg: 'Error: Server error, try again later',
                loggedIn: false
            });
        }

        if(!ads) {
            return res.status(200).json({
                msg: "no ads, sorry"
            });
        }

        if(ads) {
            return res.status(200).json({
                ads: ads
            });
        }

    });

});

module.exports = router;