const databasectrl = require('../controllers/database.controller') ; 
const multer= require('multer') ; 
const fs = require('fs-extra');
const express = require('express');
const router = express.Router() ;
const authorize = require ('../middlewares/auth') ; 

router.route('/loading').get(databasectrl.loading) ; 
router.post("/update" , databasectrl.update);


module.exports = router;