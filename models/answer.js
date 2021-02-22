const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answer = new Schema({
        question: {
            type: mongoose.Schema.Types.ObjectId, ref: 'question', required:true
        },
        answer:{type:[String], required:true}
    }
);

answer.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('answer', answer)
