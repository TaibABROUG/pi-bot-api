const intentSchema = require("../models/Intent"); 
const agentSchema = require("../models/Agent"); 
const express = require("express");
const { check, validationResult } = require('express-validator');
module.exports.addAgent = (req , res, next)=> {

    console.log(req.body.id_user);
    const errors = validationResult(req);
    console.log("requet is" +req.body.name);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
    
            const agent = new agentSchema({name: req.body.name , id_user: req.body.id_user}) ; 
            agent.save().then((response) => {
                res.status(201).json({
                    message: "Agent successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
       
    };

};

module.exports.getAgents = (req, res) => {
    console.log('id user for getAgents' + req.params.id_user);
    agentSchema.find({id_user: req.params.id_user} , (error, response) => {
        if (error) {
            return next(error)
        } else {

            res.status(200).json(response)
        }
    })
};
module.exports.getAgent =(req, res) =>{
    agentSchema.findOne({_id: req.params.id_agent} , (error , response) => {
        if (error) {
            return next(error)
        } else {
            console.log(response);
            res.status(200).json(response)
        }
    })
}




module.exports.deleteAgent = (req ,res) => {
    agentSchema.deleteOne({_id : req.params.id_agent } , (error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: response
            })
        }

    })
};
