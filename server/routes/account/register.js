const User = require('../../models/User');
const express = require("express");
const router = express.Router();
// const Utils = require('../../models/Utils');

router.post('/registerUser', function(req, res) {

    const { body } = req;
    const {
        username,
        password,
        email
    } = body;

    if(!username) {
        return res.status(200).json({msg: 'Username can not be empty'});
    }

    if(!email) {
        return res.status(200).json({msg: 'Email address can not be empty'});
    } else if(email) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!email.match(mailformat)) {
            return res.status(200).json({msg: 'You have entered an invalid email address'});
        }
    }

    if(!password || password.length < 8) {
        return res.status(200).json({msg: 'Password must be at least 8 characters'});
    }
    
    User.findOne().or([{ email: email }, { username: username }]).exec( (err, prevUser) => {        
        
        if(err) {
            return res.status(500).json({msg: 'Error: Server error, try again later'});
        } else if (prevUser) {
            if(prevUser.username === username) {
                return res.status(200).json({msg: 'User with this username already exist'});
            } 
            if (prevUser.email === email) {
                return res.status(200).json({msg: 'User with this email already exist'});
            }
        }
        const newUser = new User();
        
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.email = email;
        newUser.save((err, user) => {
            if(err) {
                return res.status(500).json({msg: 'Error: Server error, try again later'});
            }

            return res.status(200).json({
                msg: 'Registered successfully!',
                registered: true
            });
        });

    });

});

module.exports = router;