// models/Entitie.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
function EntitieContent(desc) {this.desc= desc}

let entitieSchema = new Schema({
    id_agent: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'

    },
    name: {
        type: String,
     //   unique: true

    },
   value: [{ name:String ,
           synonymes:String ,
             }]
},
   {
    collection: 'entities'
})
// module.exports.getAllLists = (callback) => {
// 	Agent.find(callback);
// }
entitieSchema.plugin(uniqueValidator, { message: 'Agent already in use.' });
module.exports = mongoose.model('Entitie', entitieSchema)