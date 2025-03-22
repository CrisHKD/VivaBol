const {getTokenFromHeader} = require('../auth/getTokenFronHeader');
const Sesion = require('../schema/sesion');
const { jsonResponse } = require('../lib/jsonResponse');

const router = require('express').Router();

router.delete('/', async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);

        if(refreshToken){
            await Sesion.eliminarSesion(refreshToken); // eliminar token
            res.status(200).json(jsonResponse(200, {message: "Token deleted"}));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(jsonResponse(500, {error: "Server error"}));    
    }
});

module.exports = router;