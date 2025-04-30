import * as React from 'react';
import { useState, useEffect } from 'react';
import DefaultHeader from "../layout/HeaderDefault";
import TableEventos from "../components/TablaEventos";
import DepatamentoSelect from "../components/DepartamentoSelect";
import SearchComponent from "../components/CuadroBusqueda";
import UsersTable from "../components/TablaUsuarios"
import ListadoPatrocinadores from "../components/TablaPatrocinadores"

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { useLocation, useNavigate } from 'react-router-dom';


const drawerWidth = 200;

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<any[]>([2, 3]);

  const [open, setOpen] = React.useState(false);
  const [openAc, setOpenAc] = React.useState(false);
  const [openOrg, setOpenOrg] = React.useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = params.get('selectedItem');
    setSelectedItem(selected || 'Academicos'); // Valor por defecto
  }, [location.search]); // Cuando la URL cambia, actualizar selectedItem

  // Cambiar de página (actualiza la URL)


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = params.get('selectedItem') || 'Academicos'; // Valor por defecto

    // Solo actualizar el estado si el valor ha cambiado
    if (selected !== selectedItem) {
      setSelectedItem(selected);
      switch (selected) {
        case 'Academicos':
          setCategorias([2, 3]); // Establecer las categorías para 'Academicos'
          break;
        case 'Literarios':
          setCategorias([1]); // Establecer las categorías para 'Literarios'
          break;
        case 'Ferias':
          setCategorias([5]);
          break;
        case 'Gastronomicos':
          setCategorias([4]);
          break;
        case 'Sociales':
          setCategorias([7]);
          break;
        case 'Deportivos':
          setCategorias([6]);
          break;
        default:
          setCategorias([]); // Valor por defecto, sin categorías
          break;
      }
    }
  }, [location.search, selectedItem]); // Escuchar cambios en la URL y el estado de `selectedItem`

  // Cambiar de página (actualiza la URL)
  const handleNavigation = (item: string) => {
    // Solo actualizar la URL si el parámetro cambia
    if (item !== selectedItem) {
      navigate(`?selectedItem=${item}`);
    }
  };

  const handleClickAc = () => {
    setOpenAc(!openAc);
  };
  const handleClickOrg = () => {
    setOpenOrg(!openOrg);
  };

  const renderContent = () => {
    switch (selectedItem) {

      case 'Academicos':
        return <>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', // Centrado horizontal
              alignItems: 'center',     // Centrado vertical
              gap: '20px',              // Espacio entre los componentes
              flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
              padding: '20px',
              paddingTop: '64px',
              paddingRight: '5px'           // Espaciado alrededor de los componentes
            }}
          >
            <DepatamentoSelect />
            <SearchComponent />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TableEventos categoriaIds={categorias} />
          </Box>
        </>;
      case 'Permisos':
        return <UsersTable />;
      case 'Literarios':
        return <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', // Centrado horizontal
              alignItems: 'center',     // Centrado vertical
              gap: '20px',              // Espacio entre los componentes
              flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
              padding: '20px',
              paddingTop: '64px',
              paddingRight: '5px'           // Espaciado alrededor de los componentes
            }}
          >
            <DepatamentoSelect />
            <SearchComponent />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TableEventos categoriaIds={categorias} />
          </Box>
        </>;
      case 'Ferias':
        return <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', // Centrado horizontal
              alignItems: 'center',     // Centrado vertical
              gap: '20px',              // Espacio entre los componentes
              flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
              padding: '20px',
              paddingTop: '64px',
              paddingRight: '5px'           // Espaciado alrededor de los componentes
            }}
          >
            <DepatamentoSelect />
            <SearchComponent />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TableEventos categoriaIds={categorias} />
          </Box>
        </>;
      case 'Gastronomicos':
        return <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', // Centrado horizontal
              alignItems: 'center',     // Centrado vertical
              gap: '20px',              // Espacio entre los componentes
              flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
              padding: '20px',
              paddingTop: '64px',
              paddingRight: '5px'           // Espaciado alrededor de los componentes
            }}
          >
            <DepatamentoSelect />
            <SearchComponent />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TableEventos categoriaIds={categorias} />
          </Box>
        </>;
      case 'Sociales':
        return <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', // Centrado horizontal
              alignItems: 'center',     // Centrado vertical
              gap: '20px',              // Espacio entre los componentes
              flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
              padding: '20px',
              paddingTop: '64px',
              paddingRight: '5px'           // Espaciado alrededor de los componentes
            }}
          >
            <DepatamentoSelect />
            <SearchComponent />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TableEventos categoriaIds={categorias} />
          </Box>
        </>;
      case 'Deportivos':
        return <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right', // Centrado horizontal
              alignItems: 'center',     // Centrado vertical
              gap: '20px',              // Espacio entre los componentes
              flexWrap: 'wrap',         // Para que se ajusten en pantallas pequeñas
              padding: '20px',
              paddingTop: '64px',
              paddingRight: '5px'           // Espaciado alrededor de los componentes
            }}
          >
            <DepatamentoSelect />
            <SearchComponent />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TableEventos categoriaIds={categorias} />
          </Box>
        </>;
      case 'Patrocinadores':
        return <><Box
          sx={{
            width: '100%',
            display: 'flex',             // Utilizamos flexbox para el layout
            justifyContent: 'space-around', // Espacio entre los componentes
            alignItems: 'flex-start',     // Alineación al inicio verticalmente
            padding: '25px',
          }}
        >
          <ListadoPatrocinadores />
        </Box></>;
      default:
        return <Typography variant="h6">No deberias estar aca</Typography>;
    };
  }
  return (
    <>

      <DefaultHeader >

        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={() => handleNavigation('Permisos')}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="Permisos" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavigation('Patrocinadores')}>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Patrocinadores" />
                </ListItemButton>

                <ListItemButton onClick={handleClickAc}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Academico" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openAc} timeout="auto" unmountOnExit>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('Academicos')}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Eventos Academicos" />
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('Literarios')}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Eventos Literarios" />
                    </ListItemButton>
                  </List>

                </Collapse>

                <ListItemButton onClick={handleClickOrg}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Organizador" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openOrg} timeout="auto" unmountOnExit>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('Ferias')}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Ferias" />
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('Gastronomicos')}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Eventos Gastronomicos" />
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('Sociales')}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Eventos Sociales" />
                    </ListItemButton>
                  </List>

                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('Deportivos')}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Eventos deportivos" />
                    </ListItemButton>
                  </List>

                </Collapse>

              </List>
            </Box>
          </Drawer>


          <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: '64px' }}>
            {renderContent()}
          </Box>
        </Box>
      </DefaultHeader>
    </>
  );
}