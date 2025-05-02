import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    Paper,
    Backdrop,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import axios from "axios";

interface UserSettingsModalProps {
    onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ onClose }) => {
    const auth = useAuth();
    const user = auth.getUser?.();

    const [notificaciones, setNotificaciones] = useState<boolean>(false);
    const [notificacionesEmail, setNotificacionesEmail] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreferencias = async () => {
            if (!user?.ident) {
                console.warn("No hay user.ident disponible");
                return;
            }
    
            try {
                const res = await axios.get(`${API_URL}/usuarios/${user.ident}`);
    
                const preferencias = res.data?.preferencias_usuarios?.[0];
    
                if (preferencias) {
                    setNotificaciones(!!preferencias.notificaciones);
                    setNotificacionesEmail(!!preferencias.notificaciones_email);
                } else {
                    console.warn("No se encontraron preferencias para el usuario.");
                }
            } catch (error) {
                console.error("Error al obtener preferencias del usuario:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPreferencias();
    }, [user]);

    return (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    minWidth: 500,
                    maxWidth: 400,
                    position: "relative",
                    textAlign: "center",
                }}
                onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro
            >
                {/* Botón de cierre en la esquina superior derecha */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "#FF4F5A",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "darkred", // color al hacer hover
                        },
                    }}
                    aria-label="Cerrar"
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" gutterBottom>
                    Configuración de Usuario
                </Typography>
                <Typography variant="body1">
                    <strong>Nombre:</strong> {user?.name ?? "No disponible"}
                </Typography>
                <Typography variant="body1">
                    <strong>Apellidos:</strong> {user?.lastName ?? "No disponible"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Correo:</strong> {user?.email ?? "No disponible"}
                </Typography>

                <Box mt={3}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={notificaciones}
                                onChange={(e) => setNotificaciones(e.target.checked)}
                            />
                        }
                        label="Notificaciones"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={notificacionesEmail}
                                onChange={(e) => setNotificacionesEmail(e.target.checked)}
                            />
                        }
                        label="Notificaciones por Email"
                    />
                </Box>
            </Paper>
        </Backdrop>
    );
};

export default UserSettingsModal;

