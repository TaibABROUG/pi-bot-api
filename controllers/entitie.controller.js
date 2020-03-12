const entitieSchema = require("../models/Entitie"); 
//const agentSchema = require("../models/Agent"); 
const express = require("express");
const { check, validationResult } = require('express-validator');

module.exports.addEntitie=(req, res,next ) => {
    console.log(req.body.id_agent);
    const errors = validationResult(req);
    console.log("requet is" +req.body.name);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
    
            const entitie = new entitieSchema({name: req.body.name , id_agent: req.body.id_agent, value: req.body.value}) ; 
            entitie.save().then((response) => {
                res.status(201).json({
                    message: "entitie successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
       
    };
  



};

module.exports.getEntities = (req, res) => {
    entitieSchema.find({id_agent: req.params.id_agent} , (error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
};
module.exports.updateEntitie = (req, res, next) => {
    console.log('test update content') ; 
    for (var i  in req.body.value  ) {
        console.log(i.name);
    } 
    entitieSchema.findByIdAndUpdate(req.params.id_entitie, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('entitie successfully updated!')
        }
    })
};

module.exports.deleteEntitie = (req ,res) => {
    entitieSchema.deleteOne({_id : req.params.id_entitie } , (error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: response
            })
        }

    })
};
module.exports.getEntitie = (req, res) =>{
    entitieSchema.findOne({_id: req.params.id_entitie} , (error , response) =>{
        if(error) {
            return next(error) ; 
        } else {
            console.log(response);
            res.status(200).json(response);
        }
    })
};




