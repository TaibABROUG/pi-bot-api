
const express = require("express");
const multer= require('multer') ; 
const fs = require('fs-extra');

 
module.exports.loading = (req, res) =>{ console.log('will do the load on the server ') ;
fs.readFile('apis.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(data);
    console.log(data);
  });

   
    
}
module.exports.update= (req ,res) => {console.log(req)
  fs.outputFile('apis.txt' , req.body.text )  ; 

}