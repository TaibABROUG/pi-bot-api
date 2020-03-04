// routes/auth.routes.js

const express = require('express'); 


const router = express.Router();
//const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');
const authctrl = require('../controllers/auth.controller');
// Sign-up
router.post("/register-user",
    [
        check('name')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ],
   authctrl.register );


// Sign-in
router.post("/signin",authctrl.signin);

// Get Users
router.route('/').get(authctrl.getUsers);

// Get Single User
router.route('/user-profile/:id').get(authorize,authctrl.getUser );

// Update User
router.route('/update-user/:id').put(authctrl.updateUser);


// Delete User
router.route('/delete-user/:id').delete(authctrl.deleteUser);

module.exports = router;
