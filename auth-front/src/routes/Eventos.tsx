
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
  

export default function Eventos(){
    const [eventos, setEventos] = useState([]);
    const [pagina, setPagina] = useState(1);

    const obtenerEventos = async (paginaActual: number) => {
        try {
          const response = await axios.get(`${API_URL}/eventos?page=${paginaActual}`);
          setEventos(response.data);
        } catch (error) {
          console.error('Error al obtener eventos:', error);
        }
      };
    
      useEffect(() => {
        obtenerEventos(pagina);
      }, [pagina]);

   
    return (
        <>
        <DefaultHeader>
            <Box 
                sx={{

                    width: '100%',
                    justifyContent: 'center', // Centrado horizontal
                    padding: '36px',          // Espaciado alrededor de los componentes
                }}
            />
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'right', // Centrado horizontal
                    alignItems: 'center',     // Centrado vertical
                    gap: '20px',              // Espacio entre los componentes
                    flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
                    padding: '20px',
                    paddingRight:'120px'           // Espaciado alrededor de los componentes
                }}
            >
                <DepatamentoSelect/>
                <CategoriaSelect/>
                <SearchComponent/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Asegura que el contenedor ocupe toda la pantalla
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
                        key={evento.id} // Usa un ID único si está disponible
                        titulo={evento.titulo}
                        fecha_inicio={evento.fecha_inicio}
                        ubicacion={evento.ubicacion}
                        imagen ={evento.imagen}
                        />
                    ))}
                </Box>

                {/* Paginación */}
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 'auto', // Esto asegura que la paginación se mantenga al final
                    padding: '20px',   // Añade algo de espacio alrededor de la paginación
                    }}
                >
                    <Stack spacing={2}>
                        <Pagination
                        count={10} // Puedes actualizar esto según la cantidad total de páginas
                        shape="rounded"
                        page={pagina}
                        onChange={(_, value) => setPagina(value)}
                        />
                    </Stack>
                </Box>
            </Box>
        </DefaultHeader>
        <Footer/>
        </>
    );
}