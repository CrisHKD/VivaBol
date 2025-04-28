import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';  // Icono para el botón de cerrar
import { API_URL } from "../auth/constants";
import UploadImage from '../routes/UploadImage';
import { AuthResponseError } from "../types/types";
import { useNavigate } from "react-router-dom";


import { useAuth } from '../auth/AuthProvider';

const CrearEventoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [capacidad, setCapacidad] = useState<number>(0);
  const [ubicacion, setUbicacion] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [categoria, setCategoria] = useState<number>(0);
  const [estado, setEstado] = useState<number>(0);
  const [imagen, setImagen] = useState<string[]>([]);
  const auth = useAuth();
  const user = auth.getUser?.();
  const identidad = user?.ident;
  console.log("Identidad usuario: "+identidad);

  const [errorResponse, setErrorResponse] = useState('');

  const handleImagesUpload = (urls: string[]) => {
    setImagen(urls);
    console.log('Todas las URLs de las imágenes subidas:', urls);
  };

  // Listado de departamentos
  const departamentos = [
    "La Paz", "Oruro", "Potosí", "Santa Cruz", "Beni", "Pando", "Tarija", "Cochabamba", "Tariza","Chuquisaca"
  ];

  // Categorías
  const categorias = [
    { id: 1, nombre: "Cultural" },
    { id: 2, nombre: "Académico" },
    { id: 3, nombre: "Tecnológico" },
    { id: 4, nombre: "Gatronómico" },
    { id: 5, nombre: "Ferial" },
    { id: 6, nombre: "Deportivo" },
    { id: 7, nombre: "Social" },
  ];

  // Estados
  const estados = [
    { id: 1, nombre: "Publicado" },
    { id: 2, nombre: "Borrador" },
    { id: 3, nombre: "Cancelado" },
  ];
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
          
          e.preventDefault();
          const formData = {
            titulo,
            descripcion,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            capacidad,
            ubicacion,
            departamento,
            organizador_id: user?.ident, 
            categoria_id: categoria,
            estado_id: estado,
            imagen, // Este campo puede ser gestionado por el backend
            coordenadas: 0, // Esto puede ser gestionado por el backend o el mapa
          };
          console.log('Datos para crear el evento:', formData);
  
          try {
              const response = await fetch(`${API_URL}/createEvent`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    titulo,
                    descripcion,
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                    capacidad,
                    ubicacion,
                    departamento,
                    organizador_id: user?.ident, 
                    categoria_id: categoria,
                    estado_id: estado,
                    imagen, // Este campo puede ser gestionado por el backend
                    coordenadas: 0, // Esto puede ser gestionado por el backend o el mapa
                  })
              });
              if (response.ok) {
                  console.log('Evento creado');
                  setErrorResponse('');
                  goTo('/');
              } else {
                  console.log('Something went wrong');
                  const json = (await response.json()) as AuthResponseError;
                  setErrorResponse(json.body.error);
                  return;
              }
          } catch (error) {
              console.log(error);
          }
      }

  const handleClose = () => {
    setIsOpen(false);  // Cerrar el modal
  };

  return (
    <>
      {/* Modal de pantalla completa */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 50,
            left: 100,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo con opacidad
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              padding: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              width: '80%',
              height: '90%',
              overflowY: 'auto',
            }}
          >
            {/* Botón de cerrar */}
            <Button
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#ff4d4d',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ff1a1a',
                },
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>

            <h2>Crear Evento</h2>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <div>
                  <TextField
                    label="Título"
                    name="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
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
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Fecha de fin"
                    type="datetime-local"
                    name="fecha_fin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Capacidad"
                    type="number"
                    name="capacidad"
                    value={capacidad}
                    onChange={(e) => setCapacidad(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </Box>





              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Departamento</InputLabel>
                    <Select
                      label="Departamento"
                      name="departamento"
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            zIndex: 1500,  // Asegura que el menú se muestre por encima de otros elementos
                          },
                        },
                      }}
                    >
                      {departamentos.map((dept) => (
                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Ubicación"
                    name="ubicacion"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      label="Categoria"
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(Number(e.target.value))}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            zIndex: 1500,  // Asegura que el menú se muestre por encima de otros elementos
                          },
                        },
                      }}
                    >
                      {categorias.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      label="Estado"
                      name="estado"
                      value={estado}
                      onChange={(e) => setEstado(Number(e.target.value))}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            zIndex: 1500,  // Asegura que el menú se muestre por encima de otros elementos
                          },
                        },
                      }}
                    >
                      {estados.map((estadoItem) => (
                        <MenuItem key={estadoItem.id} value={estadoItem.id}>{estadoItem.nombre}</MenuItem>
                      ))}
                    </Select>

                  </FormControl>
                </Box>
                <Box sx={{ flex: 1 }}>
                <UploadImage onImagesUpload={handleImagesUpload} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="contained" color="primary" type="submit">
                  Guardar Evento
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
              </Box>

            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CrearEventoModal;
