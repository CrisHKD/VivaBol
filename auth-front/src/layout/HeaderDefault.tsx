import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { logoPath } from "../auth/constants";

import UserSettingsModal from "../components/ConfiguracionUsuario";


//IMPORTAR EL TEMA
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../layout/DefaultTheme';

const pages = ['Eventos', 'Calendario', 'Galeria'];

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultHeader({ children }: DefaultLayoutProps) {
  const auth = useAuth();
  const user = auth.getUser?.();
  const [openUserSettings, setOpenUserSettings] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Autorization: `Bearer ${auth.getRefreshToken()}`
        },
      });

      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img src={logoPath} alt="VivaBol Logo" style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                VIVABOL
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                VIVABOL2
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {user?.rol !== 1 ? (
                  // Vista para Usuario común (rol_id = 1)
                  <Button
                    key={"Dashboard"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Dashboard
                    </Link>
                  </Button>
                ) : null
                }
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page === 'Eventos' ? (
                      <Link to="/eventos" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page}
                      </Link>
                    ) : page === 'Calendario' ? (
                      <Link to="/calendario" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page}
                      </Link>
                    ) : (
                      page
                    )}

                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {!auth.isAuthenticated ? (
                  <>
                    <Button
                      key="Login"
                      onClick={handleCloseNavMenu}
                      sx={{
                        color: 'white',
                        display: 'inline-block',  // Asegura que los botones estén en una línea
                        marginRight: 2,  // Espacio entre los botones
                      }}
                    >
                      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Login
                      </Link>
                    </Button>
                    <Button
                      key="Signup"
                      onClick={handleCloseNavMenu}
                      sx={{
                        color: 'white',
                        display: 'inline-block',  // Asegura que los botones estén en una línea
                      }}
                    >
                      <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Signup
                      </Link>
                    </Button>
                  </>
                ) : (
                  // Si el usuario está autenticado
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                      
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem href="/" key="userSettings" onClick={() => setOpenUserSettings(true)}>
                        <Typography sx={{ textAlign: 'center' }}>Cuenta</Typography>
                      </MenuItem>
                      <MenuItem href="/" key="signout" onClick={handleSignOut}>
                        <Typography sx={{ textAlign: 'center' }}>Cerrar sesion</Typography>
                      </MenuItem>
                      
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          {openUserSettings && <UserSettingsModal onClose={() => setOpenUserSettings(false)} />}
          {children}
          </main>
      </ThemeProvider>
    </>
  );
}
