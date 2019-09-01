const Ad = require("../../models/Ad");
const UserSession = require('../../models/UserSession');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get('/load', function(req, res) {

    

    let dbQueryParams = {};

    if(req.query && req.query.owner) {

        if(req.query.owner === "0" || req.query.owner === "undefined") {
            return res.status(200).json({
                msg: "Nothing to display here"
            });
        }

        dbQueryParams = { owner: req.query.owner };

        try {
                
            const _id = mongoose.Types.ObjectId(req.query.owner);

            UserSession.findOne({ _id: _id }).exec( (err, usr ) => {
                if(err) {
                    dbQueryParams = { live: true };
                }

                if(usr) {
                    dbQueryParams =  { owner: usr.userId };
                }

                return queryAds(dbQueryParams);
            });

        } catch (e) {
            // this means somebdy was trying to fuck up with cookie
            // by changing cookie value to not 24 hex chacaters, hence fuck off
    
            res.cookie('dollar', "0", { maxAge: 900000, httpOnly: true });
            res.status(200).json({
                loggedIn: false
            });
        }

    } else {
        dbQueryParams = { live: true };
        return queryAds(dbQueryParams);
    }

    function queryAds(params){
        Ad.find(params).sort({timestamp: -1}).exec( (err, ads) => {  
        
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
    }

});

module.exports = router;