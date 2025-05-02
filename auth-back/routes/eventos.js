const router = require('express').Router();
const { models } = require('../models/init-models');
const eventos = models.eventos;
const multimediaEventos = models.multimedia_eventos;
const { Op } = require('sequelize');


router.get('/', async (req, res) => {
  try {
    const pagina = parseInt(req.query.page) || 1;
    const porPagina = 9;

    const { categoria_id, departamento, fecha, busqueda } = req.query;

    const where = {};

    // Filtro por categoria (puede ser una o varias)
    if (categoria_id) {
      if (Array.isArray(categoria_id)) {
        where.categoria_id = categoria_id.map(Number);
      } else {
        where.categoria_id = parseInt(categoria_id);
      }
    }

    // Filtro por departamento
    if (departamento) {
      where.departamento = departamento;
    }

    // Filtro por fecha mínima
    if (fecha) {
      const inicio = new Date(fecha);
      const fin = new Date(fecha);
      fin.setDate(fin.getDate() + 1); // siguiente día
    
      where.fecha_inicio = {
        [Op.gte]: inicio,
        [Op.lt]: fin,
      };
    }

    // Filtro de búsqueda
    if (busqueda) {
      where[Op.or] = [
        { titulo: { [Op.like]: `%${busqueda}%` } },
        { descripcion: { [Op.like]: `%${busqueda}%` } },
      ];
    }

    // Obtener el total de registros
    const totalEventos = await eventos.count({ where });
    const totalPaginas = Math.ceil(totalEventos / porPagina);

    // Obtener los eventos paginados
    const eventosFiltrados = await eventos.findAll({
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
      ],
      limit: porPagina,
      offset: (pagina - 1) * porPagina,
      order: [['fecha_inicio', 'DESC']],
    });

    res.status(200).json({
      eventos: eventosFiltrados,
      totalPaginas,
    });
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