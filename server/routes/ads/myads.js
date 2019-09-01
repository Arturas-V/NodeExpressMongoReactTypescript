const Ad = require("../../models/Ad");
const UserSession = require('../../models/UserSession');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get('/myads', function(req, res) {

    const sessionCookie = req.cookies["dollar"];

    // send response of not logged in user
    if(!sessionCookie || sessionCookie === "0") {
        return res.status(200).json({
            loggedIn: false
        });
    }


    try {
        const _id = mongoose.Types.ObjectId(sessionCookie);

        Ad.find({ owner: _id }).sort({timestamp: -1}).exec( (err, ads) => {  
        
            if(err) {
                return res.status(500).json({
                    msg: 'Error: Server error, try again later',
                    loggedIn: false
                });
            }
    
            if(!ads) {
                return res.status(200).json({
                    msg: "You have no ads createds"
                });
            }
    
            if(ads) {
                return res.status(200).json({
                    ads: ads
                });
            }
    
        });

    } catch (e) {
        // this means somebdy was trying to fuck up with cookie
        // by changing cookie value to not 24 hex chacaters, hence fuck off

        res.cookie('dollar', "0", { maxAge: 900000, httpOnly: true });
        res.status(200).json({
            loggedIn: false
        });
    }

});

module.exports = router;