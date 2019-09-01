
const Ad = require("../../../models/Ad");
const UserSession = require('../../../models/UserSession');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post('/delete', function(req, res) {

    const sessionCookie = req.cookies["dollar"];

    // send response to not logged in user
    if(!sessionCookie || sessionCookie === "0") {
        return res.status(200).json({
            msg: "you are not permitted to do this action",
            loggedIn: false
        });
    }

    try {

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
                    loggedIn: false,
                    msg: "you are not permitted to do this action"
                });
            }

            if(session) {

                const iD = mongoose.Types.ObjectId(req.query.id);
                
                Ad.deleteOne({_id: iD, owner: session.userId})
                .then()
                .then(args => {

                    if(args.deletedCount > 0) {
                        return res.status(200).json({
                            msg: "Ad deleted successfully",
                            adDeleted: true
                        });
                    } else {
                        return res.status(200).json({
                            msg: "Something went wrong, try again later",
                            adDeleted: false
                        });
                    }
                    
                })
                .catch(error => console.error(error));

            }

        });

    } catch (e) {
        // this means somebdy was trying to fuck up with cookie
        // by changing cookie value to not 24 hex chacaters, hence fuck off

        res.cookie('dollar', "0", { maxAge: 900000, httpOnly: true });
        res.status(200).json({
            loggedIn: false,
            msg: "don't play with me :))"
        });
    }

});

module.exports = router;