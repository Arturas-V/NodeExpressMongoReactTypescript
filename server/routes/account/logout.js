const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post('/logout', function(req, res) {

    const sessionCookie = req.cookies["dollar"];

    try {

        const _id = mongoose.Types.ObjectId(sessionCookie);

        UserSession.updateOne({ _id: _id}, { 
            isDeleted: true
        }, (err, session) => {  

            if(err) {
                return res.status(500).send('Error: Server error');
            }

            if(!session) {
                return res.status(200).send('Already logged out long time ago');
            }

            if(session) {
                res.cookie("dollar", "0", { maxAge: 900000, httpOnly: true }); 
                return res.status(200).json({
                    msg: 'Logged out',
                    loggedOut: true
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