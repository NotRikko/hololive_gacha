const Banner = require('../models/Banner');
const Unit = require('../models/Unit');
const asyncHandler = require('express-async-handler');

exports.banner_list = asyncHandler(async (req, res, next) => {
    const allBanners = await Banner.find({})
    .populate('featured_unit', 'rate_up_units')
    .exec();

    if(!allBanners) {
        res.status(404).json('No banners')
    }

    res.status(200).json(allBanners)
})