import DefaultHeader from "../layout/HeaderDefault";
import EventoTarjeta from "../components/EventoTarjeta";
import DepatamentoSelect from "../components/DepartamentoSelect";
import CategoriaSelect from "../components/CategoriaSelect";
import SearchComponent from "../components/CuadroBusqueda";
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Footer from "../layout/Footer";
import { API_URL } from "../auth/constants";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  // Obtiene el parámetro "page" de la URL
  const obtenerEventos = async (paginaActual: number) => {
    try {
      const response = await axios.get(`${API_URL}/eventos?page=${paginaActual}`);
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  useEffect(() => {
    // Obtener la página desde la URL si está presente
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;

    setPagina(pageNumber); // Establecer el número de página
    obtenerEventos(pageNumber); // Obtener los eventos de esa página
  }, [location.search]); // Cada vez que la búsqueda en la URL cambie

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Actualiza la URL con el número de página seleccionado
    navigate(`?page=${value}`);
  };

  return (
    <>
      <DefaultHeader>
        <Box
          sx={{
            width: '100%',
            justifyContent: 'center',
            padding: '36px',
          }}
        />
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
          <DepatamentoSelect />
          <CategoriaSelect />
          <SearchComponent />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Contenedor para las tarjetas de eventos */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {eventos.map((evento: any) => (
              <EventoTarjeta
                key={evento.id}
                id={evento.id}
                titulo={evento.titulo}
                fecha_inicio={evento.fecha_inicio}
                ubicacion={evento.ubicacion}
                imagen={evento.imagen}
                departamento={evento.departamento}
              />
            ))}
          </Box>

          {/* Paginación */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'auto',
              padding: '20px',
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={10} // Puedes actualizar esto según la cantidad total de páginas
                shape="rounded"
                page={pagina}
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        </Box>
      </DefaultHeader>
      <Footer />
    </>
  );
}
