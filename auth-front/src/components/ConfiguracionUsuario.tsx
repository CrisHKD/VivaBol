import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  Backdrop,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Button,
  Avatar,
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import axios from "axios";

interface UserSettingsModalProps {
  onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ onClose }) => {
  const auth = useAuth();
  const user = auth.getUser?.();

  const [notificaciones, setNotificaciones] = useState(false);
  const [notificacionesEmail, setNotificacionesEmail] = useState(false);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [openImagenModal, setOpenImagenModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
      }
    },
  });

  const handleUpload = async () => {
    if (!imageFile || !user?.ident) return;

    const formData = new FormData();
    formData.append("id", String(user.ident));
    formData.append("imagen", imageFile);

    setUploading(true);
    try {
      const res = await axios.post(`${API_URL}/usuarios/cambiarImagen`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(res.data.imagenUrl);
      setOpenImagenModal(false);
      setImageFile(null);
      setImageUrl(null);
    } catch (err) {
      console.error("Error al subir imagen:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleToggleNotificaciones = async (checked: boolean) => {
    setNotificaciones(checked);
    try {
      await axios.put(`${API_URL}/usuarios/preferencias`, {
        usuario_id: user?.ident,
        notificaciones: checked,
      });
    } catch (err) {
      console.error("Error al actualizar notificaciones:", err);
    }
  };

  const handleToggleNotificacionesEmail = async (checked: boolean) => {
    setNotificacionesEmail(checked);
    try {
      await axios.put(`${API_URL}/usuarios/preferencias`, {
        usuario_id: user?.ident,
        notificaciones_email: checked,
      });
    } catch (err) {
      console.error("Error al actualizar notificaciones_email:", err);
    }
  };

  useEffect(() => {
    const fetchPreferencias = async () => {
      if (!user?.ident) return;
      try {
        const res = await axios.get(`${API_URL}/usuarios/${user.ident}`);
        const preferencias = res.data?.preferencias_usuarios?.[0];
        if (preferencias) {
          setNotificaciones(!!preferencias.notificaciones);
          setNotificacionesEmail(!!preferencias.notificaciones_email);
          setImage(res.data.foto_perfil);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferencias();
  }, [user]);

  return (
    <>
      <Backdrop
        open
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: (theme) => theme.zIndex.modal,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      >
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
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#FF4F5A",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom>
            Configuración de Usuario
          </Typography>

          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box
              component="img"
              src={image}
              alt="Imagen de perfil"
              sx={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: 2,
              }}
            />
            <IconButton
              onClick={() => setOpenImagenModal(true)}
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              <PhotoCamera />
            </IconButton>
          </Box>

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
                  onChange={(e) => handleToggleNotificaciones(e.target.checked)}
                />
              }
              label="Notificaciones"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificacionesEmail}
                  onChange={(e) => handleToggleNotificacionesEmail(e.target.checked)}
                />
              }
              label="Notificaciones por Email"
            />
          </Box>
        </Paper>
      </Backdrop>

      <Dialog open={openImagenModal} onClose={() => setOpenImagenModal(false)}>
        <DialogTitle>Actualizar Imagen de Perfil</DialogTitle>
        <DialogContent>
          <Box
            {...getRootProps()}
            sx={{
              width: "100%",
              height: 200,
              border: "2px dashed #3f51b5",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#f1f1f1",
              padding: 2,
              marginBottom: 2,
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body2" color="text.secondary" align="center">
              Arrastra y suelta una imagen o haz clic para seleccionar
            </Typography>
          </Box>

          {imageUrl && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Avatar
                src={imageUrl}
                sx={{
                  width: 120,
                  height: 120,
                  margin: "auto",
                  borderRadius: "50%",
                }}
              />
            </Box>
          )}

          {uploading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImagenModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            disabled={!imageFile || uploading}
            onClick={handleUpload}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserSettingsModal;
