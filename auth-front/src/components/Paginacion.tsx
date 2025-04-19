
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function Paginacion() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centrado horizontal
        marginTop: 'auto', // Empuja la paginación hacia el final
        padding: '20px',   // Ajusta el espacio alrededor de la paginación
      }}
    >
      <Stack spacing={2}>
        <Pagination count={10} shape="rounded" />
      </Stack>
    </Box>
  );
}