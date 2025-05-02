const express = require('express');
const multer = require('multer');
const cloudinary = require('../lib/cloudinary');
const upload = multer();

const router = express.Router();

// Endpoint para subir la imagen
router.post('/banner', upload.single('image'), (req, res) => {
    const { file } = req;
  
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Subir la imagen a Cloudinary usando el buffer
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error al subir la imagen', details: err });
        }
  
        res.status(200).json({ imageUrl: result.secure_url });
      }
    ).end(file.buffer); // Usamos `.end()` para pasar el buffer a Cloudinary
  });

  router.post('/eventImages', upload.single('image'), (req, res) => {
    const { file } = req;
  
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        transformation: [
          { width: 600, height: 600, crop: 'fill' } // ⬅️ transformación aquí
        ]
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error al subir la imagen', details: err });
        }
        
        res.status(200).json({ imageUrl: result.secure_url });
      }
    ).end(file.buffer);
  });
  
  module.exports = router;