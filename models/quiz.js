const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questions = require('../models/questions').schema;

const quiz = new Schema({
        name:{
            type: String,
            required: true
        },
        questions:[questions]
    },{timestamps:true}

);

quiz.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('quiz', quiz)
