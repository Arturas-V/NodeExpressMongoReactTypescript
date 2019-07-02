
const Ad = require("../../../models/Ad");
const UserSession = require('../../../models/UserSession');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post('/post', function(req, res) {

    const sessionCookie = req.cookies["dollar"];
    const { body } = req;
    const {
        live,
        title,
        price,
        description
    } = body;

    // send response to not logged in user
    if(!sessionCookie || sessionCookie === "0") {
        return res.status(200).json({
            msg: "you are not permitted to do this action, please login",
            loggedIn: false
        });
    }

    const _id = mongoose.Types.ObjectId(sessionCookie);

    UserSession.findOne().and([{ _id: _id }, { isDeleted: false }]).exec( (err, session) => {  
        
        if(err) {
            return res.status(500).json({
                msg: 'Error: Server error, try again later',
                loggedIn: false
            });
        }

        if(!session) {
            return res.status(200).json({
                loggedIn: false
            });
        }

        if(session) {

            const newAd = new Ad();
        
            newAd.title = title;
            newAd.description = description;
            newAd.price = price;
            newAd.live = live;
            newAd.owner = session.userId;
            newAd.save((err, ad) => {
                if(err) {
                    return res.status(500).json({msg: 'Error: Server error, try again later'});
                }

                return res.status(200).json({
                    msg: 'Ad created successfully!',
                    adPosted: true,
                    body: ad
                });
            });

        }

    });

});

module.exports = router;