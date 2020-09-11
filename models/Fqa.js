// models/Intent.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let fqaSchema = new Schema({
    id_user :{type : String},
    id_agent: {
        type : String ,
       // unique: true
    },
    path: {
        type: String,
     //   unique: true

    },
 
},

   {
    collection: 'fqas'
})
// module.exports.getAllLists = (callback) => {
// 	Agent.find(callback);
// }
//fqaSchema.plugin(uniqueValidator, { message: 'name used before.' });
module.exports = mongoose.model('Fqa', fqaSchema)