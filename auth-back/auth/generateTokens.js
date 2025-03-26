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

const generateEmailVerificationToken =(payload) => {
  return jwt.sign(
    payload,
    process.env.EMAIL_VERIFICATION_SECRET,
    {
      algorithm: 'HS256',     
      expiresIn: '24h', // 1 hora   
   }
  );
}

const getTokenData = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        console.log('Error al obtener data del token:', err.message);
        reject(null);  // Rechaza la promesa si el token es inválido o ha expirado
      } else {
        resolve(decoded);  // Resuelve la promesa con los datos decodificados
      }
    });
  });
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateEmailVerificationToken,
    getTokenData,
};