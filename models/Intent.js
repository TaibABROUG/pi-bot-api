// models/Intent.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
function IntentContent(desc) {this.desc= desc}

let intentSchema = new Schema({
    id_agent: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'

    },
    name: {
        type: String,
     //   unique: true

    },
   content: [{ desc:String 
             }]
},
   {
    collection: 'intents'
})
// module.exports.getAllLists = (callback) => {
// 	Agent.find(callback);
// }
intentSchema.plugin(uniqueValidator, { message: 'Agent already in use.' });
module.exports = mongoose.model('Intent', intentSchema)