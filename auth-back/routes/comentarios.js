// routes/comentarios.js
const express = require('express');
const router = express.Router();
const { models } = require('../models/init-models'); // Ajusta el path a donde tengas tus modelos
const comentarios_eventos = models.comentarios_eventos;
const usuarios = models.usuarios; // Asegúrate de que este modelo esté definido en init-models.js
const { Sequelize } = require('sequelize');

router.post('/', async (req, res) => {
  try {
    const { evento_id, usuario_id, contenido } = req.body;

    // Validaciones mínimas
    if (!evento_id || !usuario_id || !contenido) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Insertar el comentario
    const nuevoComentario = await comentarios_eventos.create({
      evento_id,
      usuario_id,
      contenido,
      fecha_comentario: Sequelize.literal('CURRENT_TIMESTAMP'),
      visible: true
    });

    res.status(201).json({ mensaje: 'Comentario agregado exitosamente', comentario: nuevoComentario });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/obtener', async (req, res) => {
    try {
      const { evento_id } = req.query;
  
      if (!evento_id) {
        return res.status(400).json({ error: 'Se requiere evento_id' });
      }
      
      const comentarios = await comentarios_eventos.findAll({
        where: {
          evento_id,
          visible: true // solo comentarios visibles
        },
        include: [
            {
              model: usuarios,
              as: 'usuario',
              attributes: ['nombres', 'apellidos', 'foto_perfil']
            }
          ],
        order: [['fecha_comentario', 'DESC']] // Más reciente primero
      });
  
      res.status(200).json({ total: comentarios.length, comentarios });
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

module.exports = router;