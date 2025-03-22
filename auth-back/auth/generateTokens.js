const jwt = require('jsonwebtoken');

function sign(payLoad, isAccessToken, time) {
  return jwt.sign(
    payLoad, 
    isAccessToken 
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET,
    {
        algorithm: 'HS256',     
        expiresIn: time, // 1 hora   
    }
);
}

function generateAccessToken(user) {
  return sign({ user }, true,3600);
}

function generateRefreshToken(user) {
    return sign({ user }, false, 7*24*60*60);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};