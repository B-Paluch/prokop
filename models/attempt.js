const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attempt = new Schema({
        test: {
            type: mongoose.Schema.Types.ObjectId, ref: 'test'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user'
        },
        answers: [answer]}
    , {timestamps: true}

);

Attempt.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});