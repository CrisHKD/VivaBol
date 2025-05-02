const express = require('express');
const router = express.Router();
const { models } = require('../models/init-models');
const { where } = require('sequelize');
const patrocinadores = models.patrocinador; 
const eventos = models.eventos;
const patrocinador_evento = models.patrocinador_evento;

const multer = require('multer');
const cloudinary = require('../lib/cloudinary');

const upload = multer();

router.post('/subir', upload.single('logo'), async (req, res) => {
  const { file } = req;
  const { nombre } = req.body;

  if (!nombre || !file) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: nombre o archivo' });
  }

  try {
      // Verifica si el patrocinador ya existe
      const patrocinadorExiste = await patrocinadores.findOne({ where: { nombre } });
      if (patrocinadorExiste) {
          return res.status(409).json({ error: 'El patrocinador ya existe.' });
      }

      // Sube el archivo a Cloudinary
      cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          async (err, result) => {
              if (err) {
                  return res.status(500).json({ error: 'Error al subir la imagen', details: err });
              }

              // Crea el nuevo patrocinador en la base de datos
              const nuevoPatrocinador = await patrocinadores.create({
                  nombre,
                  logo_url: result.secure_url,
              });

              res.status(201).json({
                  mensaje: 'Patrocinador agregado exitosamente',
                  patrocinador: nuevoPatrocinador,
              });
          }
      ).end(file.buffer);

  } catch (error) {
      console.error('Error al agregar patrocinador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/', async (req, res) => {
    try {
      const lista = await patrocinadores.findAll();
      res.status(200).json(lista);
    } catch (error) {
      console.error('Error al obtener patrocinadores:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Borrar los registros en la tabla intermedia Patrocinador_Evento relacionados con este patrocinador
      await patrocinador_evento.destroy({
        where: {
          patrocinador_id: id
        }
      });
  
      // Ahora borrar el patrocinador
      const patrocinadorBorrado = await patrocinadores.destroy({
        where: {
          id
        }
      });
  
      if (patrocinadorBorrado) {
        res.status(200).json({ mensaje: 'Patrocinador y sus registros asociados eliminados exitosamente.' });
      } else {
        res.status(404).json({ error: 'Patrocinador no encontrado.' });
      }
  
    } catch (error) {
      console.error('Error al eliminar el patrocinador:', error);
      res.status(500).json({ error: 'Error al eliminar el patrocinador y sus registros.' });
    }
  });

  router.get('/eventos', async (req, res) => {
    try {
      // Lee `evento_id` desde req.query, ya que lo estás enviando en la URL como parámetro
      const { evento_id } = req.query;  // Usar req.query en lugar de req.body para parámetros de URL
      if (!evento_id) {
        return res.status(400).json({ error: 'Falta el parámetro evento_id' });
      }
  
      // Realizar la consulta con la relación entre patrocinador_evento y patrocinadores
      const evento = await eventos.findByPk(evento_id, {
        include: {
          model: patrocinadores,
          attributes: ['id','nombre', 'logo_url'],
          through: { attributes: [] }, // oculta la tabla intermedia
        }
      });
  
      if (!evento) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      res.json(evento.patrocinadores.map(p => ({
        id:p.id,
        nombre: p.nombre,
        logo_url: p.logo_url
      })));
    } catch (error) {
      console.error('Error al obtener patrocinadores:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

module.exports = router;
