import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, CircularProgress, Typography, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { API_URL } from '../auth/constants';

export default function ListaPatrocinadores() {
  const [patrocinadores, setPatrocinadores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Obtener la lista de patrocinadores al montar el componente
  useEffect(() => {
    const fetchPatrocinadores = async () => {
      try {
        const response = await axios.get(`${API_URL}/patrocinadores`);
        setPatrocinadores(response.data);
      } catch (err) {
        console.error('Error al obtener los patrocinadores:', err);
        setError('Hubo un problema al cargar los patrocinadores.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatrocinadores();
  }, []);

  // Borrar un patrocinador
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/patrocinadores/${id}`);
      setPatrocinadores(patrocinadores.filter((patrocinador) => patrocinador.id !== id)); // Eliminar de la lista en el frontend
    } catch (err) {
      console.error('Error al borrar el patrocinador:', err);
      setError('Hubo un problema al borrar el patrocinador.');
    }
  };

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
      setPatrocinadores([...patrocinadores, response.data.patrocinador]); // Actualizar la lista de patrocinadores
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al subir el patrocinador.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '25px' }}>
      <Typography variant="h6" gutterBottom>
        Gestión de Patrocinadores
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Listado de patrocinadores (cuadro a la izquierda) */}
        <Box sx={{ width: '65%', borderRadius: 2, boxShadow: 3, padding: 3 }}>
          <Typography variant="h6">Lista de Patrocinadores</Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patrocinadores.map((patrocinador) => (
                    <TableRow key={patrocinador.id}>
                      <TableCell>{patrocinador.id}</TableCell>
                      <TableCell>{patrocinador.nombre}</TableCell>
                      <TableCell>
                        <Avatar alt={patrocinador.nombre} src={patrocinador.logo_url} sx={{ width: 40, height: 40 }} />
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDelete(patrocinador.id)}>
                          Borrar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* Agregar patrocinador (cuadro a la derecha) */}
        <Box sx={{ width: '30%', borderRadius: 2, boxShadow: 3, padding: 3 }}>
          <Typography variant="h6">Agregar Patrocinador</Typography>
          {error && <Typography color="error">{error}</Typography>}
          {mensaje && <Typography color="primary">{mensaje}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre del patrocinador"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box {...getRootProps()} sx={{ border: '2px dashed #3f51b5', borderRadius: 2, padding: 2, textAlign: 'center', backgroundColor: '#f9f9f9', mb: 2 }}>
              <input {...getInputProps()} />
              <Typography variant="body2">Arrastra y suelta una imagen aquí o haz clic para seleccionar</Typography>
            </Box>
            {previewUrl && <Avatar src={previewUrl} variant="rounded" sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }} />}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" fullWidth>
                Subir Patrocinador
              </Button>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
}
