const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const express = require("express");
const router = express.Router();

const nodemailer = require('nodemailer');

const emailObj = () => {
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "larytis@gmail.com", // generated ethereal user
                pass: "Pimpalas1=1" // generated ethereal password
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <larytis@gmail.com>', // sender address
            to: 'larytis@gmail.com, arturasv@mail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        });
    
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
    
};


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

            // emailObj(); 

            // user session cookie name dollar just for fun :)
            res.cookie("dollar", doc._id + "", { maxAge: 900000, httpOnly: true });            

            return res.status(200).json({
                loggedIn: true,
                id: user._id,
                username: user.username,
                email: user.email
            });
        });

    });

    

});

module.exports = router;