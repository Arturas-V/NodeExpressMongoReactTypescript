const User = require('../../models/User');
const express = require("express");
const router = express.Router();

router.post('/registerUser', function(req, res) {

    const { body } = req;
    const {
        username,
        password,
        email
    } = body;

    if(!username) {
        return res.status(200).send('Error: User name can not be empty');
    }

    if(!email) {
        return res.status(200).send('Error: Email can not be empty');
    }

    if(!password) {
        return res.status(200).send('Error: Password name can not be empty');
    }

    
    User.findOne().or([{ email: email }, { username: username }]).exec( (err, prevUser) => {        
        
        if(err) {
            return res.status(500).send('Error: Server error');
        } else if (prevUser) {
            if(prevUser.username === username) {
                return res.status(200).send('Error: User with this username exist');
            } 
            if (prevUser.email === email) {
                return res.status(200).send('Error: User with this email exist');
            }
        }
        const newUser = new User();
        
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.email = email;
        newUser.save((err, user) => {
            if(err) {
                return res.status(500).send('Error: Server error');
            }
            return res.status(200).send('Registered');
        });

    });

});

module.exports = router;