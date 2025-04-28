const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const UserModel = require('../schema/user');
const {getUserInfo} = require('../lib/getUserInfo');

router.post('/', (req, res) => {
  const {email, password} = req.body;
  
    if(!!!email || !!!password
    ) {
      return res.status(400).json(jsonResponse(400,{
        error: "Fields are required"
      }));
    }
    
    UserModel.getUserByEmail(email, (err, user) => {
      if (err) {return res.status(500).json({ error: 'Error al verificar email1', details: err });}
      if (!user) return res.status(400).json(jsonResponse(400,{error: "Correo no valido"}));

      // 2️⃣ Comparar contraseñas
      
      UserModel.comparePassword(password, user.password, (error, isMatch) => {
        if (error) return res.status(500).json({ error: 'Error al verificar email', details: error });
        if (!isMatch) return res.status(400).json(jsonResponse(400,{error: "Correo o contraseña incorrecta"}));

        //Autenticar usuario en la base de datos
        const accessToken = UserModel.createAccessToken(user);
        const refreshToken = UserModel.createRefreshToken(user);

        res.status(200).json(jsonResponse(200, {
          user:getUserInfo(user),
          accessToken,
          refreshToken
        }));
    });
  });
});

module.exports = router;