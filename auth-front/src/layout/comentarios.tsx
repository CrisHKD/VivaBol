import { useEffect, useState } from 'react';
import { Box, TextField, Typography, List} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';
import { API_URL } from '../auth/constants';

interface Comentario {
    id: number;
    contenido: string;
    fecha_comentario: string;
    evento_id: number;
    usuario_id: number;
    visible: boolean;
    usuario: {
        nombres: string;
        apellidos: string;
        foto_perfil: string;
    };
}

export default function Comentarios({ evento_id }: { evento_id: number }) {
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const auth = useAuth();
    const user = auth.getUser?.();
    const id = user?.ident || 0; // Asegúrate de que el ID del usuario esté disponible

    const handleEnviar = async () => {
        if (comentario.trim() !== '') {
            //setComentarios([...comentarios, comentario]);
            await axios.post(`${API_URL}/comentarios`, { evento_id: evento_id, usuario_id: id, contenido: comentario });
            setComentario('');
            axios.get(`${API_URL}/comentarios/obtener/?evento_id=${evento_id}`)
                .then(res => setComentarios(res.data.comentarios))
                .catch(err => console.error('Error al obtener comentarios:', err));

        }
    };

    useEffect(() => {
        axios.get(`${API_URL}/comentarios/obtener/?evento_id=${evento_id}`)
            .then(res => setComentarios(res.data.comentarios))
            .catch(err => console.error('Error al obtener comentarios:', err));
    }, [evento_id]); // Dependencia para que se ejecute cuando cambie el evento_id

    return (
        <Box sx={{ width: '100%', 
            maxWidth: 600, 
            margin: 'auto', 
            mt: 4, 
            p: 3, 
            backgroundColor: 'background.paper', 
            borderRadius: 3, 
            boxShadow: 1 }}
        >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Comentarios
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={6}
                    label="Escribe tu comentario"
                    variant="outlined"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                />

                <IconButton
                    color="primary"
                    onClick={handleEnviar}
                    sx={{ height: '56px' }}
                >
                    <SendIcon />
                </IconButton>
            </Box>

            <List>
                {comentarios.map((comentario) => {
                    const fecha = new Date(comentario.fecha_comentario);
                    const opcionesFecha: Intl.DateTimeFormatOptions = {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    };
                    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

                    return (
                        <Box
                            key={comentario.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 2,
                                mb: 1,
                                padding: 2,
                                borderRadius: 5,
                                backgroundColor: 'grey.100',
                                position: 'relative'
                            }}
                        >
                            {/* Imagen de perfil */}
                            <img
                                src={comentario.usuario.foto_perfil}
                                alt="Foto perfil"
                                width={40}
                                height={40}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />

                            {/* Contenido del comentario */}
                            <Box sx={{ flex: 1 }}>
                                {/* Fecha arriba a la derecha */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 16,
                                        color: 'text.disabled'
                                    }}
                                >
                                    {fechaFormateada}
                                </Typography>

                                {/* Nombre */}
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                    {comentario.usuario.nombres} {comentario.usuario.apellidos}
                                </Typography>

                                {/* Comentario */}
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {comentario.contenido}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </List>
        </Box>
    );
}