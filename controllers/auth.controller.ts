import { validationResult } from "express-validator";
const bcrypt = require("bcrypt");
const userSchema = require("../models/User");

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
    }
}