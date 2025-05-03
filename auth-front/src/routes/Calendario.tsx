import React from "react";
import { useAuth } from "../auth/AuthProvider";
import DefaultHeader from "../layout/HeaderDefault";
import Footer from "../layout/Footer";
import { Box } from "@mui/material";
import {Typography} from "@mui/material";

//TIMELINE
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

import axios from "axios";
import { API_URL } from "../auth/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Favorito {
    id: number;
    usuario_id: number;
    evento_id: number;
    fecha_agregado: string;
}

export default function Calendario() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const [eventos, setEventos] = useState<[]>([]);
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);
    const [error, setError] = useState('');
    const auth = useAuth();
    const user = auth.getUser?.();
    const identidad = user?.ident;
    const fecha_param = value?.format('YYYY-MM-DD') || '';


    const handleDate = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setValue(newValue);
            console.log(newValue.format('YYYY-MM-DD')); // Aquí solo imprimes
        }
    };

    const esFavorito = (eventoId: number): boolean => {
        return favoritos.some(fav => fav.evento_id === eventoId);
    };

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get(`${API_URL}/eventos/por-fecha`, {
                    params: { fecha: fecha_param }
                });
                console.log('Respuesta:', response.data.eventos); // 👈 verifica aquí si llega bien
                setEventos(response.data.eventos); // 👈 acceder a "eventos"
                setError('');
            } catch (err) {
                console.error('Error al obtener eventos:', err);
                setError('No se pudieron cargar los eventos');
            }
        };

        if (value) {
            fetchEventos();
        }
        fetchEventos();
    }, [value]);

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const response = await axios.get(`${API_URL}/favoritos/todos`, {
                    params: { usuario_id: identidad, }
                });
                console.log("Favoritos: ", response.data);
                setFavoritos(response.data);
                setError('');
            } catch (error) {
                console.error('Error al obtener eventos:', error);
                setError('No se pudieron cargar los eventos');
            }
        };
        if (favoritos) {
            fetchFavoritos();
        }
        fetchFavoritos();
    }, [identidad]);

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
                        justifyContent: 'center',
                        padding: '40px',   // Espaciado superior
                        backgroundColor: '#f5f5f5',
                        minHeight:'60vh',
                        display: 'flex',
                        gap: 3,
                    }
                    }
                >

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateCalendar']}>
                                <DemoItem label="Controlled calendar" sx={{
                                    maxWidth: 300, // Limita el tamaño del DatePicker
                                }}>
                                    <DateCalendar value={value} onChange={handleDate} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>

                    </Box>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Box>
                        <Typography variant="h6" sx={{ color: '#226F54' }}>
                            Eventos del día
                        </Typography>
                        <Timeline
                            sx={{
                                [`& .${timelineOppositeContentClasses.root}`]: {
                                    flex: 0.2,
                                },
                            }}
                        >
                            {eventos.map((evento: any, index) => (
                                <TimelineItem>
                                    <TimelineOppositeContent color="textSecondary">
                                        {new Date(evento.fecha_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        {index < eventos.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent
                                        sx={{
                                            // Color de fondo (puedes cambiarlo)


                                            display: 'inline-block'
                                        }}
                                    >
                                        <Link to={`/eventos/${evento.id}`} style={{ padding: '2px 2px', borderRadius: '8px', backgroundColor: '#ff4c5c', textDecoration: 'none', color: 'white' }}>
                                            {evento.titulo}
                                        </Link>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                        </Box>
                    </Box>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Box>
                        <Typography variant="h6" sx={{ color: '#226F54' }}>
                            Eventos guardados
                        </Typography>
                        <Timeline
                            sx={{
                                [`& .${timelineOppositeContentClasses.root}`]: {
                                    flex: 0.2,
                                },
                            }}
                        >
                            {eventos
                                .filter((evento: any) => esFavorito(evento.id)) // ✅ solo eventos que sean favoritos
                                .map((evento: any, index: number) => (
                                    <TimelineItem key={evento.id}>
                                        <TimelineOppositeContent color="textSecondary">
                                            {new Date(evento.fecha_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot /> {/* O el color que quieras */}
                                            {index < eventos.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent
                                            sx={{
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Link
                                                to={`/eventos/${evento.id}`}
                                                style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '8px',
                                                    backgroundColor: '#fcbe03', // Tu color normal
                                                    textDecoration: 'none',
                                                    color: 'white',
                                                }}
                                            >
                                                {evento.titulo}  {/* Puedes dejar la estrellita si quieres */}
                                            </Link>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                        </Timeline>
                        </Box>
                    </Box>
                </Box>


                <Footer />
            </DefaultHeader >

        </>
    );
}