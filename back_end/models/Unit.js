const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rarity: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Unit', UnitSchema);