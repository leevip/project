var express = require('express');
const User = require('../models/User');
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');


//Creates a new user and saves the user in database. Then redirects to login
//Password is salted and hashed and then stored to database
router.post('/register',
body("username").isLength({min: 3, max: 20}).trim().escape(),
body("password").isLength({min: 8}),
(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    User.findOne({username: req.body.username}, (err, user) =>{
        if(err) throw err;
        if(user) {
            return res.json({message: "Username already taken!"});
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    User.create(
                        {
                            username: req.body.username,
                            password: hash
                        },
                        (err, ok) => {
                            if(err) throw err;
                            return res.redirect(307, "/users/login");
                        }
                    )
                })
            })
        }
    })
});

//Checks user information and returns data in cookie and a json message
router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) =>{
        if(err) throw err;
        if(!user) {
            return res.status(403).json({message: "User not found!"});
        } else {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const jwtPayload = {
                        id: user._id,
                        username: user.username
                    }
                    jwt.sign(
                        jwtPayload,
                        process.env.SECRET,
                        {
                            expiresIn: "7d"
                        },
                        (err, token) => {
                            console.log(err);
                            res.cookie('jwt', token, {sameSite: 'strict'});
                            res.json({cookie: 'token send to cookie'});
                        }
                    )
                } else {
                    res.json({success: false, message: "username or password incorrect"});
                }
            })
        }
    })
});

module.exports = router;
