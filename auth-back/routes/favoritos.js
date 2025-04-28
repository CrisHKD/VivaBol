const express = require('express');
const router = express.Router();
const { models } = require('../models/init-models');
const favoritos_eventos = models.favoritos_eventos;
const { Sequelize } = require('sequelize');

// POST: Agregar a favoritos
router.post('/', async (req, res) => {
  try {
    const { usuario_id, evento_id } = req.body;

    // Validaciones mínimas
    if (!usuario_id || !evento_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: usuario_id y evento_id' });
    }

    // Verificar si ya existe el favorito (opcional, para evitar duplicados)
    const favoritoExistente = await favoritos_eventos.findOne({
      where: {
        usuario_id,
        evento_id
      }
    });

    if (favoritoExistente) {
      return res.status(409).json({ error: 'El evento ya está en favoritos.' });
    }

    // Crear el nuevo favorito
    const nuevoFavorito = await favoritos_eventos.create({
      usuario_id,
      evento_id,
      fecha_agregado: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    res.status(201).json({ mensaje: 'Agregado a favoritos exitosamente', favorito: nuevoFavorito });
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.delete('/', async (req, res) => {
    try {
      const { usuario_id, evento_id } = req.body;
  
      // Validaciones mínimas
      if (!usuario_id || !evento_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: usuario_id y evento_id' });
      }
  
      // Buscar si existe el favorito
      const favoritoExistente = await favoritos_eventos.findOne({
        where: {
          usuario_id,
          evento_id
        }
      });
  
      if (!favoritoExistente) {
        return res.status(404).json({ error: 'El favorito no existe.' });
      }
  
      // Eliminar el favorito
      await favoritoExistente.destroy();
  
      res.status(200).json({ mensaje: 'Favorito eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const { usuario_id, evento_id } = req.query;
  
      // Validaciones mínimas
      if (!usuario_id || !evento_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: usuario_id y evento_id' });
      }
  
      // Buscar si existe el favorito
      const favoritoExistente = await favoritos_eventos.findOne({
        where: {
          usuario_id: Number(usuario_id),
          evento_id: Number(evento_id)
        }
      });
  
      if (favoritoExistente) {
        return res.status(200).json({ favorito: true });
      } else {
        return res.status(200).json({ favorito: false });
      }
    } catch (error) {
      console.error('Error al buscar favorito:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.get('/todos', async (req, res) => {
    try {
      const { usuario_id } = req.query;
  
      // Validaciones mínimas
      if (!usuario_id ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: usuario_id y evento_id' });
      }
  
      // Buscar si existe el favorito
      const favoritos = await favoritos_eventos.findAll({
        where: {
          usuario_id: Number(usuario_id),
        },
      });
  
        return res.status(200).json(favoritos);
    } catch (error) {
      console.error('Error al buscar favorito:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

module.exports = router;
