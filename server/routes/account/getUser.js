const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/getUser', function(req, res) {

    const sessionCookie = req.cookies["dollar"];

    // send response of not logged in user
    if(!sessionCookie || sessionCookie === "0") {
        return res.status(200).json({
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
            const _id = mongoose.Types.ObjectId(session.userId);
            User.findOne({ _id: _id }).exec( (err, user) => {

                if(err) {
                    return res.status(500).json({
                        msg: 'Error: Server error, try again later',
                        loggedIn: false
                    });
                }

                if(user) {
                    return res.status(200).json({
                        loggedIn: true,
                        id: user._id,
                        username: user.username,
                        email: user.email
                    });
                } else {
                    return res.status(404).json({
                        msg: "you not on system jesus crist"
                    });
                }

            });
        }

    });

});

module.exports = router;