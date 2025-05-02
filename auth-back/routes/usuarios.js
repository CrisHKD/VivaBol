const router = require('express').Router();
const { models } = require('../models/init-models');
const usuarios = models.usuarios;
const preferencias_usuario = models.preferencias_usuario;
const Sequelize = require('sequelize');

router.get('/', async (req, res) => {
    try {
      const { nombre, apellido, email} = req.query; // obtenemos los parámetros de búsqueda de la URL
  
      // Condición de búsqueda
      const whereCondition = {};
      if (nombre) {
        whereCondition.nombres = { [Sequelize.Op.like]: `%${nombre}%` }; // busca por nombre (parcial)
      }
  
      if (apellido) {
        whereCondition.apellidos = { [Sequelize.Op.like]: `%${apellido}%` }; // busca por apellido (parcial)
      }
  
      if (email) {
        whereCondition.email = { [Sequelize.Op.like]: `%${email}%` }; // busca por correo (parcial)
      }
  
      // Si no se pasa ninguna búsqueda, retornamos todos los usuarios
      const users = await usuarios.findAll({
        where: whereCondition,
        attributes: ['id', 'nombres', 'apellidos', 'email', 'rol_id'],
      });
  
      // Si no se encontraron usuarios
      if (users.length === 0) {
        return res.status(200).json([]); 
      }
  
      // Retorna los usuarios encontrados
      res.status(200).json(users);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await usuarios.findOne({
        where: { id },
        attributes: ['id', 'nombres', 'apellidos', 'email', 'rol_id'],
        include: [{
          model: preferencias_usuario,
          as: 'preferencias_usuarios',
          attributes: ['idioma', 'notificaciones', 'notificaciones_email']
        }]
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Convertir a booleanos los valores si existen preferencias
      const result = user.toJSON();
      if (result.preferencias) {
        result.preferencias.notificaciones = !!result.preferencias.notificaciones;
        result.preferencias.notificaciones_email = !!result.preferencias.notificaciones_email;
      }
  
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al obtener usuario por id:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params; // Obtenemos el id del usuario desde los parámetros de la URL
      const { nombres, apellidos, rol_id, email } = req.body; // Obtenemos los datos a actualizar del cuerpo de la solicitud
  
      // Validar que al menos uno de los campos sea enviado
      if (!nombres && !apellidos && !rol_id && !email) {
        return res.status(400).json({ error: 'Debe enviar al menos uno de los campos: nombre, apellidos, rol_id' });
      }
  
      // Objeto de actualización
      const updateData = {};
  
      if (nombres) updateData.nombres = nombres;
      if (apellidos) updateData.apellidos = apellidos;
      if (rol_id) updateData.rol_id = rol_id;
      if (email) updateData.email = rol_id;
  
      // Actualizamos el usuario
      const [updated] = await usuarios.update(updateData, {
        where: { id },
      });
  
      // Verificamos si el usuario existe y si se actualizó correctamente
      if (!updated) {
        return res.status(404).json({ error: 'Usuario no encontrado o no se realizaron cambios' });
      }
  
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
module.exports = router;