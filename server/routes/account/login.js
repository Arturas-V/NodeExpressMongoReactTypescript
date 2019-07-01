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
        return res.status(200).json({msg: 'Username can not be empty'});
    }

    if(!password) {
        return res.status(200).json({msg: 'Please enter password'});
    }

    
    User.findOne({ username: username }).exec( (err, user) => {    
                
        if(err) {
            return res.status(500).json({msg: 'Error: Server error, try again later'});
        }

        if(!user) {
            return res.status(200).json({msg: 'No user with this username'});
        }

        if(!user.validatePassword(password)) {
            return res.status(200).json({msg: 'Incorrect Password'});
        }

        const userSession = new UserSession();

        userSession.userId = user._id;
        userSession.save((err, doc) =>  {

            if(err) {
                return res.status(500).json({msg: 'Error: Server error, try again later'});
            }

            // user session cookie nam dollar just for fun :)
            res.cookie("dollar", doc._id + "", 9999);            

            return res.status(200).json({
                msg:'Logged in',
                logggedIn: true,
                token: doc._id
            });
        });

    });
});

module.exports = router;