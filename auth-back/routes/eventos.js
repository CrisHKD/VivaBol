const router = require('express').Router();
const { models } = require('../models/init-models');
const eventos = models.eventos;
const multimediaEventos = models.multimedia_eventos;
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const pagina = parseInt(req.query.page) || 1;
    const porPagina = 9;
    const categoriaId = req.query.categoria_id; // puede ser string o array

    const where = {};

    if (categoriaId) {
      // Si se pasa un solo id: ?categoria_id=3
      // Si se pasan múltiples: ?categoria_id=2&categoria_id=3
      if (Array.isArray(categoriaId)) {
        where.categoria_id = categoriaId.map(Number);
      } else {
        where.categoria_id = parseInt(categoriaId);
      }
    }

    const primerosEventos = await eventos.findAll({
      where,
      attributes: ['id', 
        'titulo', 
        'descripcion',
        'fecha_inicio', 
        'ubicacion', 
        'estado_id', 
        'imagen',
        'departamento',
        'categoria_id',
        'capacidad'],
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

router.get('/todos', async (req, res) => {
  try {
    const categoriaId = req.query.categoria_id;
    const where = {};

    if (categoriaId) {
      const ids = Array.isArray(categoriaId)
        ? categoriaId.map(Number)
        : [parseInt(categoriaId)];
      where.categoria_id = { [Op.in]: ids };
    }

    const eventosTodos = await eventos.findAll({
      where,
      attributes: [
        'id',
        'titulo',
        'descripcion',
        'fecha_inicio',
        'ubicacion',
        'estado_id',
        'imagen',
        'departamento',
        'categoria_id',
        'capacidad',
        'coordenadas'
      ]
    });

    res.status(200).json({ total: eventosTodos.length, eventos: eventosTodos });

  } catch (error) {
    console.error('Error al obtener todos los eventos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/por-fecha', async (req, res) => {
  try {
    const fecha = req.query.fecha;
    console.log('Fecha recibida:', fecha);

    if (!fecha) {
      return res.status(400).json({ error: 'Debe proporcionar una fecha en el formato YYYY-MM-DD' });
    }

    // Buscar eventos que comiencen ese día
    const eventosPorFecha = await eventos.findAll({
      where: {
        fecha_inicio: {
          [Op.between]: [
            `${fecha} 00:00:00`,
            `${fecha} 23:59:59`
          ]
        }
      },
      attributes: ['id', 'titulo', 'fecha_inicio']
    });

    res.status(200).json({ total: eventosPorFecha.length, eventos: eventosPorFecha });

  } catch (error) {
    console.error('Error al obtener eventos por fecha:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      const evento = await eventos.findByPk(id);
  
      if (!evento) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      
      res.status(200).json(evento);
    } catch (error) {
      console.error('Error al obtener evento por ID:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  

  router.get('/eventImg/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const imagenes = await multimediaEventos.findAll({
        where: { evento_id: id },
        attributes: ['url']
      });
  
      if (!imagenes) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      
      res.status(200).json(imagenes);
    } catch (error) {
      console.error('Error al obtener imagenes de evento por ID:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });



module.exports = router;