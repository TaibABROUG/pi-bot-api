

// routes/agent.routes.js
//localhost/api/:id/agents/addagent
//localhost/api/:id/agents/getallagent
//localhost/api/:id/agents/getagent/:id_agent
//localhost/api/:id/agents/deleteagent/:id_agent

const express = require('express'); 
const agent = require ("../models/Agent")
const router = express.Router();
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');
const agentctrl= require('../controllers/agent.controller');





// addAgent
router.post("/addAgent" , agentctrl.addAgent)  ;

//get all users
router.route('/getallagent/:id_user').get(agentctrl.getAgents) ; 
//delete agent
router.route('/deleteagent/:id_agent').delete(agentctrl.deleteAgent)  ;
//get agent
router.route('/getagent/:id_agent').get(agentctrl.getAgent);
// Get Single User


module.exports = router;
