const db = require('../lib/db');

const Sesiones = {
    crearSesion: async (userId, token, callback) => {
        const expirationTime = 7 * 24 * 60 * 60;
        const fechaExpiracion = new Date(Date.now() + expirationTime);
        
        const sql = 'INSERT INTO sesiones (usuario_id, token, fecha_expiracion) VALUES (?,?,?)';
        db.query(sql,[userId, token,fechaExpiracion],callback) ;
    },

    buscarSesion: (token) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM sesiones WHERE token = ?';
            
            db.query(sql, [token], (error, results) => {
                if (error) {
                    console.error("Error en la consulta:", error);
                    return reject(error); // Rechaza la promesa con el error
                }

                if (!results || results.length === 0) {
                    console.log("No se encontró ninguna sesión.");
                    return resolve(null); // Si no hay resultados, retorna null
                }
                resolve(results[0]); // Devuelve la primera sesión encontrada
            });
        });
    },
    eliminarSesion: (token) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM sesiones WHERE token = ?';
            
            db.query(sql, [token], (error, result) => {
                if (error) {
                    console.error("Error al eliminar la sesión:", error);
                    return reject(error);
                }

                if (result.affectedRows === 0) {
                    console.log("No se encontró ninguna sesión para eliminar.");
                    return resolve(false);
                }

                console.log("Sesión eliminada correctamente.");
                resolve(true);
            });
        });
    }
}

module.exports = Sesiones;