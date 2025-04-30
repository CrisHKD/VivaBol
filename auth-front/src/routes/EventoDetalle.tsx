import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../auth/constants";
import DefaultHeader from '../layout/HeaderDefault';
import Footer from '../layout/Footer';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

//Importacion para las imagenes
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comentarios from '../layout/comentarios';
import { useAuth } from '../auth/AuthProvider';



const EventoDetalle = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [imgPatrocinators, setImgPatrocinators] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const id_evento = Number(id);
  const auth = useAuth();
  const user = auth.getUser?.();
  const identidad = user?.ident;
  const itemData = [];


  const agregarFavorito = async () => {
    try {
      await axios.post(`${API_URL}/favoritos`, { usuario_id: identidad, evento_id: id_evento });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
    }
  };

  const eliminarFavorito = async () => {
    try {
      await axios.delete(`${API_URL}/favoritos`, {
        data: {
          usuario_id: identidad,
          evento_id: id_evento
        }
      });
      setIsFavorite(!isFavorite);

    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
    }
  };


  useEffect(() => {
    axios.get(`${API_URL}/eventos/${id}`)
      .then(res => setEvento(res.data))
      .catch(err => console.error('Error al obtener evento:', err));

  }, [id]);

  useEffect(() => {
    axios.get(`${API_URL}/favoritos`, {
      params: {
        usuario_id: identidad,
        evento_id: id_evento
      }
    })
      .then(res => setIsFavorite(res.data.favorito))
      .catch(err => console.error('Error al obtener favorito:', err));
  }, [identidad, id_evento]);

  useEffect(() => {
    axios.get(`${API_URL}/patrocinadores/eventos`, {
      params: {
        evento_id: id_evento
      }
    })
      .then(res => setImgPatrocinators(res.data))
      .catch(err => console.error('Error al obtener patrocinadores:', err));
  }, [id_evento]);

  useEffect(() => {
    axios.get(`${API_URL}/eventos/eventImg/${id}`)
      .then(res => setImageUrls(res.data))
      .catch(err => console.error('Error al obtener imagenes:', err));
  }, [id]);

  if (!evento) { return <p>Cargando evento...</p> } else {
    for (let i = 0; i < imageUrls.length; i++) {
      itemData.push({ img: imageUrls[i].url, title: evento.titulo, author: '@hjrc33', featured: false, });
    }
    itemData.push({ img: evento.imagen, title: evento.titulo, author: '@hjrc33', featured: true, });
  };


  return (
    <DefaultHeader>
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center', // Centrado horizontal
          padding: '25px',          // Espaciado alrededor de los componentes
        }}
      />
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          padding: '40px',   // Espaciado superior
          backgroundColor: '#f5f5f5',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: "auto",
          },
        }}
      >
        <Paper elevation={3}>
          <Box sx={{ padding: '20px' }}>
            <Typography variant="h3" gutterBottom color='primary' sx={{ padding: '10px' }}>
              {evento.titulo}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>


              <Box sx={{ width: '50%', padding: '30px' }}>
                <ImageList
                  gap={1}
                >
                  {itemData.map((item) => {
                    const cols = item.featured ? 1 : 1;
                    const rows = item.featured ? 2 : 1;

                    return (
                      <ImageListItem cols={cols} rows={rows}>
                        <img src={item.img} alt={evento.titulo} />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
              </Box>

              <Box
                
              sx={{
                
                width: '100%',
                maxWidth: 600,
                padding: 4,
                backgroundColor: 'background.paper',
              }}>

                <Box
                  sx={{

                    margin: 'auto',
                    padding: 4,
                    backgroundColor: 'background.paper',

                    borderRadius: 4,
                    boxShadow: 1
                  }}
                >
                  <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Detalles del Evento
                  </Typography>

                  <Typography variant="body1" gutterBottom sx={{ mb: 2, color: 'text.primary', textAlign: 'justify' }}>
                    {evento.descripcion}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      <strong>Fecha:</strong> {new Date(evento.fecha_inicio).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      <strong>Ubicación:</strong> {evento.ubicacion}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      <strong>Departamento:</strong> {evento.departamento}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                  >
                    {imgPatrocinators.map((patro, index) => (
                      <Box key={index}>
                        <img
                          src={patro.logo_url}
                          alt={patro.nombre}
                          title={patro.nombre}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid #ccc' // opcional: borde gris sutil
                          }}
                        />
                      </Box>
                    ))}
                  </Box>


                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant={isFavorite ? 'contained' : 'outlined'}
                      color={isFavorite ? 'secondary' : 'error'} // Cambia color si quieres diferenciar
                      startIcon={<FavoriteIcon />}
                      onClick={isFavorite ? eliminarFavorito : agregarFavorito}
                      sx={{ fontWeight: 'bold', borderRadius: 2 }}
                    >
                      {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                    </Button>
                  </Box>

                </Box>
                <Comentarios evento_id={id_evento} />
              </Box>
            </Box>

          </Box>
        </Paper>
      </Box>


      <Footer />
    </DefaultHeader>

  );
};


export default EventoDetalle;