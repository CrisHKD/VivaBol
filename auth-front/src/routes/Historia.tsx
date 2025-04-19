import { useAuth } from "../auth/AuthProvider"
import DefaultHeader from "../layout/HeaderDefault";
import Footer from "../layout/Footer";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PresidenteTarjeta from "../components/PresidenteTarjeta";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

export default function Historia(){
    const auth = useAuth();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <DefaultHeader>
            <Box 
                sx={{

                    width: '100%',
                    justifyContent: 'center', // Centrado horizontal
                    padding: '36px',          // Espaciado alrededor de los componentes
                }}
            />
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: '40px'}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', width: '300px' }}
                >
                    <Tab label="Presidentes" {...a11yProps(0)} />
                    <Tab label="Batallas" {...a11yProps(1)} />
                    <Tab label="Etnias" {...a11yProps(2)} />
                    <Tab label="Momentos historicos" {...a11yProps(3)} />
                    <Tab label="Personajes historicos" {...a11yProps(4)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box
                        sx={{
                        flexGrow: 1, // Permite que las tarjetas ocupen el espacio restante
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        }}
                    >
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Box
                        sx={{
                        flexGrow: 1, // Permite que las tarjetas ocupen el espacio restante
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        }}
                    >
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <Box
                        sx={{
                        flexGrow: 1, // Permite que las tarjetas ocupen el espacio restante
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        }}
                    >
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                <Box
                        sx={{
                        flexGrow: 1, // Permite que las tarjetas ocupen el espacio restante
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        }}
                    >
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={4}>
                <Box
                        sx={{
                        flexGrow: 1, // Permite que las tarjetas ocupen el espacio restante
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        }}
                    >
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                        <PresidenteTarjeta />
                    </Box>
                </TabPanel>
                </Box>
            <Footer/>
        </DefaultHeader>
    );
}