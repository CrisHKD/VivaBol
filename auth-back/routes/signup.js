const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const UserModel = require('../schema/user');

router.post('/', (req, res) => {
  const {name,lastName,email,birthDate,country,gender, password,} = req.body;
  
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
        
        UserModel.createUser(name,lastName,email,fechaFormateada,country,gender,password,(err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error al registrar usuario', details: err });
          }
          res.status(201).json({ message: 'Usuario registrado correctamente' })});
      });
    } catch (error) {
      res.status(400).json(jsonResponse(400,{
        error: "Fields are required"
      }));
    }
    
    
    /*res.status(200).json(jsonResponse(200, {
      message: "User created"
    }));*/
    //res.send('signout');
});

module.exports = router;