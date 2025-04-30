const express = require('express');
const router = express.Router();
const { models } = require('../models/init-models');
const { where } = require('sequelize');
const patrocinadores = models.patrocinador; 
const patrocinadorEvento = models.patrocinador_evento;
const eventos = models.eventos;

router.post('/subir', async (req, res) => {
    console.log(req.body);  // Verifica si los datos están siendo recibidos correctamente
    
    try {
        const { nombre, logo_url } = req.body;

        if (!nombre || !logo_url) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, logo_url' });
        }

        const patrocinadorExiste = await patrocinadores.findOne({
            where: { nombre },
        });

        if (patrocinadorExiste) {
            return res.status(409).json({ error: 'El patrocinador ya existe.' });
        }

        const nuevoPatrocinador = await patrocinadores.create({
            nombre,
            logo_url,
        });

        res.status(201).json({ mensaje: 'Patrocinador agregado exitosamente', patrocinador: nuevoPatrocinador });
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

  router.get('/eventos', async (req, res) => {
    try {
      // Lee `evento_id` desde req.query, ya que lo estás enviando en la URL como parámetro
      const { evento_id } = req.query;  // Usar req.query en lugar de req.body para parámetros de URL
      console.log("--------------------",evento_id);
      if (!evento_id) {
        return res.status(400).json({ error: 'Falta el parámetro evento_id' });
      }
  
      // Realizar la consulta con la relación entre patrocinador_evento y patrocinadores
      const evento = await eventos.findByPk(evento_id, {
        include: {
          model: patrocinadores,
          attributes: ['nombre', 'logo_url'],
          through: { attributes: [] }, // oculta la tabla intermedia
        }
      });
  
      if (!evento) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      console.log(evento,patrocinadores);
      res.json(evento.patrocinadores.map(p => ({
        nombre: p.nombre,
        logo_url: p.logo_url
      })));
    } catch (error) {
      console.error('Error al obtener patrocinadores:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

module.exports = router;
