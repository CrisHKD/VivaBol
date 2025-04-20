const router = require('express').Router();
const { models } = require('../models/init-models');
const eventos = models.eventos;

router.get('/', async (req, res) => {
  try {
    const pagina = parseInt(req.query.page) || 1; // lee el query param `page`
    const porPagina = 9;

    const primerosEventos = await eventos.findAll({
      attributes: ['id', 'titulo', 'fecha_inicio', 'ubicacion', 'estado_id', 'imagen'],
      limit: porPagina,
      offset: (pagina - 1) * porPagina,
    });

    if (primerosEventos.length > 0) {
      res.status(200).json(primerosEventos);
    } else {
      res.status(404).json({ message: 'No se encontraron eventos' });
    }
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;