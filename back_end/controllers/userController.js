const User = require('../models/User');
const Unit = require('../models/Unit');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { generateAccessToken, refreshTokenSecret } = require('./utils/user-utils');
const RefreshToken = require('../models/RefreshToken');

exports.user = asyncHandler(async (req, res, next) => {
    const testUser = await User.findOne()
    .populate('owned_units.unit')  
    .exec()

    if(!testUser) {
        res.status(404).json('No test user')
    };

    res.status(200).json(testUser);
});

exports.user_login = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ authenticated: false, message: info.message });
            }
            
            const accessToken = generateAccessToken(user._id);
            const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret);
            
            const newRefreshToken = new RefreshToken({
                token: refreshToken,
                userId: user._id
            });
            await newRefreshToken.save();

            return res.json({ authenticated: true, user, accessToken, refreshToken });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

exports.user_signup = [
    body('user_name', 'Name must be longer than 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom(async value => {
        const user = await User.findOne({ username: value });
        if(user) {
            throw new Error('Username already in use!');
        }
    }),

    body('password')
    .trim()
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long!')
    .custom(value => {
        if (!/\d/.test(value)) {
            throw new Error('Password must contain at least one number!');
        }
        return true;
    })
    .custom(value => {
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          throw new Error('Password must contain at least one special character!');
        }
        return true;
    })
    .escape(),

    body('email')
    .trim()
    .isEmail()
    .custom(async value => {
        const existingEmail = await User.findOne({ email: value });
        if(existingEmail) {
            throw new Error('This email is already taken!');
        }
    }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        const hashedPassword =  await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            img: 'https://cdn.donmai.us/original/17/71/177179702fa643f0ba8d8c401f5f2a48.jpg',
            level: 1,
            owned_units: [],
        });
        if(!errors.isEmpty()) {
            console.log(errors.array());
            res.json({ errors: errors.array(), created: false})
        } else {
            await user.save();
            res.json({ created: true })
        }
    })

];

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
                { username: req.body.username },
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