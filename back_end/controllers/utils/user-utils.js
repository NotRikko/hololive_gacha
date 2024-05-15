const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function generateAccessToken(user) {
    return jwt.sign({ id: user }, accessTokenSecret , { expiresIn: '1d'})
}


module.exports = {
    generateAccessToken,
    refreshTokenSecret
};