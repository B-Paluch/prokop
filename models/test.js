const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const test = new Schema({
    name:{
            type: String,
            required: true
        },
    questions : [
        {type: mongoose.Schema.Types.ObjectId,ref:'question'}
    ]
    },{timestamps:true}

);

const testAttempt = new Schema({
        Test:{
            type: mongoose.Schema.Types.ObjectId,ref:'question',
            required: true
        },
        User : [
            {type: mongoose.Schema.Types.ObjectId,ref:'question'}
        ]
    },{timestamps:true}

);

module.exports = mongoose.model('test', test)