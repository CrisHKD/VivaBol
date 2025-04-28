import React from "react";
import { useAuth } from "../auth/AuthProvider";
import DefaultHeader from "../layout/HeaderDefault";
import Footer from "../layout/Footer";
import { Box } from "@mui/material";

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

export default function Calendario() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const [eventos, setEventos] = useState<[]>([]);
    const [error, setError] = useState('');
    const auth = useAuth();
    const user = auth.getUser?.();
    const identidad = user?.ident;
    const fecha_param = value?.format('YYYY-MM-DD') || '';


    const handleDate = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setValue(newValue);
            console.log(newValue.format('YYYY-MM-DD'));
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
            }, [value]);
        }
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
    }, [value]);

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
                        display: 'flex',
                        gap: 3,
                    }
                    }
                >

                    <Box>
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

                    <Box>
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
                    <Box sx={{ flex: 1 }}>
                        <Timeline
                            sx={{
                                [`& .${timelineOppositeContentClasses.root}`]: {
                                    flex: 0.2,
                                },
                            }}
                        >
                            <TimelineItem>
                                <TimelineOppositeContent color="textSecondary">
                                    09:30 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Eat
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent color="textSecondary">
                                    10:00 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                </TimelineSeparator>
                                <TimelineContent>Code</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </Box>
                </Box>


                <Footer />
            </DefaultHeader>

        </>
    );
}