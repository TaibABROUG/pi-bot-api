// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userGmailSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    id: {
        type: String
    } ,
    provider:  {
        type: String
    }  ,
 

    image: {
        type: String
    }   ,
    token:  {
        type: String
    }  ,
    idToken :{
        type: String
    }  
}, {
    collection: 'usersGmail'
})

userGmailSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('UserGmail', userGmailSchema)