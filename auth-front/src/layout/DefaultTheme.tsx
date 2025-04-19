import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#000000', // Negro
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF4F5A', // Verde bandera
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFD700', // Amarillo dorado
    },
    background: {
      default: '#F5F2E7', // Beige claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
};

const theme = createTheme(themeOptions);
export default theme;