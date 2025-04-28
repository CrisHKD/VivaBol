
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, Pinterest, LinkedIn } from '@mui/icons-material';
import theme from '../layout/DefaultTheme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Footer = () => { // Remover React.FC
  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        backgroundColor:  theme.palette.secondary.main, // Fondo oscuro
        color: 'white',          // Color de texto blanco
        paddingTop: '50px ',
        paddingBottom: '50px ',
        paddingLeft: '0px 0',
        marginTop: 'auto',       // Empuja el footer al final
      }}
    > 
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {/* Columna 1: Vivabol */}
        <Grid  sx={{ textAlign: 'left' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '10px' }}>
            Vivabol
          </Typography>
          <Typography variant="body1">
            En conmemoración del <br></br>
            bicentenario de Bolivia
          </Typography>
        </Grid>

        {/* Columna 2: Iconos de redes sociales */}
        <Grid sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Síguenos
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            paddingLeft: '100px ',
            paddingRight: '100px ',
            gap: '5px' }}>
            <IconButton
              color="inherit"
              aria-label="Facebook"
              href="https://www.facebook.com"
              target="_blank"
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Instagram"
              href="https://www.instagram.com"
              target="_blank"
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="YouTube"
              href="https://www.youtube.com"
              target="_blank"
            >
              <YouTube />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Pinterest"
              href="https://www.pinterest.com"
              target="_blank"
            >
              <Pinterest />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="LinkedIn"
              href="https://www.linkedin.com"
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Columna 3: Información de contacto */}
        <Grid  sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Contacto
          </Typography>
          <Typography variant="body1">Dirección: Calle Ficticia 123<br></br> La Paz, Bolivia</Typography>
          <Typography variant="body1">Teléfono: +591 123 456 789</Typography>
          <Typography variant="body1">Correo: contacto@vivabol.com</Typography>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
    </>
  );
};

export default Footer;
