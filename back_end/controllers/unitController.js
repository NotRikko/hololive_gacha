const Unit = require('../models/Unit');
const asyncHandler = require('express-async-handler');

exports.unit_list = asyncHandler(async (req, res, next) => {
    const allUnits = await Unit.find({});

    if(!allUnits) {
        res.status(404).json('No units')
    };

    res.status(200).json(allUnits);
});

exports.common_unit_list = asyncHandler(async (req, res, next) => {
    const commonUnits = await Unit.find({ rarity: 'Common' });

    if(!commonUnits) {
        res.status(404).json('No units')
    };

    res.status(200).json(commonUnits);
});

exports.epic_unit_list = asyncHandler(async (req, res, next) => {
    const epicUnits = await Unit.find({ rarity: 'Epic' });

    if(!epicUnits) {
        res.status(404).json('No units')
    };

    res.status(200).json(epicUnits);
});

exports.legendary_unit_list = asyncHandler(async (req, res, next) => {
    const legendaryUnits = await Unit.find({ rarity: 'Legendary' });

    if(!legendaryUnits) {
        res.status(404).json('No units')
    };

    res.status(200).json(legendaryUnits);
});