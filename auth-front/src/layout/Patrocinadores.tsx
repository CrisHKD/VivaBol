import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { API_URL } from '../auth/constants';

export default function AgregarPatrocinador() {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImagen(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!nombre || !imagen) {
      setError('Debes ingresar el nombre y seleccionar una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('logo', imagen);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/patrocinadores/subir`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMensaje(response.data.mensaje || 'Patrocinador agregado exitosamente.');
      setNombre('');
      setImagen(null);
      setPreviewUrl('');
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al subir el patrocinador.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Agregar Patrocinador
      </Typography>

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      {mensaje && (
        <Typography color="primary" variant="body2" gutterBottom>
          {mensaje}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del patrocinador"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #3f51b5',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            mb: 2,
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body2">
            Arrastra y suelta una imagen aquí o haz clic para seleccionar
          </Typography>
        </Box>

        {previewUrl && (
          <Avatar
            src={previewUrl}
            variant="rounded"
            sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }}
          />
        )}

        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" fullWidth>
            Subir Patrocinador
          </Button>
        )}
      </form>
    </Box>
  );
}
