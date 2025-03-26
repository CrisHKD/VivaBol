const router = require('express').Router();
const { generateEmailVerificationToken, getTokenData } = require('../auth/generateTokens');
const { jsonResponse } = require('../lib/jsonResponse');
const UserModel = require('../schema/user');
const {sendVerificationMail} = require('../lib/mailConfig');
const VerifyAcount = require('../schema/verifyAcount');
const { getUserInfo } = require('../lib/getUserInfo');


router.post('/', (req, res) => {
  const {name,lastName,email,birthDate,country,gender, password,} = req.body;


  //Verificar si todoslos datos gueron enviados
    if(!!!name || !!!password
      || !!!lastName || !!!email || !!!birthDate || !!!
      country || !!!gender
    ) {
      return res.status(400).json(jsonResponse(400,{
        error: "Fields are required"
      }));
    }
    
    //Crear el usuario
    const fechaFormateada = new Date(birthDate).toISOString().split("T")[0]; 
    
    
    try {

      // Verifica si exixte el usuario
      UserModel.isEmailExist(email, (err, isExist) => {
        if (err) {
          return res.status(500).json({ error: 'Error al verificar email', details: err });
        }
        if (isExist) {
          res.status(400).json(jsonResponse(400,{
            error: "El email ya está registrado"
          }));
          return res.status(400).json({ error: 'El email ya está registrado' });
        }
        
        // Agregar usuarioa la Base de datos
        UserModel.createUser(name,lastName,email,fechaFormateada,country,gender,password,(err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error al registrar usuario', details: err });
          }
          
          const token = generateEmailVerificationToken({name,lastName,email});
          

          sendVerificationMail(email, token);

          UserModel.getUserByEmail(email, (err, user) => {
              if (err) {return res.status(500).json({ error: 'Error al verificar email', details: err });}
              if (!user) return res.status(400).json(jsonResponse(400,{error: "Correo no valido"}));

              const userData = getUserInfo(user);
              VerifyAcount.createVerifyToken(userData.id,token);  
              res.status(201).json({ message: 'Usuario registrado correctamente'});
            }
          );
        }
      );
      });
    } catch (error) {
      res.status(400).json(jsonResponse(400,{
        error: "Error al crear usuario"
      }));
    }
    
    
    /*res.status(200).json(jsonResponse(200, {
      message: "User created"
    }));*/
    //res.send('signout');
});

module.exports = router;