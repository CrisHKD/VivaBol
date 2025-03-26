const {getTokenFromHeader} = require('../auth/getTokenFronHeader');
const Sesion = require('../schema/sesion');
const { jsonResponse } = require('../lib/jsonResponse');
const { getTokenData } = require('../auth/generateTokens');
const UserModel = require('../schema/user');
const VerifyAcount = require('../schema/verifyAcount');
const { getUserInfo } = require('../lib/getUserInfo');

const router = require('express').Router();

router.get('/confirm/:token', (req, res) => {
    try {
       // Obtener el token
       
       const { token } = req.params;
       
       // Verificar la data
       const data = getTokenData(token)
            .then((decodedData) => {
                console.log('Datos decodificados:', decodedData); 

                const email = decodedData.email;
                console.log("EMAIL:", email);

                try {
                    console.log(email);
                    UserModel.getUserByEmail(email, (err, user) => {
                        if (err) {return res.status(500).json({ error: 'Error al verificar email', details: err });}
                        if (!user) return res.status(400).json(jsonResponse(400,{error: "Correo no valido"}));

                        const userData = getUserInfo(user);
                        if(userData.email === email){
                            UserModel.setVerify(email);
                            VerifyAcount.deleteVerifyToken(token);
                        }
                    }
                    );                  
                    res.status(201).json({ message: 'Usuario verificado'});
                } catch (error) {
                    res.status(400).json(jsonResponse(400,{
                        error: "Usuario no encontrado"
                      }));
                }
            })
            .catch((err) => {
                return res.status(500).json({ error: 'Error al registrar usuario', details: err });
            });
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
});

module.exports = router;