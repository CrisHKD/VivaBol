//Componentes Material UI
import React from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';

//Funcionalidad
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../auth/constants";

interface Data {
  id: number,
  title: string,
  description: string,
  date: string,
  capacity: number,
  department: string,
  location: string,
  type: number,
  status: number,
}
interface DataForm {
  titulo: string,
  descripcion: string,
  fecha_inicio: string,
  fecha_fin: string,
  capacidad: number,
  ubicacion: string,
  departamento: string,
  categoria_id: number,
  estado_id: number,
  imagen: string,
  coordenadas: number,
}

interface FixedCenterBoxProps {
  evento: Data | null;
  onClose: () => void;
}

const EdicionEventos: React.FC<FixedCenterBoxProps> = ({ evento, onClose }) => {
  const [eventoDat, setEvento] = React.useState<DataForm | null>(null);
  const [titulo, setTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [capacidad, setCapacidad] = useState<number>(0);
  const [ubicacion, setUbicacion] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [categoria, setCategoria] = useState<number>(0);
  const [estado, setEstado] = useState<number>(0);
  const [coordenadas, setCoordenadas] = useState<number>(0);
  const [imagen, setImagen] = useState<string>('');



  const [formData, setFormData] = useState<DataForm>({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    capacidad: 0,
    ubicacion: '',
    departamento: '',
    categoria_id: 2,
    estado_id: 3,
    imagen: '',
    coordenadas: 0
  });

  useEffect(() => {
    axios.get(`${API_URL}/eventos/${evento?.id}`)
      .then(res => setEvento(res.data))
      .catch(err => console.error('Error al obtener evento:', err));
  }, [evento?.id]);

  useEffect(() => {
    if (eventoDat) {
      setTitulo(eventoDat.titulo);
      setDescripcion(eventoDat.descripcion);
      const fechaIniFormateada = new Date(eventoDat.fecha_inicio).toISOString().slice(0, 16);
      const fechaFinFormateada = new Date(eventoDat.fecha_fin).toISOString().slice(0, 16);
      setFechaInicio(fechaIniFormateada);
      setFechaFin(fechaFinFormateada);
      setCapacidad(eventoDat.capacidad);
      setUbicacion(eventoDat.ubicacion);
      setDepartamento(eventoDat.departamento);

    
    }
  }, [eventoDat]);

  if (!eventoDat) return <p>Cargando evento...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los datos editados al backend
    console.log('Datos actualizados:', formData);
    // También puedes cerrar el modal
    onClose();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <Box sx={{
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        width: '90%', // Ancho del modal 
        maxHeight: '80vh', // Limitar la altura máxima
        overflowY: 'auto',
      }}
      >
        <h2>Editar Evento</h2>
        <form onSubmit={handleSubmit}>
          {/* Título */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <div>
              <TextField
                label="Título"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                fullWidth
              />

              {/* Descripción */}
              <TextField
                label="Descripción"
                name="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Fecha de inicio"
                type="datetime-local"
                name="fecha_inicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Fecha de fin */}
              <TextField
                label="Fecha de fin"
                type="datetime-local"
                name="fecha_fin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Capacidad */}
              <TextField
                label="Capacidad"
                type="number"
                name="capacidad"
                value={capacidad}
                onChange={(e) => setCapacidad(Number(e.target.value) || 0)}
                fullWidth
                margin="normal"
              />
            </div>
          </Box>


          {/* Ubicación */}
          <TextField
            label="Ubicación"
            name="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Departamento */}
          <TextField
            label="Departamento"
            name="departamento"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            fullWidth 
            margin="normal"
          />

          {/* Categoría */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoria</InputLabel>
            <Select
              label="Categoria"
              name="categoria_id"
              value={formData.categoria_id}
              sx={{ zIndex: 2001 }}  // Añadir z-index aquí también si es necesario
              MenuProps={{
                PaperProps: {
                  style: {
                    zIndex: 1300,  // Asegurarse de que el menú desplegable se muestre por encima
                  },
                },
              }}

            >
              <MenuItem value={1}>Cultural</MenuItem>
              <MenuItem value={2}>Académico</MenuItem>
              <MenuItem value={3}>Deportivo</MenuItem>
            </Select>
          </FormControl>

          {/* Estado */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              name="estado_id"
              value={formData.estado_id}



            >
              <MenuItem value={1}>Pendiente</MenuItem>
              <MenuItem value={2}>Confirmado</MenuItem>
              <MenuItem value={3}>Cancelado</MenuItem>
            </Select>
          </FormControl>

          {/* Imagen */}
          <TextField
            label="Imagen URL"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" color="primary" type="submit">
              Guardar Cambios
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};


export default EdicionEventos;
