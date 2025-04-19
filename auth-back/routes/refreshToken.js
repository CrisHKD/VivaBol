const {getTokenFromHeader} = require('../auth/getTokenFronHeader');
const Sesion = require('../schema/sesion');
const { jsonResponse } = require('../lib/jsonResponse');
const { verifyRefreshToken } = require('../auth/verifyTokens');
const { generateAccessToken } = require('../auth/generateTokens');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const refreshToken = getTokenFromHeader(req.headers);
  

  if (refreshToken) {
    try {
      const found = await Sesion.buscarSesion(refreshToken);
      if(!found) return res.status(401).send(jsonResponse(401, {error: 'Unauthorized1'}));

      const payload = verifyRefreshToken(found.token);
      
      if(payload){
        const accessToken = generateAccessToken(payload.user);

        return res.status(200).json(jsonResponse(200, {accessToken}));
      }else{
        return res.status(401).send(jsonResponse(401, {error: 'Unauthorized2'}));
      }

    } catch (error) {
      return res.status(401).send(jsonResponse(401, {error: 'Unauthorized3'}));
    }
  }else{
    res.status(401).send(jsonResponse(401, {error: 'Unauthorized4'}));
  }

  res.send('refresh token');
});

module.exports = router;