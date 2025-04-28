const express = require('express');
const multer = require('multer');
const cloudinary = require('../lib/cloudinary'); // Asegúrate de tener tu configuración de Cloudinary correctamente importada
const upload = multer(); // Para procesar las imágenes

const {models} = require('../models/init-models');
const Eventos = models.eventos; 
const MultimediaEventos = models.multimedia_eventos;
const Organizadores = models.organizadores;

const router = express.Router();

// Endpoint para crear un evento nuevo
router.post('/', async (req, res) => {
  const {
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    capacidad,
    ubicacion,
    departamento,
    organizador_id,
    categoria_id,
    estado_id,
    imagen
  } = req.body;

  
  

  // Subir las imágenes a Cloudinary
  const imageUrls = imagen;

  try {
    const organizador = await Organizadores.findOne({ where: { usuario_id: organizador_id } });


    // Crear el evento en la base de datos
    const evento = await Eventos.create({
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      capacidad,
      ubicacion,
      departamento,
      organizador_id: organizador.id, // Asegúrate de usar el ID correcto del organizador
      categoria_id,
      estado_id,
      imagen: imageUrls[0], // La primera imagen es la principal
    });

    // Insertar las otras imágenes en "multimedia_eventos"
    for (let i = 1; i < imageUrls.length; i++) {
      await MultimediaEventos.create({
        evento_id: evento.id, // Asocia la imagen con el evento recién creado
        url: imageUrls[i],
        tipo: 'imagen', // Puedes agregar más tipos si lo necesitas (ej. "video", "documento", etc.)
      });
    }

    return res.status(201).json({ message: 'Evento creado con éxito', evento });

  } catch (error) {
    console.error('Error al crear el evento:', error);
    return res.status(500).json({ error: 'Error al crear el evento', details: error });
  }
});

module.exports = router;
