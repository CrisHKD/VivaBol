
import { API_URL } from "../auth/constants";

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import axios from 'axios';

const roles = [
  { id: 1, nombre: "Usuario" },
  { id: 2, nombre: "Administrador" },
  { id: 3, nombre: "UsCultural" },
  { id: 4, nombre: "UsAcademico" },
  { id: 5, nombre: "UsOrganizador" },
];

const EditUserForm = ({ userId, onClose }: { userId: number, onClose: () => void }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [rolId, setRolId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/${userId}`);
        const { nombres, apellidos, rol_id } = response.data;
        setNombres(nombres || '');
        setApellidos(apellidos || '');
        setRolId(rol_id || '');
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los datos del usuario.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Manejar el envío del formulario para actualizar el usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${API_URL}/usuarios/${userId}`, {
        nombres,
        apellidos,
        rol_id: rolId,
      });
      alert('Usuario actualizado correctamente');
      onClose(); // Cerrar el formulario tras la actualización exitosa
    } catch (err) {
      setError('Error al actualizar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fondo opaco (overlay) */}
      <Box 
        sx={{
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
          zIndex: 1200, // Overlay detrás del formulario
        }}
        onClick={onClose} // Cierra el modal si el usuario hace clic fuera del formulario
      />

      {/* Formulario */}
      <Box 
        sx={{
          width: 400, 
          padding: 2, 
          backgroundColor: 'white', // Fondo blanco para el formulario
          borderRadius: 4, // Bordes redondeados
          boxShadow: 3, // Sombra para resaltar
          position: 'fixed', // Fijarlo en la pantalla
          top: '50%', // Centrado verticalmente
          left: '50%', // Centrado horizontalmente
          transform: 'translate(-50%, -50%)', // Ajustar para centrar correctamente
          zIndex: 1300, // Asegurarse de que esté encima de otros elementos
          maxWidth: '90%', // Responsivo, no más grande que 90% de la pantalla
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                margin="normal"
              />
              
              {/* Select para el Rol */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Rol</InputLabel>
                <Select
                  value={rolId}
                  onChange={(e) => setRolId(e.target.value)}
                  label="Rol"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                  {loading ? 'Actualizando...' : 'Actualizar'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Cancelar
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default EditUserForm;
