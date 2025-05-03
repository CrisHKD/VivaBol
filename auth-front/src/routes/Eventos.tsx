import DefaultHeader from "../layout/HeaderDefault";
import EventoTarjeta from "../components/EventoTarjeta";
import Footer from "../layout/Footer";
import ChatContainer from "../layout/agenteVirtual";
import {
  Button,
  Box,
  Pagination,
  Stack,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  OutlinedInput,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { API_URL } from "../auth/constants";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const departamentos = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Potosí', 'Oruro', 'Chuquisaca', 'Tarija', 'Beni', 'Pando'];
const categorias = [
  { id: 1, nombre: "Cultural" },
  { id: 2, nombre: "Académico" },
  { id: 3, nombre: "Tecnológico" },
  { id: 4, nombre: "Gatronómico" },
  { id: 5, nombre: "Ferial" },
  { id: 6, nombre: "Deportivo" },
  { id: 7, nombre: "Social" },
];
export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [departamento, setDepartamento] = useState('');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const page = parseInt(params.get('page') || '1');
    const departamento = params.get('departamento') || '';
    const busqueda = params.get('busqueda') || '';
    const fecha = params.get('fecha') || '';
    const categorias = params.getAll('categoria_id').map(Number);

    obtenerEventos(page, departamento, categorias, busqueda, fecha);
    setPagina(page);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setDepartamento(params.get('departamento') || '');
    setBusqueda(params.get('busqueda') || '');
    setFechaInicio(params.get('fecha') || '');
    setCategoriasSeleccionadas(params.getAll('categoria_id').map(Number));
  }, [location.search]);

  const obtenerEventos = async (
    paginaActual: number,
    departamento: string,
    categoriasSeleccionadas: number[],
    busqueda: string,
    fechaInicio: string
  ) => {
    try {
      const params: any = {
        page: paginaActual,
      };
      if (departamento) params.departamento = departamento;
      if (categoriasSeleccionadas.length > 0) params.categoria_id = categoriasSeleccionadas;
      if (busqueda) params.busqueda = busqueda;
      if (fechaInicio) params.fecha = fechaInicio;

      const response = await axios.get(`${API_URL}/eventos`, { params });

      setEventos(response.data.eventos || []);
      setTotalPaginas(response.data.totalPaginas || 1);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const actualizarURL = (nuevaPagina: number = 1) => {
    const params = new URLSearchParams();
    if (departamento) params.set('departamento', departamento);
    if (busqueda) params.set('busqueda', busqueda);
    if (fechaInicio) params.set('fecha', fechaInicio);
    categoriasSeleccionadas.forEach((id) =>
      params.append('categoria_id', id.toString())
    );
    params.set('page', nuevaPagina.toString());
    navigate(`?${params.toString()}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    actualizarURL(value); // Usa los filtros actuales, solo cambia la página
  };

  return (
    <>
      <DefaultHeader>
        <Box sx={{ width: '100%', minHeight:"100%", padding: '36px' }} />

        {/* Filtros directamente aquí */}
        

        {/* Lista de eventos */}
        <Box sx={{ flexGrow: 1, px: 5 }}>
          

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              margin: '0 auto',
              maxWidth: '1200px', // Limita el ancho para que 3 tarjetas se centren
              gap: '20px',
              padding: '16px',
            }}
          >
            <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            padding: '20px',
            paddingRight: '120px',
          }}
        >
          {/* Departamento */}
          <TextField
            select
            label="Departamento"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Todos</MenuItem>
            {departamentos.map((dep) => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </TextField>

          {/* Categorías (múltiple) */}
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>Categorías</InputLabel>
            <Select
              multiple
              value={categoriasSeleccionadas}
              onChange={(e: SelectChangeEvent<number[]>) =>
                setCategoriasSeleccionadas(
                  typeof e.target.value === 'string' ? [] : (e.target.value as number[])
                )
              }
              input={<OutlinedInput label="Categorías" />}
              renderValue={(selected) =>
                (selected as number[])
                  .map((id) => categorias.find((c) => c.id === id)?.nombre)
                  .join(', ')
              }
            >
              {categorias.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Búsqueda */}
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* Fecha */}
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            size="small"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          {/* Botón Buscar */}
          <Box>
            <Button variant="contained" color="success" onClick={() => {
              setPagina(1);
              actualizarURL(1);
            }}>
              Buscar
            </Button>
          </Box>
        </Box>
            {eventos.map((evento: any) => (
              <Box
                key={evento.id ?? evento.titulo + evento.fecha_inicio}
                sx={{
                  width: 'calc(33.33% - 20px)', // 3 por fila con separación
                  minWidth: '320px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <EventoTarjeta
                  id={evento.id}
                  titulo={evento.titulo}
                  fecha_inicio={evento.fecha_inicio}
                  ubicacion={evento.ubicacion}
                  imagen={evento.imagen}
                  departamento={evento.departamento}
                />
              </Box>
            ))}
            
          </Box>




          {/* Paginación */}
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Stack spacing={2}>
              <Pagination
                count={totalPaginas}
                shape="rounded"
                page={pagina}
                onChange={handlePageChange}
              />
            </Stack>
            
          </Box>
        </Box>
        
      </DefaultHeader >
      <ChatContainer/>
      <Footer />
    </>
  );
}
