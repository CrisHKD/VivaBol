const { getTokenFromHeader } = require('../auth/getTokenFronHeader');
const { jsonResponse } = require('../lib/jsonResponse');
const {models} = require('../models/init-models');
const Sesion = models.sesiones; 

const router = require('express').Router();

router.delete('/', async (req, res) => {
  try {
    const refreshToken = getTokenFromHeader(req.headers);

    if (refreshToken) {
      // Usamos Sequelize para eliminar la sesión correspondiente al refreshToken
      const deletedSession = await Sesion.destroy({
        where: { token: refreshToken }
      });
      console.log(deletedSession);

      if (deletedSession) {
        res.status(200).json(jsonResponse(200, { message: 'Token deleted' }));
      } else {
        // Si no se encuentra ninguna sesión para eliminar
        res.status(404).json(jsonResponse(404, { error: 'Token not found' }));
      }
    } else {
      res.status(400).json(jsonResponse(400, { error: 'No token provided' }));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(jsonResponse(500, { error: 'Server error' }));
  }
});

module.exports = router;