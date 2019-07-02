const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post('/logout', function(req, res) {

    const sessionCookie = req.cookies["dollar"];
    const _id = mongoose.Types.ObjectId(sessionCookie);

    UserSession.update({ _id: _id}, { 
        isDeleted: true
    }, (err, session) => {  

        if(err) {
            return res.status(500).send('Error: Server error');
        }

        if(!session) {
            return res.status(200).send('Already logged out long time ago');
        }

        if(session) {
            res.cookie("dollar", "0", 9999); 
            return res.status(200).json({
                msg: 'Logged out',
                loggedOut: true
            });
        }

    });

});

module.exports = router;