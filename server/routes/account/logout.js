const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();

router.get('/logout', function(req, res) {

    const { query } = req;
    const { token } = query;

    UserSession.findOne().and([{ _id: token }, { isDeleted: false }]).exec( (err, session) => {

        if(err) {
            return res.status(500).send('Error: Server error');
        }

        if(!session) {
            return res.status(200).send('You were never logged in, wtf??');
        }

        if(session) {
            UserSession.update({ _id: token}, { 
                isDeleted: true
            }, (err, session) => {  
                        
                if(err) {
                    return res.status(500).send('Error: Server error');
                }
        
                if(!session) {
                    return res.status(200).send('Already logged out long time ago');
                }
        
                if(session) {
                    return res.status(200).send('Logged out');
                }
        
            });
        }

    });

});

module.exports = router;