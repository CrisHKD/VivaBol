const { generateAccessToken, generateRefreshToken } = require('../auth/generateTokens');
const db = require('../lib/db');
const bycript = require('bcrypt');
const Sesion = require('../schema/sesion');
const {getUserInfo} = require('../lib/getUserInfo');

const UserModel = {
    createUser: async (name,lastName,email,birthDate,country,gender, password, callback) => {

        //Agregar usuario a la base de datos
        const hash = await bycript.hash(password, 10);
        const sql = 'INSERT INTO usuarios (nombres, apellidos, email, fecha_nac, pais, genero,password) VALUES (?,?,?,?,?,?,?)'
        db.query(sql,[name, lastName, email, birthDate, country, gender,hash],callback) ;

        //Agregarle el rol por default de usuario
        /*this.getUserByEmail(email, (err, user) => {
              const id_user = user.id;
              const id_rol = 7;
              const sql2 = 'INSERT INTO usuario_roles (id_user, id_rol) VALUES (?,?)'
              db.query(sql,[id_user,id_rol],callback) ;
          });*/

        
    },

    comparePassword: async (password, hash, callback) => {
        try {
            const match = await bycript.compare(password, hash);
            console.log("Resultado de bcrypt.compare:", match);
            
            return callback(null, match); // 🔹 Usamos `return` para evitar múltiples ejecuciones
        } catch (error) {
            console.error("Error en bcrypt.compare:", error);
            return callback(error, null);
        }
    },

    isEmailExist: async (email, callback) => {
        const sql = "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?";
        db.query(sql, [email], (error, results) => {
            if (error) return callback(error, null);
            const isRegistered = results[0].count > 0;
            callback(null, isRegistered);
        });
    },

    setVerify: (email, callback) => {
        const sql = 'UPDATE usuarios SET verificado = true WHERE email = ?';
        db.query(sql, [email], callback);
    },

    getUserByEmail: (email, callback) => {
        const sql = "SELECT id, nombres, apellidos, email, password FROM usuarios WHERE email = ?";
        db.query(sql, [email], (error, results) => {
            if (error) return callback(error, null);
            if (results.length === 0) return callback(null, null); // No encontró usuario
            callback(null, results[0]); // Devuelve el usuario
        });
    },

    createAccessToken: function(user){
        return generateAccessToken(getUserInfo(user));
    },
    createRefreshToken: function(user){
        const refreshToken = generateRefreshToken(getUserInfo(user));
        try {
            Sesion.crearSesion(user.id, refreshToken, (error, result) => {
                if (error) throw error;
                console.log("Sesión creada correctamente");
            });
            return refreshToken;
        } catch (error) {
            console.log("Error al crear la sesión:", error);
        }
    }
};

module.exports = UserModel;