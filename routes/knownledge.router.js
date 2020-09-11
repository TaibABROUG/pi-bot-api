
const multer= require('multer') ; 
const fs = require('fs-extra');
const express = require('express');
const router = express.Router() ;
const authorize = require ('../middlewares/auth') ; 
///addtomongodb the file info
const knownledgectrl = require('../controllers/knownledge.controller') ; 
router.post("/addtomongodb", knownledgectrl.addtomongo);

let storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        let path = './uploads/';
        fs.mkdirsSync(path);
      callback(null, path);
    },
     filename: function (req, file, callback) {
     callback(null, file.fieldname + '-' + Date.now());
     }
  });
  let upload = multer({ storage : storage});

router.post('/upload', upload.single('FQAfile') ,(req , res , next) => {

  console.log(req.param.id) ;
    const file = req.file; 
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
//     console.log('work upload') ; 
//     try {
//     res.send(req.file);
//   }catch(err) {
//     res.send(400);
//   }
}) ;

module.exports = router;
 //    body : id_user , id_agent , path .
