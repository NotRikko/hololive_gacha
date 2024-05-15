const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerUnitSchema = new Schema({
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    owned_units: [PlayerUnitSchema]
})

module.exports = mongoose.model('User', UserSchema);