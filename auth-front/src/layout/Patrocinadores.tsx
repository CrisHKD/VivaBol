import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL } from "../auth/constants";

export default function AgregarPatrocinador() {
  const [nombre, setNombre] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar el cambio en los campos del formulario
  
  // Manejar el envío del formulario
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validar que los campos no estén vacíos
    if (!nombre || !logoUrl) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    try {
      // Hacer la solicitud POST usando Axios
      const response = await axios.post(`${API_URL}/patrocinadores/subir`, {
        nombre,
        logo_url: logoUrl,
      });

      // Mostrar el mensaje de éxito si se agrega el patrocinador correctamente
      setSuccessMessage(response.data.mensaje);
      setNombre('');
      setLogoUrl('');
    } catch (error) {
      // Manejo de errores
      console.error('Error al agregar patrocinador:', error);
      setError('Hubo un problema al agregar el patrocinador.');
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
      }}
    >
      <Typography variant="h6" gutterBottom>
        Agregar Patrocinador
      </Typography>

      {/* Mostrar error si existe */}
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Mostrar mensaje de éxito si se agregó correctamente */}
      {successMessage && (
        <Typography color="primary" variant="body2" gutterBottom>
          {successMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Logo URL"
          variant="outlined"
          fullWidth
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" color="primary" fullWidth type="submit">
          Agregar Patrocinador
        </Button>
      </form>
    </Box>
  );
}
