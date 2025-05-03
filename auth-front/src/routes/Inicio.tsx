import DefaultHeader from "../layout/HeaderDefault";
import Footer from "../layout/Footer";
import {
    Box,
} from '@mui/material';
import CuentaRegresivaBicentenario from "../layout/cuentaRegresiva";


import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import { API_URL } from "../auth/constants";
import dayjs from "dayjs";

interface Evento {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    imagen: string;
    departamento: string;
    ubicacion: string;
}

export default function Calendario() {
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const hoy = dayjs().format("YYYY-MM-DD");

                const response = await axios.get(`${API_URL}/eventos`, {
                    params: { page: 1 },
                });

                setEventos(response.data.eventos);
            } catch (error) {
                console.error("Error al obtener eventos del día:", error);
            }
        };

        fetchEventos();
    }, []);

    return (
        <>
            <DefaultHeader>

                <Box sx={{ width: '100%', minHeight: '60vh', position: 'relative' }}>
                    {/* Imagen de fondo */}
                    <Box
                        component="img"
                        src="https://res.cloudinary.com/dsuovltwx/image/upload/t_Portada/v1746161439/Banner_thhn6i.png"
                        alt="Ilustración Bicentenario Bolivia"
                        sx={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            objectFit: "cover",
                        }}
                    />

                    {/* Contador sobre la imagen */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '25%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            maxWidth: '800px',
                            px: 2,
                        }}
                    >
                        <CuentaRegresivaBicentenario />
                    </Box>

                </Box>


                <Box sx={{ px: 3, py: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Eventos del día
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            gap: 2,
                            py: 2,
                        }}
                    >
                        {eventos.map((evento) => (
                            <Card
                                key={evento.id}
                                sx={{
                                    width: 300,
                                    flex: "0 0 auto",
                                    boxShadow: 3,
                                    borderRadius: 2,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={evento.imagen}
                                    alt={evento.titulo}
                                />
                                <CardContent>
                                    <Typography variant="h6" noWrap>
                                        {evento.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {evento.departamento} - {dayjs(evento.fecha_inicio).format("HH:mm")}
                                    </Typography>
                                    <Typography variant="body2" noWrap>
                                        {evento.ubicacion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ px: 3, py: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Eventos guardados
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            gap: 2,
                            py: 2,
                        }}
                    >
                        {eventos.map((evento) => (
                            <Card
                                key={evento.id}
                                sx={{
                                    width: 300,
                                    flex: "0 0 auto",
                                    boxShadow: 3,
                                    borderRadius: 2,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={evento.imagen}
                                    alt={evento.titulo}
                                />
                                <CardContent>
                                    <Typography variant="h6" noWrap>
                                        {evento.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {evento.departamento} - {dayjs(evento.fecha_inicio).format("HH:mm")}
                                    </Typography>
                                    <Typography variant="body2" noWrap>
                                        {evento.ubicacion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>

            </DefaultHeader>
            <Footer></Footer>
        </>
    );
}