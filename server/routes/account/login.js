const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();

router.post('/loginUser', function(req, res) {

    const { body } = req;
    const {
        username,
        password,
    } = body;

    if(!username) {
        return res.status(200).send('Error: User name can not be empty');
    }

    if(!password) {
        return res.status(200).send('Error: Password name can not be empty');
    }

    
    User.findOne({ username: username }).exec( (err, user) => {    
                
        if(err) {
            return res.status(500).send('Error: Server error');
        }

        if(!user) {
            return res.status(200).send('No user with this username');
        }

        if(!user.validatePassword(password)) {
            return res.status(200).send('Incorrect Password');
        }

        const userSession = new UserSession();

        userSession.userId = user._id;
        userSession.save((err, doc) =>  {
            console.log("Seesionerr ", err);
            if(err) {
                return res.status(500).send('Error: Server error');
            }
            return res.status(200).send({
                message:'Logged in',
                success: true,
                token: doc._id
            });
        });

    });
});

module.exports = router;