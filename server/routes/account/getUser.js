const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/getUser', function(req, res) {

    const sessionCookie = req.cookies["dollar"];
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
            return res.status(200).json({
                loggedIn: true
            });
        }

        // maybe we can have some weird scenario for not logged in call
        return res.status(200).json({
            loggedIn: false
        });

    });

});

module.exports = router;