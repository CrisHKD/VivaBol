//Componentes Material UI
import React from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { ListItemText, Checkbox, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';

//Funcionalidad
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../auth/constants";

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
  expositor: string,
  coordenadas: number,
}

interface FixedCenterBoxProps {
  ident: number;
  onClose: () => void;
}



const EdicionEventos: React.FC<FixedCenterBoxProps> = ({ ident, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [eventoDat, setEvento] = React.useState<DataForm | null>(null);
  const [titulo, setTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [capacidad, setCapacidad] = useState<number>(0);
  const [ubicacion, setUbicacion] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [categoria, setCategoria] = useState<number>(0);

  const [estado, setEstado] = useState<number>(0);

  const [patrocinadoresEv, setPatrocinadoresEv] = useState<any[]>([]);

  const [expositor, setExpositor] = useState('');
  const [patrocinadores, setPatrocinadores] = useState<any[]>([]);
  const [patrocinadoresSeleccionados, setPatrocinadoresSeleccionados] = useState<number[]>([]);

  const departamentos = [
    "La Paz", "Oruro", "Potosí", "Santa Cruz", "Beni", "Pando", "Tarija", "Cochabamba", "Tariza", "Chuquisaca"
  ];

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

  useEffect(() => {
    axios.get(`${API_URL}/eventos/${ident}`)
      .then(res => setEvento(res.data))
      .catch(err => console.error('Error al obtener evento:', err));
  }, [ident]);



  useEffect(() => {
    const fetchPatrocinadores = async () => {
      try {
        const response = await axios.get(`${API_URL}/patrocinadores`);
        setPatrocinadores(response.data);
      } catch (err) {
        console.error('Error al obtener los patrocinadores:', err);
      }
    };

    fetchPatrocinadores();
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/patrocinadores/eventos`, {
      params: {
        evento_id: ident
      }
    })
      .then(res => {
        setPatrocinadoresEv(res.data);
        console.log("patrocinadoresEv", res.data);
      })
      .catch(err => console.error('Error al obtener patrocinadores:', err));
  }, [ident]);

  useEffect(() => {
    if (eventoDat && patrocinadoresEv) {
      setTitulo(eventoDat.titulo);
      setDescripcion(eventoDat.descripcion);
      const fechaIniFormateada = new Date(eventoDat.fecha_inicio).toISOString().slice(0, 16);
      
      setFechaInicio(fechaIniFormateada);
      setCapacidad(eventoDat.capacidad);
      setUbicacion(eventoDat.ubicacion);
      setDepartamento(eventoDat.departamento);
      setExpositor(eventoDat.expositor);

      const ids = patrocinadoresEv.map((p: any) => p.id);
      setPatrocinadoresSeleccionados(ids);
      console.log("patrocinadoresSeleccionados", patrocinadoresSeleccionados);
      console.log("patrocinadoresEv", patrocinadoresEv);
    }
  }, [eventoDat, patrocinadoresEv]);


  if (!eventoDat) return <p>Cargando evento...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const datosActualizados = {
        titulo,
        descripcion,
        fecha_inicio:fechaInicio,
        capacidad,
        ubicacion,
        departamento,
        categoria_id:categoria,
        estado_id:estado,
        expositor,
        patrocinadores: patrocinadoresSeleccionados, // array de IDs
      };
  
      // Suponiendo que `eventoId` es el ID del evento que estás editando
      await axios.put(`${API_URL}/createEvent/${ident}`, datosActualizados);
  
      // Opcional: notificación, recarga o feedback
      console.log('Evento actualizado con éxito');
  
      // Cerrar modal o redirigir
      onClose();
  
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      // Manejo de error en UI si es necesario
    }
  };
  return (
    <>
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
            <Box sx={{
              padding: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              width: '100%', // Ancho del modal 
              maxHeight: '80vh', // Limitar la altura máxima
              overflowY: 'auto',
            }}
            >
              <h2>Editar Evento</h2>
              <form onSubmit={handleSubmit}>
                {/* Título */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ width: '35%' }}>
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
                  </Box>
                  <Box sx={{ width: '60%' }}>
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
                      label="Expositor"
                      name="expositor"
                      value={expositor}
                      onChange={(e) => setExpositor(e.target.value)}
                      fullWidth
                      multiline
                      rows={1}
                      margin="normal"
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
                    <FormControl fullWidth>
                      <InputLabel id="patrocinadores-label">Patrocinadores</InputLabel>
                      <Select
                        labelId="patrocinadores-label"
                        multiple
                        value={patrocinadoresSeleccionados}
                        onChange={(e) => setPatrocinadoresSeleccionados(e.target.value as number[])}
                        renderValue={(selected) =>
                          patrocinadores
                            .filter((p) => selected.includes(p.id))
                            .map((p) => p.nombre)
                            .join(", ")
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300, // Altura máxima del menú desplegable
                              width: 250      // Ancho del menú
                            }
                          }
                        }}
                      >
                        {patrocinadores.map((p) => (
                          <MenuItem key={p.id} value={p.id}>
                            <Checkbox checked={patrocinadoresSeleccionados.includes(p.id)} />
                            <ListItemText primary={p.nombre} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Box>
                </Box>


                {/* Ubicación */}
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
                  </Box>
                  <Box sx={{ flex: 1 }}>
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
                </Box>


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
        </Box>
      )}
    </>
  );
};


export default EdicionEventos;
