const express = require('express');
const multer = require('multer');
const cloudinary = require('../lib/cloudinary'); // Asegúrate de tener tu configuración de Cloudinary correctamente importada
const upload = multer(); // Para procesar las imágenes

const {models} = require('../models/init-models');
const Eventos = models.eventos; 
const MultimediaEventos = models.multimedia_eventos;
const Organizadores = models.organizadores;
const PatrocinadorEvento = models.patrocinador_evento;

const router = express.Router();

// Endpoint para crear un evento nuevo
router.post('/', async (req, res) => {
  const {
    titulo,
    descripcion,
    fecha_inicio,
    capacidad,
    ubicacion,
    departamento,
    organizador_id,
    categoria_id,
    estado_id,
    expositor,
    imagen,
    patrocinadores // array de ids de patrocinadores
  } = req.body;

  // Subir las imágenes a Cloudinary (ya deben estar subidas en este punto)
  const imageUrls = imagen;

  try {
    // Verifica que el organizador exista
    const organizador = await Organizadores.findOne({ where: { usuario_id: organizador_id } });
    if (!organizador) {
      return res.status(404).json({ error: 'Organizador no encontrado' });
    }

    // Crear el evento
    const evento = await Eventos.create({
      titulo,
      descripcion,
      fecha_inicio,
      capacidad,
      ubicacion,
      departamento,
      organizador_id: organizador.id,
      categoria_id,
      estado_id,
      expositor,
      imagen: imageUrls[0], // Imagen principal
    });

    // Agregar las otras imágenes a MultimediaEventos
    for (let i = 1; i < imageUrls.length; i++) {
      await MultimediaEventos.create({
        evento_id: evento.id,
        url: imageUrls[i],
        tipo: 'imagen',
      });
    }

    // Insertar en patrocinador_evento
    if (Array.isArray(patrocinadores)) {
      for (const patrocinador_id of patrocinadores) {
        await PatrocinadorEvento.create({
          evento_id: evento.id,
          patrocinador_id,
        });
      }
    }

    return res.status(201).json({ message: 'Evento creado con éxito', evento });

  } catch (error) {
    console.error('Error al crear el evento:', error);
    return res.status(500).json({ error: 'Error al crear el evento', details: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    fecha_inicio,
    capacidad,
    ubicacion,
    departamento,
    categoria_id,
    estado_id,
    expositor,
    patrocinadores // array de ids
  } = req.body;

  try {
    const evento = await Eventos.findByPk(id);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Actualizar los campos del evento (excepto organizador_id)
    await evento.update({
      titulo,
      descripcion,
      fecha_inicio,
      capacidad,
      ubicacion,
      departamento,
      categoria_id,
      estado_id,
      expositor,
    });

    // Actualizar patrocinadores si hay cambios
    if (Array.isArray(patrocinadores)) {
      // 1. Eliminar relaciones anteriores
      await PatrocinadorEvento.destroy({ where: { evento_id: id } });

      // 2. Crear nuevas relaciones
      const nuevasRelaciones = patrocinadores.map((patrocinador_id) => ({
        evento_id: id,
        patrocinador_id,
      }));

      await PatrocinadorEvento.bulkCreate(nuevasRelaciones);
    }

    return res.status(200).json({ message: 'Evento actualizado con éxito', evento });

  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    return res.status(500).json({ error: 'Error al actualizar el evento', details: error.message });
  }
});


module.exports = router;
