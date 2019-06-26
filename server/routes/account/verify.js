const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();

router.get('/verify', function(req, res) {

    const { query } = req;
    const { token } = query;
    
    UserSession.findOne().and([{ _id: token }, { isDeleted: false }]).exec( (err, session) => {  
                
        if(err) {
            return res.status(500).send('Error: Server error');
        }

        if(!session) {
            return res.status(200).send('Looks bad');
        }

        if(session) {
            return res.status(200).send('Looks good');
        }

    });
});

module.exports = router;