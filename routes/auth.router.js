// routes/auth.routes.js
//localhost/api/auth/register-user
//localhost/api/auth/signin
//localhost/api/auth
//localhost/api/auth/user-profile/:id
//localhost/api/auth/delete-user/:id
//localhost/api/auth/update-user/:id



const express = require('express'); 
//const agent = require ("../models/Agent")

const router = express.Router();
//const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');
const authctrl = require('../controllers/auth.controller');
//const agentctrl= require('../controllers/agent.controller');
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
   router.post("/register-gmail-user", authctrl.registerGoogle);
   router.post("/signingmail", authctrl.signingmail);
   


// Sign-in
router.post("/signin",authctrl.signin);
// addAgent
//router.post("/addAgent" , agentctrl.addAgent)  ;
//add Intent
//router.post("/addIntent" , agentctrl.addIntent);
//get all intents
//router.route('/:id_user/:id_agent/getallintents').get(agentctrl.getIntents) ; 
//router.route('/getintent/:id_intent').get(agentctrl.getIntent) ; 
//delete intent
//router.route('/:id_user/:id_agent/deleteintent/:id_intent').delete(agentctrl.deleteIntent);
//update intent
//router.route('/:id_user/:id_agent/updateintent/:id_intent').put(agentctrl.updateIntent);

//get all agent
// router.get('/getallagent',(req,res) => {
// 	agent.getAllLists((err, lists)=> {
// 		if(err) {
// 			res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
// 		}
// 		else {
// 			res.write(JSON.stringify({success: true, lists:lists},null,2));
// 			res.end();	
			
// 	}	
// 	});
// });
//router.route('/:id/getallagent').get(agentctrl.getAgents) ; 
// Get Users
router.route('/').get(authctrl.getUsers);
//router.route('/deleteAgent/:id').delete(agentctrl.deleteAgent)  ;
//get agent
//router.route('/agent/:id').get(agentctrl.getAgent);
// Get Single User
router.route('/user-profile/:id').get(authctrl.getUser );

// Update User
router.route('/update-user/:id').put(authctrl.updateUser);


// Delete User
router.route('/delete-user/:id').delete(authctrl.deleteUser);

module.exports = router;
