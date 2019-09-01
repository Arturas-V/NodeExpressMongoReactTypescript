
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

    try {

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
                    loggedIn: false,
                    msg: "you are not permitted to do this action, please login"
                });
            }

            if(session) {

                const newAd = new Ad();

                const slug = title.replace(/[^a-zA-Z ]/g, "");
                const uri = slug.replace(/ /g, "-").toLowerCase();
            
                newAd.title = title;
                newAd.uri = uri;
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

    } catch (e) {
        // this means somebdy was trying to fuck up with cookie
        // by changing cookie value to not 24 hex chacaters, hence fuck off

        res.cookie('dollar', "0", { maxAge: 900000, httpOnly: true });
        res.status(200).json({
            loggedIn: false,
            msg: "don't play with me :))"
        });
    }
    
});

module.exports = router;