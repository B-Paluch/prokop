const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const question = new Schema({
        question: String,
        alternatives: [{
            text: {
                type: String,
                required: true
                },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
                }
        }
        ]});

module.exports = mongoose.model('questions', question)
