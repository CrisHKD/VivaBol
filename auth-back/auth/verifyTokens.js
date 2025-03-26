const jwt = require('jsonwebtoken');

function verifyAccessToken(token){
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token){
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

function verifyEmailVerification(token){
    return jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
}

module.exports = {verifyAccessToken, verifyRefreshToken, verifyEmailVerification};