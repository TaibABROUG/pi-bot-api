// routes/entitie.routes.js
//localhost/api/:id/entities/:id_entitie/entities/addentitie
//localhost/api/:id/entities/:id_entitie/entities/getallentities
//localhost/api/:id/entities/:id_entitie/entities/getentitie/entities/:id_entitie
//localhost/api/:id/entities/:id_entitie/entities/deleteentitie/:id_entitie
//localhost/api/:id/entities/:id_entitie/entities/updateentitie/:id_entitie

const express = require('express'); 
const entitie = require ("../models/Entitie")

const router = express.Router();
//const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
//const { check, validationResult } = require('express-validator');
const entitiectrl= require('../controllers/entitie.controller');




//add entitie
router.post('/addentitie' , entitiectrl.addEntitie);
//get all entities
router.route('/getallentities/:id_user/:id_agent').get(entitiectrl.getEntities) ; 
//get one entitie
router.route('/getentitie/:id_user/:id_agent/:id_entitie').get(entitiectrl.getEntitie) ; 
//delete entitie
router.route('/deleteentitie/:id_user/:id_agent/:id_entitie').delete(entitiectrl.deleteEntitie);
//update entitie
router.route('/updateentitie/:id_user/:id_agent/:id_entitie').put(entitiectrl.updateEntitie);


module.exports = router;
