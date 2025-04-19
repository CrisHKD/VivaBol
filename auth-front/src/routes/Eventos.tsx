import { useAuth } from "../auth/AuthProvider";
import DefaultHeader from "../layout/HeaderDefault";
import EventoTarjeta from "../components/EventoTarjeta";
import DepatamentoSelect from "../components/DepartamentoSelect";
import CategoriaSelect from "../components/CategoriaSelect";
import SearchComponent from "../components/CuadroBusqueda";
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Footer from "../layout/Footer";
  

export default function Eventos(){
    const auth = useAuth();
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
                    flexGrow: 1, // Permite que las tarjetas ocupen el espacio restante
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    }}
                >
                    {/* Aquí tus tarjetas de evento */}
                    <EventoTarjeta />
                    <EventoTarjeta />
                    <EventoTarjeta />
                    <EventoTarjeta />
                    <EventoTarjeta />
                    <EventoTarjeta />
                    <EventoTarjeta />
                    <EventoTarjeta />
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
                    <Pagination count={10} shape="rounded" />
                    </Stack>
                </Box>
            </Box>
        </DefaultHeader>
        <Footer/>
        </>
    );
}