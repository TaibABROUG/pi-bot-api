// routes/intent.routes.js
//localhost/api/:id/intents/:id_intent/intents/addintent
//localhost/api/:id/intents/:id_intent/intents/getallintents
//localhost/api/:id/intents/:id_intent/intents/getintent/intents/:id_intent
//localhost/api/:id/intents/:id_intent/intents/deleteintent/:id_intent
//localhost/api/:id/intents/:id_intent/intents/updateintent/:id_intent

const express = require('express'); 
const intent = require ("../models/Intent")

const router = express.Router();
//const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
//const { check, validationResult } = require('express-validator');
const intentctrl= require('../controllers/intent.controller');




//add Intent
router.post('/addintent' , intentctrl.addIntent);
//get all intents
router.route('/getallintents/:id_user/:id_agent').get(intentctrl.getIntents) ; 
//get one intent
router.route('/getintent/:id_user/:id_agent/:id_intent').get(intentctrl.getIntent) ; 
//delete intent
router.route('/deleteintent/:id_user/:id_agent/:id_intent').delete(intentctrl.deleteIntent);
//update intent
router.route('/updateintent/:id_user/:id_agent/:id_intent').put(intentctrl.updateIntent);


module.exports = router;
