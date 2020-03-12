// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let agentSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        unique: true

    },},
   {
    collection: 'agents'
})
// module.exports.getAllLists = (callback) => {
// 	Agent.find(callback);
// }
agentSchema.plugin(uniqueValidator, { message: 'Agent already in use.' });
module.exports = mongoose.model('Agent', agentSchema)