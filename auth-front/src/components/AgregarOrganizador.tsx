import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../auth/constants";

interface AgregarOrganizadorFormProps {
  usuarioId: number; // ID del usuario relacionado
  onClose: () => void; // para cerrar el formulario
}

const AgregarOrganizadorForm: React.FC<AgregarOrganizadorFormProps> = ({
  usuarioId,
  onClose,
}) => {
  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sitioWeb, setSitioWeb] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/usuarios/organizadores`, {
        usuario_id: usuarioId,
        nombre_institucion: nombreInstitucion,
        descripcion,
        sitio_web: sitioWeb,
        telefono_contacto: telefonoContacto,
      });

      alert("Organizador registrado correctamente");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al registrar el organizador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fondo oscuro semitransparente */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1200,
        }}
        onClick={onClose}
      />

      {/* Formulario centrado */}
      <Box
        sx={{
          width: 400,
          padding: 2,
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 3,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1300,
          maxWidth: "90%",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre de la institución"
                variant="outlined"
                fullWidth
                value={nombreInstitucion}
                onChange={(e) => setNombreInstitucion(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Sitio web"
                variant="outlined"
                fullWidth
                value={sitioWeb}
                onChange={(e) => setSitioWeb(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Teléfono de contacto"
                variant="outlined"
                fullWidth
                value={telefonoContacto}
                onChange={(e) => setTelefonoContacto(e.target.value)}
                margin="normal"
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  Registrar
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Cancelar
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default AgregarOrganizadorForm;
