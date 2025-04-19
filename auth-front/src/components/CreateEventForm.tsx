import React, { useState } from 'react';
import { TextField, Box, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const CreateEventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    capacity: '',
    department: '',
    category: '',
  });

  const [error, setError] = useState<string>('');

  const departments = ['Beni', 'Chuquisaca', 'Cochabamba', 'La Paz', 'Oruro', 'Pando', 'Potosi', 'Santa Cruz', 'Tarija'];
  const categories = ['Deportes', 'Académicos', 'Culturales', 'Gastronómicos', 'Musicales'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate || !formData.capacity || !formData.department || !formData.category) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setError('');

    // Aquí puedes enviar el formulario (por ejemplo, usando fetch o axios)
    console.log('Formulario enviado:', formData);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Título */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Fecha de inicio */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Inicio"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          {/* Fecha de fin */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Fin"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          {/* Capacidad */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Capacidad"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Departamento */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Departamento</InputLabel>
              <Select
                label="Departamento"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Categoría */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Error */}
          {error && (
            <Grid item xs={12}>
              <Box sx={{ color: 'red' }}>{error}</Box>
            </Grid>
          )}

          {/* Botón de envío */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Crear Evento
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateEventForm;
