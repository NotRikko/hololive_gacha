const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    featured_unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
    },
    rate_up_units: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Unit',
        }
    ]
})

module.exports = mongoose.model('Banner', BannerSchema);