const db = require('../lib/db');

const VerifyAcount = {
    createVerifyToken: async (userId, token, callback) => {
        const expirationTime = 60 * 60 * 1000; 
        const fechaExpiracion = new Date(Date.now() + expirationTime);
        
        const sql = 'INSERT INTO verificacion_cuentas (usuario_id, token, fecha_expiracion) VALUES (?,?,?)';
        db.query(sql,[userId, token,fechaExpiracion],callback) ;
    },

    deleteVerifyToken: (token, callback) => {
        const sql = 'DELETE FROM verificacion_cuentas WHERE token = ?';
        db.query(sql, [token], callback);
    },

    findVerifyToken: (token) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM verificacion_cuentas WHERE token = ?';
            
            db.query(sql, [token], (error, results) => {
                if (error) {
                    console.error("Error en la consulta:", error);
                    return reject(error); // Rechaza la promesa con el error
                }

                if (!results || results.length === 0) {
                    console.log("No se encontró el token");
                    return resolve(null); // Si no hay resultados, retorna null
                }
                resolve(results[0]); // Devuelve la primera sesión encontrada
            });
        });
    },
    deleteVerifyToken: (token) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM verificacion_cuentas WHERE token = ?';
            
            db.query(sql, [token], (error, result) => {
                if (error) {
                    console.error("Error al eliminar token de verificacion:", error);
                    return reject(error);
                }

                if (result.affectedRows === 0) {
                    console.log("No se encontró token de verificacion.");
                    return resolve(false);
                }

                console.log("Token eliminado correctamente.");
                resolve(true);
            });
        });
    }
}

module.exports = VerifyAcount;