const router = require('express').Router();
const { models } = require('../models/init-models');
const usuarios = models.usuarios;
const organizadores = models.organizadores;
const preferencias_usuario = models.preferencias_usuario;
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const multer = require('multer');
const cloudinary = require('../lib/cloudinary');


const upload = multer(); // memoria

router.get('/', async (req, res) => {
  try {
    const { nombre, apellido, email } = req.query;

    const whereCondition = {};
    if (nombre) {
      whereCondition.nombres = { [Op.like]: `%${nombre}%` };
    }
    if (apellido) {
      whereCondition.apellidos = { [Op.like]: `%${apellido}%` };
    }
    if (email) {
      whereCondition.email = { [Op.like]: `%${email}%` };
    }

    const users = await usuarios.findAll({
      where: whereCondition,
      attributes: ['id', 'nombres', 'apellidos', 'email', 'rol_id'],
      include: [
        {
          model: organizadores,
          as: "organizadore",
          attributes: ['id'],
          required: false,
        },
      ],
    });

    const usersConOrganizador = users.map((user) => {
      const { id, nombres, apellidos, email, rol_id, organizadore } = user.get({ plain: true });

      return {
        id,
        nombres,
        apellidos,
        email,
        rol_id,
        esOrganizador: !!organizadore,
      };
    });

    res.status(200).json(usersConOrganizador);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

  router.post('/cambiarImagen', upload.single('imagen'), async (req, res) => {
    const { file } = req;
    const { id } = req.body;
  
    if (!id || !file) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: id o archivo' });
    }
  
    try {
      const usuario = await usuarios.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          width: 300,
          height: 300,
          crop: 'fill',
          gravity: 'face',
          folder: 'usuarios',
        },
        async (err, result) => {
          if (err) {
            console.error('Error al subir imagen:', err);
            return res.status(500).json({ error: 'Error al subir la imagen', details: err });
          }
  
          // Actualiza la URL en la base de datos
          usuario.foto_perfil = result.secure_url;
          await usuario.save();
  
          res.status(200).json({
            mensaje: 'Imagen de perfil actualizada exitosamente',
            imagenUrl: result.secure_url,
          });
        }
      ).end(file.buffer);
    } catch (error) {
      console.error('Error al cambiar imagen de usuario:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await usuarios.findOne({
        where: { id },
        attributes: ['id', 'nombres', 'apellidos', 'email', 'rol_id','foto_perfil'],
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
      console.log("Resultados-----------",result)
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al obtener usuario por id:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.put('/preferencias', async (req, res) => {
    try {
      const { usuario_id, notificaciones, notificaciones_email } = req.body;
  
      if (!usuario_id) {
        return res.status(400).json({ error: 'Falta el campo usuario_id' });
      }
  
      const preferencias = await preferencias_usuario.findOne({
        where: { usuario_id },
      });
  
      if (!preferencias) {
        return res.status(404).json({ error: 'Preferencias no encontradas para el usuario' });
      }
  
      // Solo actualiza los campos que vienen en el body
      if (typeof notificaciones === 'boolean') {
        preferencias.notificaciones = notificaciones;
      }
      if (typeof notificaciones_email === 'boolean') {
        preferencias.notificaciones_email = notificaciones_email;
      }
  
      await preferencias.save();
  
      res.status(200).json({ mensaje: 'Preferencias actualizadas correctamente', preferencias });
    } catch (err) {
      console.error('Error al actualizar preferencias:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.post('/organizadores', async (req, res) => {
    try {
      const {
        usuario_id,
        nombre_institucion,
        descripcion,
        sitio_web,
        telefono_contacto,
      } = req.body;
  
      // Validación básica
      if (!usuario_id || !nombre_institucion) {
        return res.status(400).json({ error: 'usuario_id y nombre_institucion son obligatorios' });
      }
  
      // Verifica si ya existe un organizador para ese usuario
      const existente = await organizadores.findOne({ where: { usuario_id } });
      if (existente) {
        return res.status(409).json({ error: 'El usuario ya tiene un organizador registrado' });
      }
  
      const nuevoOrganizador = await organizadores.create({
        usuario_id,
        nombre_institucion,
        descripcion,
        sitio_web,
        telefono_contacto,
        creado_en: new Date(),
      });
  
      res.status(201).json(nuevoOrganizador);
    } catch (error) {
      console.error('Error al crear organizador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  router.delete('/organizadores', async (req, res) => {
    try {
      const { usuario_id } = req.body;
  
      if (!usuario_id) {
        return res.status(400).json({ error: 'usuario_id es obligatorio' });
      }
  
      // Verifica si existe
      const organizador = await organizadores.findOne({ where: { usuario_id } });
  
      if (!organizador) {
        return res.status(404).json({ error: 'Organizador no encontrado para ese usuario' });
      }
  
      await organizadores.destroy({ where: { usuario_id } });
  
      res.status(200).json({ mensaje: 'Organizador eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar organizador:', error);
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