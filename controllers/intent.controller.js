const intentSchema = require("../models/Intent"); 
//const agentSchema = require("../models/Agent"); 
const express = require("express");
const fastcsv = require('fast-csv');

const { check, validationResult } = require('express-validator');
const fs = require('fs');
const csv = require('@fast-csv/parse');
module.exports.addIntent=(req, res,next ) => {
    let d = [] ;
  fs.createReadStream('out.csv')
    .pipe(csv.parse())
    .on('error', error => console.error(error))
    .on('data', row => {console.log(`ROW=${row}`);
 d.push(row) ;
console.log(d) ;  })
    .on('end', rowCount => {console.log(`Parsed ${rowCount} rows`);
    console.log(d) ;
    d.push(['dgdfg','gfdgd','dfdfg','dfs']) ; 
    const ws = fs.createWriteStream("out.csv");
    fastcsv
      .write(d, { headers: false})
      .pipe(ws);})
 
    console.log(req.body.id_agent);
    const errors = validationResult(req);
    console.log("requet is" +req.body.name);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
    
            const intent = new intentSchema(
                {
                name: req.body.name , 
                id_agent: req.body.id_agent,
                 content: req.body.content}
                 ) ; 
            intent.save().then((response) => {
                res.status(201).json({
                    message: "Intent successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });

       
    };
  



};

module.exports.getIntents = (req, res) => {
    intentSchema.find({id_agent: req.params.id_agent} , (error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
};
module.exports.updateIntent = (req, res, next) => {
    console.log('test update content') ; 
    for (var i  in req.body.content  ) {
        console.log(i.desc);
    } 
    intentSchema.findByIdAndUpdate(req.params.id_intent, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('intent successfully updated!')
        }
    })
};

module.exports.deleteIntent = (req ,res) => {
    intentSchema.deleteOne({_id : req.params.id_intent } , (error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: response
            })
        }

    })
};
module.exports.getIntent = (req, res) =>{
    intentSchema.findOne({_id: req.params.id_intent} , (error , response) =>{
        if(error) {
            return next(error) ; 
        } else {
            console.log(response);
            res.status(200).json(response);
        }
    })
};




