const User = require('../models/User');
const Unit = require('../models/Unit');
const asyncHandler = require('express-async-handler');

exports.user = asyncHandler(async (req, res, next) => {
    const testUser = await User.findOne()
    .populate('owned_units.unit')  
    .exec()

    if(!testUser) {
        res.status(404).json('No test user')
    }

    res.status(200).json(testUser);
});

exports.add_user_units_post = asyncHandler(async (req, res, next) => {
    const newUnits = req.body.gachaPulls;

    if (!newUnits) {
        return res.status(404).json('No new units');
    }

    try {
        const user = await User.findOne({ username: 'Rikko' });

        if (!user) {
            return res.status(404).json('User not found');
        }

        const unitsToAdd = [];
        const uniqueUnitIds = new Set();

        for (const unit of newUnits) {
            const isUnitOwned = user.owned_units.some(playerUnit => playerUnit.unit.equals(unit._id));
            if (!isUnitOwned && !uniqueUnitIds.has(unit._id)) {
                uniqueUnitIds.add(unit._id);
                unitsToAdd.push({ unit: unit._id });
            }
        }

        if (unitsToAdd.length > 0) {
            await User.findOneAndUpdate(
                { username: 'Rikko' },
                { $push: { owned_units: { $each: unitsToAdd } } }
            );
        }

        const updatedUser = await User.findOne({ username: 'Rikko' }).populate('owned_units.unit');
        res.status(200).json({ message: 'Units added successfully', user: updatedUser });

    } catch (error) {
        console.error('Error adding units:', error);
        res.status(500).json({ error: 'Failed to add units' });
    }
});