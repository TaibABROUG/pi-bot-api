const fqaSchema = require("../models/Fqa");
const agentSchema = require('../models/Agent');
const express = require("express");


const { response } = require("express");

 

module.exports.addtomongo  = (req , res , next) => {
    console.log(" d5al lel addtomongodb"+req.body.path);
    const fqa = new fqaSchema ({
        id_user :  req.body.id_user ,
        id_agent :  req.body.id_agent ,
        path : req.body.path});
//    let agent=  agentSchema.findById(req.body.id_agent, function (err , doc) {
//          doc.fqas.push({path: req.body.path}) ; 
    
//      });



  
     fqa.save().then((response) => {
        console.log("file info ceated")
        res.status(201).json({
            message: "file info successfully created in mongodb",
            result: response
        });
    }).catch(error => { 
        console.log("erreur bro");
        res.status(500).json({
            error: error
        });

})
};
