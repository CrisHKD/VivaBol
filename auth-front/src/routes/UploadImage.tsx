import { API_URL } from '../auth/constants';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Avatar, CircularProgress, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Close as CloseIcon } from '@mui/icons-material';

interface UploadImageProps {
  onImagesUpload: (urls: string[]) => void;  // Callback para pasar las URLs de todas las imágenes
}

const UploadImage: React.FC<UploadImageProps> = ({ onImagesUpload }) => {
  const [images, setImages] = useState<File[]>([]);  // Para almacenar las imágenes
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Para mostrar las URLs de las imágenes subidas
  const [loading, setLoading] = useState(false); // Para mostrar un indicador de carga


  // Usamos useDropzone de 'react-dropzone' para manejar el arrastre
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 6,       // Permitimos hasta 6 archivos
    onDrop: (acceptedFiles) => {
      if (images.length + acceptedFiles.length <= 6) {
        const newImages = acceptedFiles;
        setImages((prev) => [...prev, ...newImages]);
      }
    },
  });

  // Subir una imagen al servidor
  const handleUpload = async (image: File, isBanner: boolean) => {
    setLoading(true); // Activar el indicador de carga
    const formData = new FormData();
    formData.append('image', image); // Agregar la imagen al FormData

    try {
      const endpoint = isBanner ? `${API_URL}/upload/banner` : `${API_URL}/upload/eventImages`;
      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Respuesta del servidor:', response.data);

      // Si la imagen se sube correctamente, la URL real proporcionada por el servidor
      if (response.data.imageUrl) {
        setImageUrls((prev) => [...prev, response.data.imageUrl]);
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  // Subir todas las imágenes una por una
  const handleUploadAll = () => {
    if (images.length === 0) return; // Si no hay imágenes, no hacer nada

    // Subir la primera imagen al endpoint de banner y las demás al endpoint de eventImages
    images.forEach((image, index) => {
      const isBanner = index === 0; // La primera imagen es para el banner
      handleUpload(image, isBanner);
    });
  };

  // Eliminar una imagen de la lista
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageUrls(updatedImageUrls);
  };

  // Llamar al callback para pasar todas las URLs cuando se termine de subir todas las imágenes
  useEffect(() => {
    if (imageUrls.length === images.length) {
      onImagesUpload(imageUrls); // Llamamos al callback con todas las URLs
    }
  }, [imageUrls, images, onImagesUpload]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        border: 'none',  // Eliminamos el borde azul en el cuadro principal
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Subir Imágenes
      </Typography>

      {/* Área de arrastrar y soltar */}
      <Box
        {...getRootProps()}
        sx={{
          width: '100%',
          height: 200,
          border: '2px dashed #3f51b5',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#f1f1f1',
          padding: 2,
          marginBottom: 2,
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body2" color="text.secondary">
          Arrastra y suelta las imágenes aquí o haz clic para seleccionar
        </Typography>
      </Box>

      {/* Mostrar las imágenes seleccionadas */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {imageUrls.map((url, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <Avatar
              alt={`Imagen ${index + 1}`}
              src={url}
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
            <IconButton
              onClick={() => handleRemoveImage(index)}
              sx={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '4px',
                '&:hover': { backgroundColor: '#ff0000' },
              }}
            >
              <CloseIcon sx={{ color: '#ff0000' }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Indicador de carga mientras se sube las imágenes */}
      {loading && <CircularProgress sx={{ marginTop: 2 }} />}

      {/* Botón para subir las imágenes */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadAll}
        sx={{
          width: '100%',
          padding: '10px 0',
          marginTop: 2,
        }}
        disabled={loading || images.length === 0}
      >
        Subir Imágenes
      </Button>
    </Box>
  );
};

export default UploadImage;
