import * as React from 'react';
import { useState } from 'react';
import DefaultHeader from "../layout/HeaderDefault";
import TableEventos from "../components/TablaEventos";
import DepatamentoSelect from "../components/DepartamentoSelect";
import CategoriaSelect from "../components/CategoriaSelect";
import SearchComponent from "../components/CuadroBusqueda";

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


const drawerWidth = 200;

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Presidentes':
        return <Typography variant="h6">Información sobre Presidentes</Typography>;
      case 'Etnias':
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
                    paddingRight:'5px'           // Espaciado alrededor de los componentes
                }}
            >
                <DepatamentoSelect/>
                <CategoriaSelect/>
                <SearchComponent/>
            </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <TableEventos />
        </Box>
        <Typography variant="h6">Información sobre etnias</Typography>
        </>
        ;
        
      case 'Batallas':
        return <Typography variant="h6">Información sobre Batallas</Typography>;
      case 'Historia':
        return <Typography variant="h6">Información sobre Historia</Typography>;
      case 'Personajes':
        return <Typography variant="h6">Información sobre Personajes</Typography>;
      default:
        return <Typography variant="h6">Selecciona un ítem de la lista</Typography>;
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
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Permisos" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Usuario cultiral" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleItemClick('Etnias')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Etnias" />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleItemClick('Batallas')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Batallas" />
          </ListItemButton>
        </List>
        
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleItemClick('Historia')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Momentos Historicos" />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleItemClick('Personajes')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Personajes" />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleItemClick('Presidentes')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Presidentes" />
          </ListItemButton>
        </List>
      </Collapse>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Academico" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred2" />
          </ListItemButton>
        </List>
      </Collapse>

    </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
        
      </Box>
    </Box>
    </DefaultHeader>
    </>
  );
}