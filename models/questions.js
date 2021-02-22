const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questions = new Schema({
    title: String,
    alternatives: [{
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true,
            default: false,
        }
    }],
    questiontype:{
        type:String,
        required: true,
        default:'single',
        enum:['single', 'multi']
    }
});

questions.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('questions', questions)
