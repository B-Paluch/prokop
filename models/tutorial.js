const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tutorial = new Schema(
    {
        title: String,
        description: String,
        published: Boolean
    },
    { timestamps: true }
);
tutorial.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('tutorial', tutorial)
