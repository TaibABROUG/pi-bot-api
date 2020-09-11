const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const userSchema = require("../models/User");
const userGmailSchema = require("../models/UserGmail");
const authorize = require("../middlewares/auth");
const express = require("express");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new userSchema({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        });
    };
};
module.exports.registerGoogle = (req, res, next) => {
    
    console.log(req.body);

 
 
    
   
        bcrypt.hash(req.body.id, 10).then((hash) => {
            console.log("hash"); 

            const userGmail = new userGmailSchema({
                name: req.body.name,
                email: req.body.email,
                id : req.body.id , 
                token : req.body.token,
                idToken : req.body.idToken , 
                image: req.body.image,
                provider : req.body.provider
            });
            console.log( userGmail) ; 
            userGmail.save().then((response) => {
               console.log( "UserGmail successfully created!") ; 
                res.status(201).json({
                    message: "UserGmail successfully created!",
                    result: response
                });
            }).catch(error => { 
                console.log("erreur bro");
                res.status(500).json({
                    error: error
                });
            });
        });
   
};


module.exports.signin =  (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
};

module.exports.signingmail =  (req, res, next) => {
    let getUser;
    console.log("haw d5al ");
    userGmailSchema.findOne({
        email: req.body.email
    }).then(userGmail => {
        if (!userGmail) {console.log("mal9inachhi ");
            const userGmailNew = new userGmailSchema({
                name: req.body.name,
                email: req.body.email,
                id : req.body.id , 
                token : req.body.token,
                idToken : req.body.idToken , 
                image: req.body.image,
                provider : req.body.provider
            });
            console.log( userGmailNew) ; 
            userGmailNew.save().then((response) => {
               console.log( "UserGmailnew successfully created!") ; 
                res.status(201).json({
                    message: "UserGmailnew successfully created!",
                    result: response
                });
            }).catch(error => { 
                console.log("erreur bro");
                res.status(500).json({
                    error: error
                });
            });
        }
        getUser = userGmail;
        console.log("getUser elli 9ineh mawjoud",getUser);
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
  
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
};
module.exports.getUsers = (req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
};

module.exports.getUser = (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {  return next(error);
           


           
        } else {
            if (!data){
                console.log('recherche gmail ') ; 
                userGmailSchema.findById(req.params.id, (error, data2) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.status(200).json({
                            msg: data2
                        })
                    }
                })

            } else {
            console.log("malawaajech"
            )
            res.status(200).json({
                msg: data
            })}
        }
    })
}

module.exports.updateUser = (req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
};

module.exports.deleteUser = (req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
}