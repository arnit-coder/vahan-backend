const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }
});

const entitySchema = new Schema({
    name: { type: String, required: true },
    schema: [attributeSchema]
});

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;
